import { useState } from "react";
import DropdownMenu from "@gmaxdev/dropdown-plugin";
import departments from "../../data/departments.json";
import states from "../../data/states.json";
import "@gmaxdev/dropdown-plugin/dist/style.css";

export default function CreateEmployee() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    startDate: "",
    street: "",
    city: "",
    zipCode: "",
  });
  const [successMessage, setSuccessMessage] = useState(""); // Message de confirmation

  // Gestion de la modification des champs de formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Création de l'objet de données avec FormData
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Conversion en objet
    const data = Object.fromEntries(formData);

    // Ajout manuellement des valeurs de selectedDepartment et selectedState
    data.department = selectedDepartment;
    data.state = selectedState;

    // Affichage des données pour vérification
    console.log("Form data being sent:", data);

    // Envoi de la requête POST
    fetch(`${import.meta.env.VITE_API_URL}/api/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        // Réinitialisation des champs du formulaire
        setFormValues({
          firstName: "",
          lastName: "",
          birthDate: "",
          startDate: "",
          street: "",
          city: "",
          zipCode: "",
        });
        setSelectedDepartment("");
        setSelectedState("");

        // Affichage du message de confirmation
        setSuccessMessage("Employé ajouté avec succès !");
        setTimeout(() => setSuccessMessage(""), 3000); // Effacer le message après 3 secondes
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Une erreur est survenue.");
      });
  };

  return (
    <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
      {successMessage && (
        <div className="p-4 mb-4 text-green-700 bg-green-200 rounded">
          {successMessage}
        </div>
      )}

      <section className="p-6 mt-10 bg-gray-300 rounded-2xl">
        <div className="grid grid-cols-3 gap-6 mb-4">
          {[
            { label: "First Name", name: "firstName", type: "text" },
            { label: "Last Name", name: "lastName", type: "text" },
            { label: "Date of Birth", name: "birthDate", type: "date" },
            { label: "Start Date", name: "startDate", type: "date" },
          ].map((field) => (
            <>
              <p className="col-span-1 mr-4">{field.label}</p>
              <input
                className="w-full col-span-2 px-2 py-1 border"
                type={field.type}
                name={field.name}
                value={formValues[field.name]} // Utilisation des valeurs d'état
                onChange={handleChange} // Mise à jour des valeurs d'état
              />
            </>
          ))}
        </div>
      </section>

      <section className="p-6 mt-10 bg-gray-300 rounded-2xl">
        <div className="grid grid-cols-3 gap-6 mb-4">
          {[
            { label: "Street", name: "street", type: "text" },
            { label: "City", name: "city", type: "text" },
            { label: "Zip Code", name: "zipCode", type: "text" },
          ].map((field) => (
            <>
              <p className="col-span-1 mr-4">{field.label}</p>
              <input
                className="w-full col-span-2 px-2 py-1 border"
                type={field.type}
                name={field.name}
                value={formValues[field.name]} // Utilisation des valeurs d'état
                onChange={handleChange} // Mise à jour des valeurs d'état
              />
            </>
          ))}
          <p className="col-span-1 mr-4">Departments</p>
          <DropdownMenu
            className="w-full col-span-2 px-2 py-1 border"
            options={departments}
            value={selectedDepartment} // Utilisation de l'état
            onChange={(value) => setSelectedDepartment(value)} // Mise à jour de l'état
          />
          <p className="col-span-1 mr-4">State</p>
          <DropdownMenu
            className="w-full col-span-2 px-2 py-1 border"
            options={states}
            value={selectedState} // Utilisation de l'état
            onChange={(value) => setSelectedState(value)} // Mise à jour de l'état
          />
        </div>
      </section>

      <button
        type="submit"
        className="px-4 py-2 mt-6 text-white bg-blue-500 rounded"
      >
        Submit
      </button>
    </form>
  );
}
