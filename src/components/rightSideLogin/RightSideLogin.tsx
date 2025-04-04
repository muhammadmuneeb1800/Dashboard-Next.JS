import React from "react";
import Image from "next/image";
import Button from "../button/Button";

export default function RightSideLogin() {
  return (
    <>
      <h1 className="text-xl md:text-2xl text-center text-white font-bold mt-14 mb-3">
        ALL IN ONE DASHBOARD
      </h1>
      <div className="flex justify-center items-center md:px-4">
        <Image
          src="/assets/images/dashboard-preview.png"
          alt="All in one dashboard image"
          width={680}
          height={680}
        />
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
