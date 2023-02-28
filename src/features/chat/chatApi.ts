import { Conversation } from "./chatSlice";

const baseURl = "data.json";

export const fetchConversations = () => {
  return new Promise<Conversation[]>(async (resolve, reject) => {
    try {
      const res = await fetch(baseURl);
      const data = res.json();
      setTimeout(() => resolve(data), 2000);
    } catch (err) {
      reject(err);
    }
  });
};
