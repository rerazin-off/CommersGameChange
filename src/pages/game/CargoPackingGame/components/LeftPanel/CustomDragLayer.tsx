import { useDragLayer } from "react-dnd";

type DragItem = {
  id: string;
  category: string;
  icon?: string;
  label?: string;
};

export const CustomDragLayer = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem() as DragItem | null,
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging || !item || !currentOffset) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          position: "absolute",
          transform: `translate3d(${currentOffset.x}px, ${currentOffset.y}px, 0)`,
          willChange: "transform",
        }}
      >
        <div
          style={{
            width: 140,
            height: 140,
            background: "rgba(255,255,255,0.92)",
            borderRadius: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {item.icon ? (
            <img
              src={item.icon}
              alt={item.label ?? ""}
              style={{ width: 96, height: 96, objectFit: "contain" }}
              draggable={false}
            />
          ) : null}

          {item.label ? (
            <div style={{ fontSize: 14, textAlign: "center" }}>{item.label}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
