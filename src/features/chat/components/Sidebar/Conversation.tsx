import React, { FC, SyntheticEvent } from "react";
import cn from "classnames";

interface IProps {
  name: string;
  selected: boolean;
  onClick: (event: SyntheticEvent) => void;
}
const Conversation: FC<IProps> = ({ name, selected, onClick }) => {
  return (
    <li
      className={cn(
        "cursor-pointer p-2 mb-2 hover:bg-slate-600 hover:text-white font-medium",
        selected && "bg-white text-gray-800",
        !selected && "text-white"
      )}
      onClick={onClick}
    >
      <span>{name}</span>
    </li>
  );
};

export default Conversation;
