/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from "app/hooks";
import React, { useEffect } from "react";
import { getConversationsAsync } from "./chatSlice";
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";

const Chat = () => {
  const dispatch = useAppDispatch();
  const chat = useAppSelector((state) => state.chat);

  useEffect(() => {
    if (!chat.conversations?.length) {
      dispatch(getConversationsAsync());
    }
  }, [chat.conversations]);

  return (
    <>
      <Sidebar />
      <Content />
    </>
  );
};

export default Chat;
