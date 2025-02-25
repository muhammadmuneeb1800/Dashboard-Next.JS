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
    isPassword,
    setIsPassword,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleChangePassword,
    handleSaveChanges,
  } = useEditProfile();
  return (
    <>
      <div className="md:w-[70%] mx-auto bg-white p-6 rounded-md shadow-md mt-5">
        {isPassword ? (
          <form onSubmit={handleSaveChanges}>
            <h1 className="text-center font-bold text-lg md:text-xl text-primary">
              Update Profile
            </h1>
            <div className="mt-8">
              <label htmlFor="name">Name</label>
              <div className="my-2 md:my-4 shadow-sm">
                <Input
                  type="text"
                  id="name"
                  placeholder="name"
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
              <div className="mt-5 flex justify-between items-center">
                <Button
                  text="Saving..."
                  bg="bg-primary"
                  color="text-white"
                  hBg="bg-white"
                  hColor="text-primary"
                  borderWidth="border-2"
                  borderColor="border-primary"
                />
                <p className="text-info hover:text-primary hover:underline cursor-pointer">
                  Change Password
                </p>
              </div>
            ) : (
              <div className="mt-5 flex justify-between items-center">
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
                <p
                  onClick={() => setIsPassword(!isPassword)}
                  className="text-info hover:text-primary hover:underline cursor-pointer"
                >
                  Change Password
                </p>
              </div>
            )}
          </form>
        ) : (
          <form onSubmit={handleChangePassword}>
            <h1 className="text-center font-bold text-lg md:text-xl text-primary">
              Change Password
            </h1>
            <div className="mt-10">
              <label htmlFor="password">Old Password</label>
              <div className="my-2 md:my-4 shadow-sm">
                <Input
                  type="password"
                  id="password"
                  placeholder="old password"
                  value={oldPassword}
                  border="border"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="newPassword">New Password</label>
              <div className="my-2 md:my-4 shadow-sm">
                <Input
                  type="password"
                  id="newPassword"
                  placeholder="New Password"
                  value={newPassword}
                  border="border"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="confirmNewPassword">Confirm New Password</label>
              <div className="my-2 md:my-4 shadow-sm">
                <Input
                  type="password"
                  id="confirmNewPassword"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  border="border"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            {loading ? (
              <div className="mt-5 flex justify-between items-center">
                <Button
                  type="button"
                  text="Saving..."
                  bg="bg-primary"
                  color="text-white"
                  hBg="bg-white"
                  hColor="text-primary"
                  borderWidth="border-2"
                  borderColor="border-primary"
                />
                <p className="text-info hover:text-primary hover:underline cursor-pointer">
                  Update Profile
                </p>
              </div>
            ) : (
              <div className="mt-5 flex justify-between items-center">
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
                <p
                  onClick={() => setIsPassword(!isPassword)}
                  className="text-info hover:text-primary hover:underline cursor-pointer"
                >
                  Update Profile
                </p>
              </div>
            )}
          </form>
        )}
      </div>
    </>
  );
}
