import type { ModelView } from "@/lib/definitions/model";
import ModelChat from "/public/model-chat.png";
import Chatbot1 from "/public/models/chatbot_1.png";
import Chatbot2 from "/public/models/chatbot_2.png";
import Chatbot3 from "/public/models/chatbot_3.png";
import Chatbot4 from "/public/models/chatbot_4.png";
import Chatbot5 from "/public/models/chatbot_5.png";
import Image from "next/image";
import { useRouter } from 'next/router';

export default function ModelCard({ model }: { model: ModelView }) {
  const router = useRouter();

  const handleButtonClick = () => {
    // Navigate to the desired route with model.blockchainId
    router.push(`/chat/${model.blockchainId}`);
  };

  const chatbotImgs = [Chatbot1, Chatbot2, Chatbot3, Chatbot4, Chatbot5];

  return (
    <div className="border rounded-lg p-4 bg-white shadow-md w-full max-w-xs h-fit">
      <div className="flex items-center justify-between mb-2">
        <Image
          priority
          src={chatbotImgs[Math.floor(Math.random() * 4)]}
          alt="Model"
          width="30"
          height="24"
          className="d-inline-block align-text-top"
        />
        <button 
          onClick={handleButtonClick} // Attach the onClick handler here
          className="text-black bg-gray-200 p-2 rounded-full"
        >
          ➔
        </button>
      </div>
      <h3 className="font-bold text-lg">{model.name}</h3>
      <p className="text-gray-500">{model.description}</p>
      <p className="text-gray-500">Creator: {model.creator}</p>
      <p className="text-gray-500">Number of usage: {model.usageCount}</p>
      <p className="text-gray-500">Fee/prompt: {model.feePerPrompt} OpenAgents Token</p>
      <div className="flex items-center mt-4 space-x-2">
        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
          {model.type}
        </span>
        <span className="text-gray-500 text-sm"></span>
      </div>
    </div>
  );
}