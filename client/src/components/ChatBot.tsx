import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

const GEMINI_API_KEY = "AIzaSyBPiUWys8Y7V4-Gi4gHr99VyCwFJSy3Dog"; // Replace with your actual API key

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const systemPrompt = `
    You are not Gemini. You are a chatbot model in a website called FinancAI whose job is to give financial advice based on the given business's data. The data may include:
    - Name of the business
    - Industry/Sector of the business 
    - Business assets, transactions, and liabilities

    You are to give the business financial advice based on its industry and current financial data. The data will be in table form, which you will read only once.

    Keep responses short and concise. You may NOT use bullet points so you will explain them all in a single paragraph. Only go in-depth if explicitly asked.

    NAME: Koshary Morsi  
    INDUSTRY: Food  
    TRANSACTIONS:  
    -100 | Expenses | Plates  
    -200 | Expenses | Forks  
    +300 | Profit | Customers  
  `;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Ready to help!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /** Fetches Gemini API response */
  const fetchGeminiResponse = async (userMessage: string) => {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    systemInstruction: { role: "system", parts: [{ text: systemPrompt }] }, // Correctly setting system instructions
                    contents: [{ role: "user", parts: [{ text: userMessage }] }] // Only send user input here
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "Failed to fetch response");
        }

        return (
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Sorry, I couldn't process that request."
        );
    } catch (error) {
        console.error("Error fetching response from Gemini:", error);
        return "I'm having trouble connecting to my AI services right now.";
    }
};


  /** Handles message sending */
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setInput("");

    const botResponse = await fetchGeminiResponse(input);

    const botMessage: Message = {
      id: messages.length + 2,
      text: botResponse,
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    // After the first message, set isFirstMessage to false so systemPrompt is not repeated
    setIsFirstMessage(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-indigo-600 text-white py-3 px-4">
        <h3 className="text-lg font-semibold">FinancAI Assistant</h3>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                message.sender === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {message.text}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something about your finances..."
            className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
