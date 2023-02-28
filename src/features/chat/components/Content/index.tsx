import React from "react";
import { useAppSelector } from "app/hooks";
import MessageBox from "components/MessageBox";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const Content = () => {
  const { status, selectedConversation, errorMessage } = useAppSelector(
    (state) => state.chat
  );

  return (
    <main className="h-screen p-4 sm:ml-64 relative">
      {status === "idle" && selectedConversation ? (
        <>
          <MessageList />
          <MessageInput />
        </>
      ) : (
        <MessageBox
          message={
            status === "loading"
              ? "Loading conversations"
              : status === "failed"
              ? errorMessage
              : "Select a conversation"
          }
        />
      )}
    </main>
  );
};

export default Content;
