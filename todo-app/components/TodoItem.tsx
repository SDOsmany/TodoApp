// frontend/components/TodoItem.tsx

import React from 'react';

type Props = {
  id: number;
  text: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

const TodoItem = ({ id, text, completed, onToggle, onDelete }: Props) => {
  return (
    <li
      className={`${
        completed ? 'line-through text-gray-400' : ''
      } cursor-pointer`}
      onClick={() => onToggle(id)}
    >
      <span className="mr-2">{text}</span>
      <button
        className="text-red-400"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
      >
        X
      </button>
    </li>
  );
};

export default TodoItem;