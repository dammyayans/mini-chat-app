import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Loading from "components/Loading";
import {
  selectConversation,
  Conversation as ConversationType,
} from "../../chatSlice";
import { sortByDate } from "utils/sortByDate";
import Conversation from "./Conversation";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const chat = useAppSelector((state) => state.chat);

  const handleConversationClick = (conversation: ConversationType) => {
    dispatch(selectConversation(conversation));
  };

  const conversations = useMemo(() => {
    return sortByDate(chat.conversations, "last_updated", "asc") ?? [];
  }, [chat.conversations]);

  return (
    <header>
      <aside
        className="fixed left-0 top-0 z-10 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
        id="side-bar"
      >
        <section className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
          <h1 className="text-2xl mb-4 font-bold text-white">Mini Chat</h1>

          {chat.status === "loading" ? (
            <Loading />
          ) : (
            <ul className="space-y-2">
              {conversations.map((conversation) => (
                <Conversation
                  key={conversation.id}
                  name={conversation.name}
                  selected={chat.selectedConversation?.id === conversation.id}
                  onClick={() => handleConversationClick(conversation)}
                />
              ))}
            </ul>
          )}
        </section>
      </aside>
    </header>
  );
};

export default Sidebar;
