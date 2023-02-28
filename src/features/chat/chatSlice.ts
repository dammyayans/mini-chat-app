import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchConversations } from "./chatApi";

export type Message = {
  id: string;
  text: string;
  last_updated: Date;
};

export interface Conversation {
  id: string;
  name: string;
  last_updated: Date;
  messages: Message[];
}

export interface ChatState {
  status: "idle" | "loading" | "failed";
  errorMessage: string;
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  textMessage: string;
  editMode: boolean;
  messageToEdit: Message | null;
}

export const getConversationsAsync = createAsyncThunk(
  "chat/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchConversations();
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState: ChatState = {
  status: "idle",
  errorMessage: "",
  conversations: [],
  selectedConversation: null,
  textMessage: "",
  editMode: false,
  messageToEdit: null,
};
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },

    setTextMessage: (state, action) => {
      state.textMessage = action.payload;
    },

    sendMessage: (state, action) => {
      if (state.selectedConversation) {
        const newMessages = state.selectedConversation.messages?.length
          ? [...state.selectedConversation.messages]
          : [];

        // Check if sending an edited message
        if (state.messageToEdit) {
          newMessages.filter((message) => {
            if (message.id === state.messageToEdit?.id) {
              message.id = state.messageToEdit.id;
              message.text = state.textMessage;
              message.last_updated = action.payload.message.last_updated;
              return message;
            }
            return message;
          });
        } else {
          newMessages.push(action.payload.message);
        }

        // Update selected conversation messages
        state.selectedConversation.messages = newMessages;

        // Update conversations
        state.conversations?.filter((conversation) => {
          if (conversation.id === action.payload.conversationId) {
            conversation.messages = newMessages;
            conversation.last_updated = action.payload.message.last_updated;
            return conversation;
          }
          return conversation;
        });

        state.textMessage = "";
        state.messageToEdit = null;
      }
    },

    selectMessage: (state, action) => {
      state.messageToEdit = action.payload.message;
      state.editMode = true;
    },

    cancelEdit: (state) => {
      state.editMode = false;
      state.messageToEdit = null;
    },

    editMessage: (state, action) => {
      if (state.selectedConversation) {
        state.textMessage = state.messageToEdit?.text ?? "";
        state.editMode = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConversationsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getConversationsAsync.fulfilled, (state, action) => {
        state.conversations = action?.payload;
        state.status = "idle";
      })
      .addCase(getConversationsAsync.rejected, (state, action) => {
        state.errorMessage = "Couldn't get conversations";
        state.status = "failed";
      });
  },
});

export const {
  selectConversation,
  setTextMessage,
  sendMessage,
  selectMessage,
  editMessage,
  cancelEdit,
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;
