import { useSortable } from "@dnd-kit/sortable";
import styles from './gameItem.css';
import { CSS } from "@dnd-kit/utilities";

const GameItem = ({id, color, children}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className='item'
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
        backgroundColor: color
      }}
      
    >
      {children}
    </div>
  );
};

export default GameItem;
