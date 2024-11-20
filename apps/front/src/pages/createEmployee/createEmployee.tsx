import { useState } from "react";
import DropdownMenu from "@gmaxdev/dropdown-plugin";
import departments from "../../data/departments.json";
import states from "../../data/states.json";
import "@gmaxdev/dropdown-plugin/dist/style.css";

export default function CreateEmployee() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
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
              />
            </>
          ))}
          <p className="col-span-1 mr-4">Departments</p>
          <DropdownMenu
            className="w-full col-span-2 px-2 py-1 border"
            options={departments}
          />
          <p className="col-span-1 mr-4">State</p>
          <DropdownMenu
            className="w-full col-span-2 px-2 py-1 border"
            options={states}
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
