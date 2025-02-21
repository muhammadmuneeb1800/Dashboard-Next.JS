"use client";

import React from "react";
import Input from "../input/Input";
import Button from "../button/Button";
import useEditProfile from "@/hooks/useEditProfile/useEditProfile";

export default function EditProfile() {
  const {
    name,
    setName,
    email,
    setEmail,
    company,
    setCompany,
    loading,
    handleSaveChanges,
  } = useEditProfile();
  return (
    <>
      <form onSubmit={handleSaveChanges}>
        <div className="mt-10">
          <label htmlFor="name">Name</label>
          <div className="my-2 md:my-4 shadow-sm">
            <Input
              type="text"
              id="name"
              placeholder="muneeb"
              value={name}
              border="border"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="email">Email</label>
          <div className="my-2 md:my-4 shadow-sm">
            <Input
              type="email"
              id="email"
              placeholder="email"
              value={email}
              border="border"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="companyName">Company Name</label>
          <div className="my-2 md:my-4 shadow-sm">
            <Input
              type="text"
              id="companyName"
              placeholder="Company Name"
              value={company}
              border="border"
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
        </div>
        {loading ? (
          <div className="mt-5">
            <Button
              text="Saving..."
              bg="bg-primary"
              color="text-white"
              hBg="bg-white"
              hColor="text-primary"
              borderWidth="border-2"
              borderColor="border-primary"
            />
          </div>
        ) : (
          <div className="mt-5">
            <Button
              text="Save Changes"
              type="submit"
              bg="bg-primary"
              color="text-white"
              hBg="bg-white"
              hColor="text-primary"
              borderWidth="border-2"
              borderColor="border-primary"
            />
          </div>
        )}
      </form>
    </>
  );
}
