"use client";
import React from "react";
import { IconType } from "react-icons";

interface topBarDetails {
  title?: string;
  sabTitle?: string;
  icon1?: IconType;
  icon2?: IconType;
  icon3?: IconType;
  icon4?: IconType;
  onclick?: () => void;
}

export default function TopBar(props: topBarDetails) {
  return (
    <>
      <div className="flex justify-between items-center px-6 bg-white py-3 mt-5 rounded">
        <div>
          <p className="text-xl font-medium">
            {props.title}{" "}
            {props.sabTitle && (
              <span className="text-lg text-info">({props.sabTitle})</span>
            )}
          </p>
        </div>
        <div className="flex justify-center gap-5">
          <div
            className="border cursor-pointer text-center p-3 rounded-md"
            onClick={props.onclick}
          >
            {props.icon1 && <props.icon1 className="text-xl" />}
          </div>
          <div className="border cursor-pointer text-center p-3 rounded-md">
            {props.icon2 && <props.icon2 className="text-xl" />}
          </div>
          <div className="border cursor-pointer text-center p-3 rounded-md">
            {props.icon3 && <props.icon3 className="text-2xl" />}
          </div>
          <div className="border cursor-pointer text-center p-3 rounded-md">
            {props.icon4 && <props.icon4 className="text-2xl" />}
          </div>
        </div>
      </div>
    </>
  );
}
