import React from "react";
import Image from "next/image";
import img from "../../../public/assets/images/dashboard-preview.png";
import Button from "../button/Button";

export default function RightSideLogin() {
  return (
    <>
      <h1 className="text-xl md:text-2xl text-center text-white font-bold mt-14 mb-3">
        ALL IN ONE DASHBOARD
      </h1>
      <div className="flex justify-center items-center md:px-4">
        <Image src={img} alt="All in one dashboard image" />
      </div>
      <p className="text-white text-center text-xl mt-5">
        Keep track of all patient information in this section.
      </p>
      <div className="text-center w-44 mx-auto mt-4">
        <Button
          text="Learn More"
          bg="bg-white"
          color="text-primary"
          hBg="bg-primary"
          hColor="text-white"
        />
      </div>
    </>
  );
}
