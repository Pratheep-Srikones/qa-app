import toast from "react-hot-toast";

export const toastSuccess = (message: string) => {
  toast.success(message, {
    style: {
      border: "1px solid #00FF00",
      padding: "16px",
      color: "#FFFFFF",
      background: "#1A001A", // Dark purple
    },
    iconTheme: {
      primary: "#00FF00",
      secondary: "#000000", // Black
    },
  });
};

export const toastError = (message: string) => {
  toast.error(message, {
    style: {
      border: "1px solid #FF0000",
      padding: "16px",
      color: "#FFFFFF",
      background: "#1A001A", // Dark purple
    },
    iconTheme: {
      primary: "#FF0000",
      secondary: "#000000", // Black
    },
  });
};
