import { Outlet } from "react-router-dom";
import Header from "../header/header";

export default function Layout() {
  return (
    <>
      <div className="d-flex flex-column mainContainer">
        <Header />
        <Outlet />
      </div>
    </>
  );
}
