import { twMerge } from "tailwind-merge";
import { generateId } from "ai";

import { clsx, type ClassValue } from "clsx";
import { Message, DbMessage } from "./definitions/message";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToUIMessages(messages: Array<DbMessage>): Array<Message> {
  return messages.reduce((chatMessages: Array<Message>, message) => {

    let textContent = "";

    if (typeof message.content === "string") {
      textContent = message.content;
    } else if (Array.isArray(message.content)) {
      for (const content of message.content) {
        if (content === "text") {
          textContent += content;
        }
      }
    }

    chatMessages.push({
      id: generateId(),
      role: message.role,
      content: textContent,
    });

    return chatMessages;
  }, []);
}
