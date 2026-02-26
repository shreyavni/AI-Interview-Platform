import { env } from "@/data/env/server";
import { HumeClient } from "hume";

interface ChatEvent {
  type: "USER_MESSAGE" | "AGENT_MESSAGE" | string;
  messageText?: string;
  role?: string;
  emotionFeatures?: unknown;
}

export async function fetchChatMessages(
  humeChatId: string,
): Promise<ChatEvent[]> {
  "use cache";

  const client = new HumeClient({ apiKey: env.HUME_API_KEY });
  const allChatEvents: ChatEvent[] = [];
  const chatEventsIterator = await client.empathicVoice.chats.listChatEvents(
    humeChatId,
    { pageNumber: 0, pageSize: 100 },
  );

  for await (const chatEvent of chatEventsIterator) {
    allChatEvents.push(chatEvent as ChatEvent);
  }

  return allChatEvents;
}
