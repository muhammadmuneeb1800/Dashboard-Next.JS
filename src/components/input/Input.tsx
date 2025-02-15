import React from "react";
import { ImCross } from "react-icons/im";

interface inputDetails {
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  border?: string;
  borderColor?: string;
  id?: string;
  type?: string;
  placeholder?: string;
}

export default function Input(props: inputDetails) {
  const handleCross = () => {
    if (props.onChange) {
      props.onChange({
        target: { value: "" },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };
  return (
    <>
      <div
        className={`${props.border} ${props.borderColor} rounded-md justify-between items-center w-full flex`}
      >
        <input
          type={props.type}
          placeholder={props.placeholder}
          required={true}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          className={`w-full outline-none text-xl px-3 py-2`}
        />
        {props.value && (
          <ImCross className="text-black" onClick={() => handleCross()} />
        )}
      </div>
    </>
  );
}
