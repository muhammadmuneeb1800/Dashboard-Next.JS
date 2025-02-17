import { IconType } from "react-icons";

interface button {
  text?: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  bg: string;
  color: string;
  hBg: string;
  hColor: string;
  icon?: IconType;
  borderColor?: string;
  hBorderColor?: string;
  borderWidth?: string;
}

export default function Button(props: button) {
  return (
    <>
      <button
        type={props.type}
        onClick={props.onClick}
        className={`${props.bg} w-full ${props.color} px-5 py-2 rounded-lg font-medium text-xl md:text-2xl leading-6 ${props.borderColor} ${props.borderWidth} hover:${props.hBg} hover:${props.hColor} hover:${props.borderWidth} hover:${props.hBorderColor} duration-500`}
      >
        {props.icon ? <props.icon /> : props.text}
      </button>
    </>
  );
}
