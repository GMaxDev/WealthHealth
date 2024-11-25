import { useState } from "react";
import DropdownMenu from "@gmaxdev/dropdown-plugin";
import departments from "../../data/departments.json";
import states from "../../data/states.json";
import "@gmaxdev/dropdown-plugin/dist/style.css";

export default function CreateEmployee() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedState, setSelectedState] = useState("");
  type FormValues = {
    firstName: string;
    lastName: string;
    birthDate: string;
    startDate: string;
    street: string;
    city: string;
    zipCode: string;
    state: string;
    department: string;
  };

  const [formValues, setFormValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    birthDate: "",
    startDate: "",
    street: "",
    city: "",
    zipCode: "",
    state: "",
    department: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    data.department = selectedDepartment;
    data.state = selectedState;

    console.log("Form data being sent:", data);

    fetch(`${import.meta.env.VITE_API_URL}/data/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        setFormValues({
          firstName: "",
          lastName: "",
          birthDate: "",
          startDate: "",
          street: "",
          city: "",
          zipCode: "",
          state: "",
          department: "",
        });
        setSelectedDepartment("");
        setSelectedState("");

        setSuccessMessage("Employé ajouté avec succès !");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Une erreur est survenue.");
      });
  };

  return (
    <form
      className="flex flex-col items-center justify-center"
      onSubmit={handleSubmit}
    >
      {successMessage && (
        <div className="p-4 mb-4 text-green-700 bg-green-200 rounded">
          {successMessage}
        </div>
      )}

      <section className="p-6 mt-10 bg-gray-300 rounded-2xl">
        <div className="gap-6 mb-4">
          {[
            { label: "First Name", name: "firstName", type: "text" },
            { label: "Last Name", name: "lastName", type: "text" },
            { label: "Date of Birth", name: "birthDate", type: "date" },
            { label: "Start Date", name: "startDate", type: "date" },
          ].map((field) => (
            <div key={field.name} className="grid grid-cols-3 gap-6">
              <p className="col-span-1 mr-4">{field.label}</p>
              <input
                className="w-full col-span-2 px-2 py-1 border"
                type={field.type}
                name={field.name}
                value={formValues[field.name as keyof FormValues]}
                onChange={handleChange}
                aria-label={field.label}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="p-6 mt-10 bg-gray-300 rounded-2xl">
        <div className="gap-6 mb-4 ">
          {[
            { label: "Street", name: "street", type: "text" },
            { label: "City", name: "city", type: "text" },
            { label: "Zip Code", name: "zipCode", type: "text" },
          ].map((field) => (
            <div key={field.name} className="grid grid-cols-3 gap-6">
              <p className="col-span-1 mr-4">{field.label}</p>
              <input
                className="w-full col-span-2 px-2 py-1 border"
                type={field.type}
                name={field.name}
                value={formValues[field.name as keyof FormValues]}
                onChange={handleChange}
                aria-label={field.label}
              />
            </div>
          ))}
          <div className="grid grid-cols-3 gap-6">
            <p className="col-span-1 mr-4">State</p>
            <DropdownMenu
              options={states}
              value={selectedState}
              onChange={(value: string) => setSelectedState(value)}
              style="col-span-2"
            />
          </div>
          <div className="grid grid-cols-3 gap-6">
            <p className="col-span-1 mr-30">Departments</p>
            <DropdownMenu
              options={departments}
              value={selectedDepartment}
              onChange={(value: string) => setSelectedDepartment(value)}
              style="col-span-2"
            />
          </div>
        </div>
      </section>

      <button
        type="submit"
        className="px-4 py-2 mt-6 text-white bg-blue-800 rounded"
      >
        Submit
      </button>
    </form>
  );
}
