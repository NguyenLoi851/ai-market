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
import { ChatRequestOptions, ChatResponse } from '@/lib/definitions/chat';
import { GetServerSideProps } from 'next';
import { Arapey } from 'next/font/google';
import { usePayModel } from '@/hooks/payment/use-pay-model';

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
  const {mutateAsync: payModel} = usePayModel()

  const handleSubmit = async (e?: {preventDefault?: () => void;}, chatRequestOptions?: ChatRequestOptions) => {
    if(e && e.preventDefault){
      e.preventDefault();
    }
    if (!input.trim()) return;
    setIsLoading(true);
    
    // Mô phỏng thêm tin nhắn mới vào danh sách
    const newMessage : Message = {
      id: `${messages.length + 1}`,
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    let res : ChatResponse =  await generateMessage([...messages, newMessage]);

    let message : Message = mapChatResponseToMessages(res);

    setMessages((prev) => [...prev, message]);

    setIsLoading(false);

  };

  const generateMessage = async (currentMessages : Message[]) : Promise<ChatResponse> => {
    const Url : string = process.env.MODEL_CHAT_URL ?? "", 
    Token : string = process.env.MODEL_AUTH_TOKEN ?? "",
    ModelName: string = process.env.MODEL_NAME ?? "";
    const response = await fetch( Url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Token}`,
      },
      body: JSON.stringify({
        model: ModelName,
        messages: currentMessages,
      }),
    });

    const result : ChatResponse = await response.json() as ChatResponse;

    await payModel(Number(id))
    return result;
  }


  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  // const [attachments, setAttachments] = useState<Array<Attachment>>([]);
  const append = async (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => {
    setInput(message.content);
    await handleSubmit();
    return null;
  }


  const stop = () => {
    
  }

  function mapChatResponseToMessages(chatResponse: ChatResponse): Message {
    let choices : ChatResponse["choices"] = chatResponse.choices;
    if(choices.length == 0){
      return {
        id: "",
        content: "",
        role: 'assistant'
      };
    }
    let choice : ChatResponse["choices"][number] = choices[0];
    return {
      id: chatResponse.id + '-' + choice.index, // Tạo ID từ `id` của ChatResponse và index của message
      content: choice.message.content,
      role: choice.message.role,
    }
  }

  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background h-screen-minus-92">
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
 