
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { MessageCircle } from "lucide-react"; // for chat icon (optional)

const TawkMessenger = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm an AI Search Assistant. How can i help you?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "mistralai/mistral-7b-instruct",
          messages: newMessages,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            "HTTP-Referer": "http://localhost:5173",
            "X-Title": "AI Product Search Chatbot",
          },
        }
      );
      const reply = res.data.choices[0].message;
      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Error: " + (err.response?.data?.error?.message || err.message),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 text-white p-3   shadow-lg hover:bg-emerald-700 transition"
          style={{borderRadius:"100px"}}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[320px] h-[500px] flex flex-col border rounded-xl shadow-xl bg-white">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-3 rounded-t-xl flex justify-between items-center">
            <span className="font-semibold">Product Chat Assistant</span>
            <button onClick={() => setIsOpen(false)} className="text-white text-lg">✖</button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 flex flex-col gap-2 overflow-y-auto p-3 bg-gray-50 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-2 py-2 rounded-xl text-sm whitespace-pre-wrap break-words shadow-sm
                ${msg.role === "user"
                      ? "bg-emerald-100 text-right rounded-br-none"
                      : "bg-white text-left rounded-bl-none"
                    }`}
                  style={{
                    maxWidth: "100%",
                    width: "fit-content",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start ml-2 items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-[0ms]" />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-[150ms]" />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-[300ms]" />
              </div>
            )}

            <div ref={chatEndRef} />
          </div>


          {/* Input */}
          <div className="flex border-t p-2 bg-white">
            <input
              type="text"
              value={input}
              placeholder="Type your message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 px-2 py-1 border rounded-md text-sm"
            />
            <button
              onClick={handleSend}
              className="bg-emerald-600 text-white px-3 py-1 ml-2 rounded-md text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TawkMessenger;












