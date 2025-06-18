import { useDragLayer } from 'react-dnd';

export default function CustomDragPreview() {
    const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        currentOffset: monitor.getSourceClientOffset(),
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
                //transform: 'translate(-50%, -50%)',
                zIndex: 1000,
                opacity: 0.8,
                scale: '1.2',
            }}
        />
    );
};