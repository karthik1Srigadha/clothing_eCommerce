import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { registerUser } = useContext(AuthContext);
  const nav = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    await registerUser(form.name, form.email, form.password);
    nav("/login");
  };

  return (
    <div className="form-page">
      <form onSubmit={submit}>
        <h2>Create Account</h2>

        <input
          placeholder="Your Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="btn" style={{ width: "100%" }}>
          Register
        </button>
      </form>
    </div>
  );
}
