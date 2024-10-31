'use client';

// import { Attachment } from 'ai';
import { useChat } from 'ai/react';
import { useState } from 'react';

import { ChatHeader } from '@/components/chat/chat-header';
import { Message as PreviewMessage } from '@/components/chat/message';
import { useScrollToBottom } from '@/components/scroll/scroll';
import { Model } from '@/lib/definitions/model';
import type { CreateMessage, Message } from '@/lib/definitions/message';

import { MultimodalInput } from './multimodal-input';
import { Overview } from './overview';
import { ChatRequestOptions } from '@/lib/definitions/chat';

export function Chat({
  id,
  initialMessages,
  selectedModelName,
}: {
  id: string;
  initialMessages: Array<Message>;
  selectedModelName: Model['name'];
}) {
  
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e?: {preventDefault?: () => void;}, chatRequestOptions?: ChatRequestOptions) => {
    if(e && e.preventDefault){
      e.preventDefault();
    }

    if (!input.trim()) return;
    debugger
    setIsLoading(true);
    
    // Mô phỏng thêm tin nhắn mới vào danh sách
    const newMessage : Message = {
      id: `${messages.length + 1}`,
      role: 'user',
      content: input,
    };
    setMessages((prev) => [...prev, newMessage]);

    // Gọi API giả lập
    setTimeout(() => {
      const responseMessage : Message = {
        id: `${messages.length + 2}`,
        role: 'assistant',
        content: `Bot trả lời: ${input}`,
      };
      setMessages((prev) => [...prev, responseMessage]);
      setIsLoading(false);
      setInput(''); // Xóa input sau khi gửi tin
    }, 1000);
  };


  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  // const [attachments, setAttachments] = useState<Array<Attachment>>([]);
  const append = async (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => {
    return null;
  }

  const stop = () => {
    
  }

  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background">
      <ChatHeader selectedModelName={selectedModelName} />
      <div
        ref={messagesContainerRef}
        className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll"
      >
        {messages.length === 0 && <Overview />}

        {messages.map((message) => (
          <PreviewMessage
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}

        <div
          ref={messagesEndRef}
          className="shrink-0 min-w-[24px] min-h-[24px]"
        />
      </div>
      <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
        <MultimodalInput
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          stop={stop}
          messages={messages}
          append={append}
        />
      </form>
    </div>
  );
}
 