"use client";
import { topBarDetails } from "@/types/types";
import Link from "next/link";
import React from "react";
import * as Icons from "react-icons/fa";
import * as IoIcons from "react-icons/io5";
import * as MdIcons from "react-icons/md";
import * as TbIcons from "react-icons/tb";

const getIcons = (iconName: string) => {
  return (
    Icons[iconName as keyof typeof Icons] ||
    IoIcons[iconName as keyof typeof IoIcons] ||
    MdIcons[iconName as keyof typeof MdIcons] ||
    TbIcons[iconName as keyof typeof TbIcons] ||
    null
  );
};

export default function TopBar(props: topBarDetails) {
  const Icon1 = getIcons(props.icon1 as string);
  const Icon2 = getIcons(props.icon2 as string);
  const Icon3 = getIcons(props.icon3 as string);
  const Icon4 = getIcons(props.icon4 as string);
  return (
    <>
      <div className="flex justify-between shadow items-center px-3 md:px-7 bg-white py-3 mt-5 rounded">
        <div>
          <p className="text-xl font-medium">
            {props.title}{" "}
            {props.sabTitle && (
              <span className="text-lg text-info">({props.sabTitle})</span>
            )}
          </p>
        </div>
        <div className="flex justify-center gap-5">
          {Icon1 && (
            <Link
              href={props?.link || "#"}
              onClick={props.onclick}
              className="border cursor-pointer text-center p-2 md:p-3 rounded-md"
            >
              {Icon1 && <Icon1 className="text-base md:text-xl lg:text-2xl" />}
            </Link>
          )}
          {Icon2 && (
            <div className="hidden md:block border cursor-pointer text-center p-3 rounded-md">
              {Icon2 && <Icon2 className="md:text-lg lg-text-xl" />}
            </div>
          )}
          {Icon3 && (
            <div className="hidden md:block border cursor-pointer text-center p-3 rounded-md">
              {Icon3 && <Icon3 className="md:text-xl lg:text-2xl" />}
            </div>
          )}
          {Icon4 && (
            <div className="hidden md:block border cursor-pointer text-center p-3 rounded-md">
              {Icon4 && <Icon4 className="md:text-xl lg:text-2xl" />}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
