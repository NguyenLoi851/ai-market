import type { ModelView } from "@/lib/definitions/model";
import Chatbot1 from "/public/models/chatbot_1.png";
import Chatbot2 from "/public/models/chatbot_2.png";
import Chatbot3 from "/public/models/chatbot_3.png";
import Chatbot4 from "/public/models/chatbot_4.png";
import Chatbot5 from "/public/models/chatbot_5.png";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ModelCard({ model }: { model: ModelView }) {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(`/chat/${model.blockchainId}`);
  };

  const chatbotImgs = [Chatbot1, Chatbot2, Chatbot3, Chatbot4, Chatbot5];

  return (
    <div className="border rounded-lg p-8 bg-gradient-to-r from-blue-50 to-blue-100 shadow-xl w-full max-w-md h-fit transition-transform transform hover:scale-105 mb-6 hover:shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-12 h-12">
          <Image
            priority
            src={chatbotImgs[Math.floor(Math.random() * chatbotImgs.length)]}
            alt="Model"
            layout="fill"
            objectFit="contain"
            className="rounded-full border-2 border-blue-300"
          />
        </div>
        <button
          onClick={handleButtonClick}
          className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all transform active:scale-95"
        >
          Start Chat
        </button>
      </div>
      <h3 className="font-semibold text-3xl text-gray-800 mb-3 leading-tight">
        {model.name}
      </h3>
      <p className="text-gray-700 text-lg leading-relaxed mb-5">
        {model.description}
      </p>
      <div className="border-t border-gray-300 my-5"></div>
      <p className="text-gray-700 text-base leading-relaxed mb-1">
        <span className="font-semibold">Creator:</span> {model.creator}
      </p>
      <p className="text-gray-700 text-base leading-relaxed mb-1">
        <span className="font-semibold">Usage Count:</span>{" "}
        <span className="text-xl font-bold text-blue-700">
          {model.usageCount}
        </span>
      </p>
      <p className="text-gray-700 text-base leading-relaxed mb-5">
        <span className="font-semibold">Fee per Prompt:</span>{" "}
        {model.feePerPrompt} OpenAgents
      </p>
      <div className="border-t border-gray-300 my-5"></div>
      <div className="flex items-center mt-3 space-x-3">
        <span className="bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full">
          Type: {model.type}
        </span>
      </div>
    </div>
  );
}
