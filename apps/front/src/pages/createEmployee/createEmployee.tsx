import { useState, useEffect } from "react";
import $ from "jquery";
import "jquery-ui/ui/widgets/selectmenu";
import departments from "../../data/departments.json";
import states from "../../data/states.json";
import "jquery-ui/themes/base/all.css"; // Inclure les styles jQuery UI

export default function CreateEmployee() {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    startDate: "",
    street: "",
    city: "",
    zipCode: "",
    department: "",
    state: "",
  });

  const [successMessage, setSuccessMessage] = useState(""); // Message de confirmation

  // Initialisation des menus déroulants jQuery UI
  useEffect(() => {
    $("#departmentSelect").selectmenu({
      change: function (event, ui) {
        setFormValues((prev) => ({
          ...prev,
          department: ui.item.value,
        }));
      },
    });

    $("#stateSelect").selectmenu({
      change: function (event, ui) {
        setFormValues((prev) => ({
          ...prev,
          state: ui.item.value,
        }));
      },
    });

    // Nettoyer les composants jQuery UI à la désinstallation
    return () => {
      $("#departmentSelect").selectmenu("destroy");
      $("#stateSelect").selectmenu("destroy");
    };
  }, []);

  // Gestion des changements des champs de texte
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Gestion de la soumission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Envoi des données au backend
    console.log("Données du formulaire : ", formValues);

    fetch(`${import.meta.env.VITE_API_URL}/api/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Succès :", data);
        setFormValues({
          firstName: "",
          lastName: "",
          birthDate: "",
          startDate: "",
          street: "",
          city: "",
          zipCode: "",
          department: "",
          state: "",
        });
        setSuccessMessage("Employé ajouté avec succès !");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch((error) => {
        console.error("Erreur :", error);
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
          <select id="departmentSelect" className="col-span-2">
            {departments.map((dep) => (
              <option key={dep.id} value={dep.name}>
                {dep.name}
              </option>
            ))}
          </select>

          <p className="col-span-1 mr-4">State</p>
          <select id="stateSelect" className="col-span-2">
            {states.map((state) => (
              <option key={state.id} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
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
