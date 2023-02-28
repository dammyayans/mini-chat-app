import React, { FC, SyntheticEvent } from "react";
import { Message as IMessage } from "features/chat/chatSlice";
import moment from "moment";
import cn from "classnames";

interface Props extends IMessage {
  isEditting?: boolean;
  onClick?: (event: SyntheticEvent) => void;
}

const Message: FC<Props> = ({ text, last_updated, isEditting, onClick }) => {
  return (
    <div
      className={cn(
        "mb-3 sm:mb-5 cursor-pointer",
        isEditting && "bg-slate-400"
      )}
      onClick={onClick}
    >
      <span>{moment(last_updated).format("ddd, MMM D, H:mmA")}</span>
      <p className="text-xl capitalize">{text}</p>
    </div>
  );
};

export default Message;
