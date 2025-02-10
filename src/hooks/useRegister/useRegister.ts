"use client";
import { useState } from "react";

export default function useRegister() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [employeesNumber, setEmployeesNumber] = useState<number | string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = () => {
    console.log("Login handler called");
  };
  return {
    name,
    setName,
    email,
    setEmail,
    companyName,
    setCompanyName,
    industry,
    setIndustry,
    employeesNumber,
    setEmployeesNumber,
    password,
    setPassword,
    handleRegister,
  };
}
