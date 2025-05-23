import { button } from "@/types/types";

export default function Button(props: button) {
  return (
    <button
      type={props?.type}
      onClick={props?.onClick}
      className={`${props.bg} ${props.color} ${props.width} px-5 py-2 rounded-lg font-medium text-lg md:text-xl leading-6 ${props.borderColor} ${props.borderWidth} hover:${props.hBg} hover:${props.hColor} hover:${props.borderWidth} hover:${props.hBorderColor} duration-500`}
    >
      {props?.icon ? <props.icon /> : props?.text}
    </button>
  );
}
