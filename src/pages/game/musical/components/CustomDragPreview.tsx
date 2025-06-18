import { useDragLayer } from 'react-dnd';

export default function CustomDragPreview() {
    const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        currentOffset: monitor.getClientOffset(),
        isDragging: monitor.isDragging(),
    }));

    if (!isDragging || !currentOffset) {
        return null;
    }

    return (
        <img
            src={item.url}
            style={{
                position: 'fixed',
                pointerEvents: 'none',
                left: currentOffset.x,
                top: currentOffset.y,
                transform: 'translate(-50%, -50%)',
                zIndex: 1000,
                scale: '0.7'
            }}
        />
    );
};