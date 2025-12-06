import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { registerUser } = useContext(AuthContext);
  const nav = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setMsg("All fields are required");
      return;
    }

    const res = await registerUser(form.name, form.email, form.password);

    if (res.success) {
      setMsg("Registered Successfully! Redirecting to login...");
      setTimeout(() => nav("/login"), 1000);
    } else {
      setMsg(res.message); // Email exists / validation error
    }
  };

  return (
    <div className="form-page">
      <form onSubmit={submit}>
        <h2>Create Account</h2>

        <input
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="btn" style={{ width: "100%" }}>
          Register
        </button>

        {msg && <p style={{ color: res?.success ? "green" : "red" }}>{msg}</p>}
      </form>
    </div>
  );
}
