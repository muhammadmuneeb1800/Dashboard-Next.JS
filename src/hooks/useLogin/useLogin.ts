"use client";

import { useState } from "react";

export default function useLogin() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = () => {
    console.log("Login handler called", setError);
  };
  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
  };
}
