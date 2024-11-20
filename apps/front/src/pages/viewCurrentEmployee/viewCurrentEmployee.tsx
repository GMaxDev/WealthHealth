import { useState, useEffect } from "react";
import { filterEmployees } from "../../components/filterEmployees";

export default function ViewEmployee() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Pour gérer les erreurs
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const [employeesPerPage, setEmployeesPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState(""); // Requête de recherche

  // J'utilise useEffect pour effectuer la requête au backend lors du premier rendu
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/api/employees")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des employés");
        }
        return response.json();
      })
      .then((data) => {
        setEmployees(data); // Mettre à jour le state avec les données
        setLoading(false); // Désactiver l'état de chargement
      })
      .catch((error) => {
        setError(error.message); // Gérer les erreurs
        setLoading(false);
      });
  }, []); // Le tableau vide [] sert à exécuté uniquement useEffect au montage du composant

  // Filtrer les employés en fonction de la recherche
  const filteredEmployees = filterEmployees(employees, searchQuery);

  // Pagination
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const goToNextPage = () => {
    if (currentPage < Math.ceil(filteredEmployees.length / employeesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Gérer le changement du nombre d'entrées à afficher par page
  const handleEntriesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEmployeesPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset à la première page lorsque le nombre d'entrées change
  };

  if (loading) {
    return <div>Chargement des employés...</div>; // Affichage en cours de chargement
  }

  if (error) {
    return <div>Erreur : {error}</div>; // Affichage en cas d'erreur
  }

  return (
    <div className="flex flex-col items-center mx-20 my-10">
      <div className="flex justify-between w-full">
        <div>
          Show
          <select
            id="entries_show"
            className="ml-2 border"
            value={employeesPerPage}
            onChange={handleEntriesChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          entries
        </div>
        <div>
          Search
          <input
            className="border"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search employees..."
          />
        </div>
      </div>
      <div className="w-full">
        <table className="w-full mt-5 bg-gray-300 rounded-md">
          <thead>
            <tr className="bg-gray-400">
              {[
                "First Name",
                "Last Name",
                "Start Date",
                "Department",
                "Date of Birth",
                "Street",
                "City",
                "State",
                "Zip code",
              ].map((heading) => (
                <th key={heading} className="px-4 py-2">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="px-4 py-2">{employee.firstName}</td>
                <td className="px-4 py-2">{employee.lastName}</td>
                <td className="px-4 py-2">{employee.startDate}</td>
                <td className="px-4 py-2">{employee.department}</td>
                <td className="px-4 py-2">{employee.birthDate}</td>
                <td className="px-4 py-2">{employee.street}</td>
                <td className="px-4 py-2">{employee.city}</td>
                <td className="px-4 py-2">{employee.state}</td>
                <td className="px-4 py-2">{employee.zipCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between w-full mt-5">
        <div>
          Showing {indexOfFirstEmployee + 1} to{" "}
          {Math.min(indexOfLastEmployee, filteredEmployees.length)} of{" "}
          {filteredEmployees.length}
        </div>
        <div className="flex justify-between w-40">
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <button
            onClick={goToNextPage}
            disabled={
              currentPage ===
              Math.ceil(filteredEmployees.length / employeesPerPage)
            } // Calcul le nombre de page nécessaire et arrondi au supérieur
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
