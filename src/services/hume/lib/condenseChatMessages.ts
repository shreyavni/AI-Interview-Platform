import { ConnectionMessage } from "@humeai/voice-react";

interface ChatEvent {
  type: "USER_MESSAGE" | "AGENT_MESSAGE" | string;
  messageText?: string;
  role?: string;
  emotionFeatures?: unknown;
}

interface JsonMessage {
  type: "user_message" | "assistant_message" | string;
  message: {
    content: string;
  };
}

type Message = ChatEvent | JsonMessage | ConnectionMessage;

export function condenseChatMessages(messages: Message[]) {
  return messages.reduce(
    (acc, message) => {
      const data = getChatEventData(message) ?? getJsonMessageData(message);
      if (data == null || data.content == null) {
        return acc;
      }

      const lastMessage = acc.at(-1);
      if (lastMessage == null) {
        acc.push({ isUser: data.isUser, content: [data.content] });
        return acc;
      }

      if (lastMessage.isUser === data.isUser) {
        lastMessage.content.push(data.content);
      } else {
        acc.push({ isUser: data.isUser, content: [data.content] });
      }

      return acc;
    },
    [] as { isUser: boolean; content: string[] }[],
  );
}

function getJsonMessageData(message: Message) {
  if (message.type !== "user_message" && message.type !== "assistant_message") {
    return null;
  }

  const jsonMessage = message as JsonMessage;
  return {
    isUser: jsonMessage.type === "user_message",
    content: jsonMessage.message.content,
  };
}

function getChatEventData(message: Message) {
  if (message.type !== "USER_MESSAGE" && message.type !== "AGENT_MESSAGE") {
    return null;
  }

  const chatEvent = message as ChatEvent;
  return {
    isUser: chatEvent.type === "USER_MESSAGE",
    content: chatEvent.messageText,
  };
}
