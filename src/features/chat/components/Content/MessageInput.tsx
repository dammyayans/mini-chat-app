import React, { SyntheticEvent } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  sendMessage,
  setTextMessage,
  editMessage,
  cancelEdit,
} from "features/chat/chatSlice";
import { uid } from "react-uid";

const MessageInput = () => {
  const dispatch = useAppDispatch();
  const { textMessage, editMode, messageToEdit, selectedConversation } =
    useAppSelector((state) => state.chat);

  const handleChange = (message: string) => {
    dispatch(setTextMessage(message));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (editMode) {
      dispatch(editMessage({ conversationId: selectedConversation?.id }));
      return;
    }
    const date = new Date().toISOString();
    const message = {
      id: uid(textMessage + date),
      text: textMessage,
      last_updated: date,
    };
    dispatch(
      sendMessage({ conversationId: selectedConversation?.id, message })
    );
  };

  const handleCancelClick = () => {
    dispatch(cancelEdit());
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center bg-white fixed bottom-0 right-0 left-0 sm:left-64 p-4">
        <label htmlFor="message" className="sr-only">
          Your message
        </label>
        <input
          id="message"
          value={editMode ? messageToEdit?.text : textMessage}
          onChange={(e) => handleChange(e.target.value)}
          type="text"
          className="block mr-4 p-4 w-full text-sm bg-gray-800 rounded-lg border border-gray-300 focus:ring-lime-800 focus:border-lime-800 placeholder-gray-400 text-white"
          placeholder="Your message..."
          required
          disabled={editMode}
        />
        <button
          type="submit"
          className="inline-flex items-center py-4 px-6 text-sm font-medium text-center text-white bg-lime-800 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-lime-600"
        >
          {editMode ? "Edit" : "Send"}
        </button>
        {editMode && (
          <button
            className="ml-2 text-whit py-4 px-4 font-medium bg-red-700 text-white border-0 rounded-lg"
            type="button"
            onClick={handleCancelClick}
          >
            X
          </button>
        )}
      </div>
    </form>
  );
};

export default MessageInput;
