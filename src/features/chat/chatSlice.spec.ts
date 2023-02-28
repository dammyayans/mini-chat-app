import {
  chatReducer,
  ChatState,
  selectConversation,
  sendMessage,
} from "./chatSlice";

describe("chat reducer", () => {
  const initialState: ChatState = {
    status: "idle",
    errorMessage: "",
    conversations: [],
    selectedConversation: null,
    textMessage: "",
    editMode: false,
    messageToEdit: null,
  };

  const conversations = [
    {
      id: "1",
      name: "Dammy - Blink",
      last_updated: "023-02-26T12:52:55.066Z",
      messages: [
        {
          id: "11",
          text: "React Role",
          last_updated: "2023-02-26T12:52:55.466Z",
        },
      ],
    },
  ];

  it("should handle initial state", () => {
    expect(chatReducer(initialState, { type: "unknown" })).toEqual({
      status: "idle",
      errorMessage: "",
      conversations: [],
      selectedConversation: null,
      textMessage: "",
      editMode: false,
      messageToEdit: null,
    });
  });

  it("should handle selectConversation", () => {
    const actual = chatReducer(
      initialState,
      selectConversation(conversations[0])
    );
    expect(actual.selectedConversation).toBe(conversations[0]);
  });

  it("should handle sendMessage", () => {
    const newMessage = {
      id: "22",
      text: "New Message",
      last_updated: "2023-02-26T12:52:55.466Z",
    };
    const newConversation = [
      {
        id: "1",
        name: "Dammy - Blink",
        last_updated: "023-02-26T12:52:55.066Z",
        messages: [
          {
            id: "11",
            text: "React Role",
            last_updated: "2023-02-26T12:52:55.466Z",
          },
          newMessage,
        ],
      },
    ];
    const state = chatReducer(
      initialState,
      selectConversation(conversations[0])
    );
    const actual = chatReducer(
      state,
      sendMessage({ id: conversations[0].id, message: newMessage })
    );

    expect(actual.selectedConversation).toEqual(newConversation[0]);
  });
});
