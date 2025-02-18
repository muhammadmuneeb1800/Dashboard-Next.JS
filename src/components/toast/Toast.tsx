import { Toaster, toast, ToastOptions } from "react-hot-toast";

type ToastType = "success" | "error" | "loading" | "default";

const showToast = (
  type: ToastType,
  message: string,
  options?: ToastOptions
): void => {
  if (type === "success") {
    toast.success(message, options);
  } else if (type === "error") {
    toast.error(message, options);
  } else if (type === "loading") {
    toast.loading(message, options);
  } else {
    toast(message, options);
  }
};

const Toast: React.FC = () => {
  return <Toaster position="top-center" reverseOrder={false} />;
};

export { Toast, showToast };
