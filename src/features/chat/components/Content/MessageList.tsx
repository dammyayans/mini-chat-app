import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { sortByDate } from "utils/sortByDate";
import MessageBox from "components/MessageBox";
import Message from "./Message";
import { Message as IMessage, selectMessage } from "features/chat/chatSlice";

const Messages = () => {
  const { selectedConversation, messageToEdit, editMode } = useAppSelector(
    (state) => state.chat
  );
  const dispatch = useAppDispatch();

  const sortedMessages = useMemo(() => {
    return sortByDate(selectedConversation?.messages, "last_updated");
  }, [selectedConversation]);

  const handleMessageClick = (msg: IMessage) => {
    dispatch(selectMessage({ message: msg }));
  };

  return (
    selectedConversation && (
      <section className="pb-24">
        {sortedMessages.length ? (
          sortedMessages.map((msg) => (
            <Message
              key={msg.id}
              isEditting={msg === messageToEdit && !editMode}
              {...msg}
              onClick={() => handleMessageClick(msg)}
            />
          ))
        ) : (
          <MessageBox message="No Message found" />
        )}
      </section>
    )
  );
};

export default Messages;
