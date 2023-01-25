import { createContext, useState } from "react";
import CustomToast from "../components/CustomToast";

const ToastContext = createContext({});

const ToastProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [variant, setVariant] = useState("success");

  return (
    <ToastContext.Provider
      value={{setShowToast, setToastText, setVariant}}
    >
      <CustomToast
        variant={variant}
        position={"top-end"}
        show={showToast}
        onClose={() => setShowToast(false)}
      >
        {toastText}
      </CustomToast>
      {children}
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };
