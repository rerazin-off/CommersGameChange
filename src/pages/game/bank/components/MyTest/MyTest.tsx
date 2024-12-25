import { useDrag } from 'react-dnd'

const MyTest = () => {
  const [collected, drag, dragPreview] = useDrag(() => ({
    item
  }))
  return collected.isDragging ? (
    <div ref={dragPreview} />
  ) : (
    <div ref={drag} {...collected}>
      ...
    </div>
  )
};

export default MyTest;