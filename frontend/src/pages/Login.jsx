import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);

    if (res.success) {
      nav("/");
    } else {
      setMsg(res.message); // show error message if credentials mismatch
    }
  };

  return (
    <form onSubmit={submit} style={{ padding: 20 }}>
      <h2>Login</h2>

      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />

      <button className="btn" style={{ width: "100%" }} type="submit">Login</button>
      {msg && <p style={{ color:"red" }}>{msg}</p>}
    </form>
  );
}
