import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "¡Hola! Soy Mobi, tu asistente de transporte. ¿En qué puedo ayudarte?", 
      sender: "bot" 
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    }, 800);

    setInput("");
  };

  const getBotResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("ruta") || lowerQuery.includes("camión")) {
      return "Basándome en tu ubicación, las rutas más cercanas son: Ruta 1 (5 min), Ruta 15 (8 min), y Ruta 23 (12 min). ¿Te gustaría más detalles de alguna?";
    }
    
    if (lowerQuery.includes("tiempo") || lowerQuery.includes("tarda")) {
      return "La siguiente unidad llegará en aproximadamente 5 minutos. La Ruta 1 tiene un 45% de ocupación actualmente.";
    }
    
    if (lowerQuery.includes("lugares") || lowerQuery.includes("ocupación")) {
      return "La Ruta 5 tiene actualmente 15 lugares disponibles (60% de ocupación). ¿Te gustaría ver otras opciones?";
    }
    
    return "Entiendo tu pregunta. Puedo ayudarte con información sobre rutas, tiempos de espera, ocupación de vehículos y paraderos cercanos. ¿Qué necesitas saber?";
  };

  const quickQuestions = [
    "¿Qué camión pasa por aquí?",
    "¿Cuánto tarda la siguiente unidad?",
    "¿Cuántos lugares libres hay?",
  ];

  return (
    <>
      {/* Floating button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg bg-primary hover:bg-primary/90 border-4 border-accent z-50"
        size="icon"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[500px] shadow-institutional flex flex-col z-50 animate-fade-in">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-poppins font-semibold">Mobi</h3>
                <p className="text-xs opacity-90">Asistente virtual</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-muted/20">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card shadow-sm"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="space-y-2 mt-4">
                <p className="text-xs text-muted-foreground text-center mb-2">
                  Preguntas rápidas:
                </p>
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-xs justify-start h-auto py-2 px-3"
                    onClick={() => {
                      setInput(question);
                      setTimeout(() => handleSend(), 100);
                    }}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-card">
            <div className="flex gap-2">
              <Input
                placeholder="Escribe tu pregunta..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button 
                onClick={handleSend} 
                size="icon"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
