import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container navbar-content">
        
        <Link to="/" className="navbar-brand">PASOVIT</Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>

          {user ? (
            <>
              <span style={{ marginLeft: 20, fontWeight: 500 }}>{user.name}</span>
              <button className="btn-outline" onClick={logout} style={{ marginLeft: 15 }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
