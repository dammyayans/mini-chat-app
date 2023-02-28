import React, { FC } from "react";

type Props = {
  message: string;
};

const MessageBox: FC<Props> = ({ message }) => {
  return (
    <section className="h-full flex justify-center items-center">
      <h2 className="text-center text-lime-800 text-2xl">{message}</h2>
    </section>
  );
};

export default MessageBox;
