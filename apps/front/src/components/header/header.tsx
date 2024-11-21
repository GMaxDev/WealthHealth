import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Header() {
  const location = useLocation(); // Récupère l'URL actuelle

  return (
    <div className="flex items-center justify-between bg-lime-800">
      <div>
        <ul className="flex gap-3 ml-4">
          {/* Le lien "Create Employee" */}
          <li
            className={`${
              location.pathname === "/" ? "bg-lime-950" : ""
            } p-2 rounded w-full grid place-items-center`} // Utilisation de Grid pour centrer
          >
            <Link to="/" className="w-full text-center text-gray-200">
              Create Employee
            </Link>
          </li>

          {/* Le lien "View Current Employees" */}
          <li
            className={`${
              location.pathname === "/current" ? "bg-lime-950" : ""
            } p-2 rounded w-full grid place-items-center`} // Utilisation de Grid pour centrer
          >
            <Link to="/current" className="w-full text-center text-gray-200">
              View Current Employees
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <img src={logo} alt="logo du site" className="h-10" />
      </div>
    </div>
  );
}
