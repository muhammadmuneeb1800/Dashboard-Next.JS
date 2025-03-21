import React from "react";
import { inputDetails } from "@/types/types";
import { ImCross } from "react-icons/im";

export default function Input(props: inputDetails) {
  const handleCross = () => {
    if (props.onChange) {
      props.onChange({
        target: { value: "" },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };
  return (
    <div
      className={`${props.border} ${props.borderColor} bg-white rounded-md px-2 md:px-4 justify-between text-sm items-center w-full flex`}
    >
      <input
        type={props?.type}
        placeholder={props?.placeholder}
        required={true}
        id={props?.id}
        value={props?.value}
        onChange={props?.onChange}
        className={`w-full outline-none ${
          props.placeholder === "Search" && "text-info"
        } text-lg md:text-xl py-2`}
      />
      {props?.value && (
        <ImCross
          className="text-black text-[10px] md:text-[14px]"
          onClick={handleCross}
        />
      )}
    </div>
  );
}
