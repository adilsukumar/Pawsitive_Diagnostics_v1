import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
import { geminiService } from "@/lib/gemini";
import { useToast } from "@/hooks/use-toast";
import AppLayout from "@/components/AppLayout";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function PetChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your pet care assistant. Ask me anything about dogs, cats, and pet health! 🐕🐈",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      if (import.meta.env.VITE_GEMINI_API_KEY) {
        const conversationHistory = messages.map(msg => ({
          role: msg.role === "user" ? "user" : "assistant",
          content: msg.content
        }));

        const response = await geminiService.chatWithPetExpert(input, conversationHistory);
        addAssistantMessage(response);
      } else {
        // Mock responses if no API key
        setTimeout(() => {
          const lowerInput = input.toLowerCase();
          let mockResponse = "I'm sorry, I didn't quite catch that. Could you ask me about your pet's health, diet, or behavior?";
          
          if (lowerInput.includes("feed") || lowerInput.includes("food") || lowerInput.includes("diet")) {
            mockResponse = "A balanced diet is crucial! Ensure you're feeding high-quality pet food tailored to their age and size. Avoid human foods like chocolate, grapes, and onions as they are highly toxic. 🥩";
          } else if (lowerInput.includes("scratch") || lowerInput.includes("itch") || lowerInput.includes("skin")) {
            mockResponse = "Excessive scratching can indicate allergies, fleas, or dry skin. Check for redness or pests. Our SkinSense AI module can actually help analyze this in detail! If it persists, consult your vet. 🔬";
          } else if (lowerInput.includes("bark") || lowerInput.includes("cry") || lowerInput.includes("whine")) {
            mockResponse = "Dogs bark to communicate! It could mean they are bored, anxious, or alerting you to something. Try our BarkSense AI to get a translation of their emotional state based on bark acoustics. 🐕";
          } else if (lowerInput.includes("hi") || lowerInput.includes("hello")) {
            mockResponse = "Hello there! How is your furry friend doing today? Need any advice on their health or activities? 👋";
          } else if (lowerInput.includes("sleep") || lowerInput.includes("tired")) {
            mockResponse = "Adult dogs typically sleep 12-14 hours a day, while puppies and seniors may sleep up to 18 hours! If they seem unusually lethargic, it's best to check their TemperatureSense vitals. 💤";
          }

          addAssistantMessage(mockResponse);
        }, 1500);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const addAssistantMessage = (content: string) => {
    const assistantMessage: Message = {
      role: "assistant",
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <AppLayout title="Pet Chatbot" showBack>
      <div className="flex flex-col h-[calc(100vh-64px-85px)] relative">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm mt-auto mb-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[75%] rounded-2xl p-3.5 ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-br-sm shadow-md"
                    : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm"
                }`}
              >
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                <p className={`text-[10px] mt-1 font-medium ${message.role === "user" ? "text-blue-100" : "text-gray-400"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center flex-shrink-0 mt-auto mb-1">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-auto mb-1 shadow-sm">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm p-4 shadow-sm">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white/80 backdrop-blur-xl border-t border-gray-100">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="flex-1 rounded-full bg-gray-50 border-gray-200 focus-visible:ring-purple-500 h-12 px-4 shadow-inner"
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="rounded-full w-12 h-12 p-0 bg-gradient-to-br from-purple-500 to-indigo-600 hover:opacity-90 shadow-lg flex-shrink-0"
            >
              <Send className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
