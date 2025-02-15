"use client";
import { useState } from "react";
import * as yup from "yup";
import bcrypt from "bcryptjs";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function useRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [employeesNumber, setEmployeesNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const validateData = yup.object().shape({
        name: yup.string().required("Name is required!").min(3).max(20).trim(),
        email: yup
          .string()
          .email("Invalid Email")
          .required("Email is required!")
          .trim(),
        companyName: yup
          .string()
          .required("Company Name is required!")
          .min(3)
          .trim(),
        industry: yup.string().required("Industry is required!").min(3).trim(),
        employeesNumber: yup
          .string()
          .required("Employees Number is required!")
          .trim(),
        password: yup.string().required("Password is required!").min(8).trim(),
      });

      const hashedPassword = await bcrypt.hash(password, 10);
      const data = {
        name,
        email,
        companyName,
        industry,
        employeesNumber,
        password: hashedPassword,
      };
      const validatedData = await validateData.validate(data, {
        abortEarly: false,
      });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
        { data: validatedData }
      );
      if (response.status === 201) {
        alert("Successfully registered");
        router.push("/dashboard");
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        alert("Something went wrong! Please try again.");
      }
    }
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
    errors,
    handleRegister,
  };
}

// "use client";
// import { useState } from "react";
// import * as yup from "yup";
// import bcrypt from "bcryptjs";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// export default function useRegister() {
//   const [name, setName] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [companyName, setCompanyName] = useState<string>("");
//   const [industry, setIndustry] = useState<string>("");
//   const [employeesNumber, setEmployeesNumber] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});
//   const router = useRouter();

//   const handleRegister = async () => {
//     try {
//       const validateData = yup.object().shape({
//         name: yup
//           .string()
//           .required("Name is require!")
//           .min(3, "Name must be at least 3 characters")
//           .max(20, "Name too long")
//           .trim(),
//         email: yup
//           .string()
//           .email("Invalid Email")
//           .required("Email is require!")
//           .trim(),
//         companyName: yup
//           .string()
//           .required("Company Name is require!")
//           .min(3, "Company Name must be at least 3 characters")
//           .trim(),
//         industry: yup
//           .string()
//           .required("Industry is require!")
//           .min(3, "Industry must be at least 3 characters")
//           .trim(),
//         employeesNumber: yup
//           .string()
//           .required("Employees Number is require!")
//           .trim(),
//         password: yup
//           .string()
//           .required("Password is require!")
//           .min(8, "Password must be at least 8 characters")
//           .trim(),
//       });
//       const hashpasword = await bcrypt.hash(password, 10);
//       const data = {
//         name,
//         email,
//         companyName,
//         industry,
//         employeesNumber,
//         password: hashpasword,
//       };
//       const newData = await validateData.validate(data);
//       const user = await axios.post(`${process.env.NEXT_URL}/api/register`, {
//         data: newData,
//       });
//       if (user.status === 201) {
//         alert("Successfully registered");
//         router.push("/dashboard");
//       }
//     } catch (error: any) {
//       const newErrors: { [key: string]: string } = {};
//       error.inner.forEach((e: any) => {
//         newErrors[e.path] = e.message;
//       });
//       setErrors(newErrors);
//     }
//   };
//   return {
//     name,
//     setName,
//     email,
//     setEmail,
//     companyName,
//     setCompanyName,
//     industry,
//     setIndustry,
//     employeesNumber,
//     setEmployeesNumber,
//     password,
//     setPassword,
//     errors,
//     handleRegister,
//   };
// }
