import { useState } from "react";
import ActionButton from "./ActionButton";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      await login({ username, password });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="mx-[15vh] flex items-center justify-center my-8">
      <form
        autoFocus
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="bg-main-1 flex flex-col border border-main-2 p-4 rounded-xl"
      >
        <input
          className="border border-main-2 focus:outline-none focus:ring-4 focus:ring-secondary rounded-md p-2 text-lg my-2"
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="rounded-md border border-main-2 focus:outline-none focus:ring-4 focus:ring-secondary p-2 text-lg my-2"
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <ActionButton className="text-lg my-2" type="submit" style={1}>
          Login
        </ActionButton>
      </form>
    </div>
  );
}
