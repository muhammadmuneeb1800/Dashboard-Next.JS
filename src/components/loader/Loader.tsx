import { LoaderProps } from "@/types/types";
import MoonLoader from "react-spinners/MoonLoader";

const Loader = ({ loading, color = "#2F80ED", size = 70 }: LoaderProps) => {
  return <MoonLoader loading={loading} color={color} size={size} />;
};

export default Loader;
