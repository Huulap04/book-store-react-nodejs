import { NavLink , Link} from "react-router-dom";

function Navbar() {
  return (
    <nav className=" navbar-light bg-secondary px-4 shadow-sm navbar ">
      <div className="d-flex align-items-center">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/images/logo.png"
            alt="logo"
            style={{ height: "30px", marginRight: "8px" }}
          />
        </Link>

        <NavLink
          to="/"
          className={({ isActive }) =>
            "nav-link mx-2 " +
            (isActive ? "fw-bold text-warning" : "text-white")
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/Books"
          className={({ isActive }) =>
            "nav-link mx-2 " +
            (isActive ? "fw-bold text-warning" : "text-white")
          }
        >
          Books
        </NavLink>

        <NavLink
          to="/Contact"
          className={({ isActive }) =>
            "nav-link mx-2 " +
            (isActive ? "fw-bold text-warning" : "text-white")
          }
        >
          Contact
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
