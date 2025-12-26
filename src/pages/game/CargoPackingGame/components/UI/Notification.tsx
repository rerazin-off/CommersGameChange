import { FC, useEffect } from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export const Notification: FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isError = type === "error";

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10000,

        // ✅ единые размеры
        width: "min(660px, 100%)",
        padding: "30px 0px",
        borderRadius: 16,

        // ✅ единый стиль
        background: isError
          ? "rgba(180, 50, 50, 0.9)"
          : "rgba(76, 175, 80, 0.9)",

        color: "#ffffff",
        fontSize: 36,
        fontWeight: 500,
        lineHeight: 1.15,
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      {message}
    </div>
  );
};
