import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const chatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-lg w-80 h-96 mb-4 flex flex-col">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <h3 className="font-semibold">Chat Assistant</h3>
            <button onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-3">
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm">
                  Hi! I'm here to help you find your dream home. How can I
                  assist you today?
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg ml-8">
                <p className="text-sm">
                  Hello! I'm looking for a 4-bedroom home in Atlanta.
                </p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm">
                  Great! I found several 4-bedroom homes in Atlanta. Would you
                  like me to show you the available options?
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
};
export default chatbotWidget;
