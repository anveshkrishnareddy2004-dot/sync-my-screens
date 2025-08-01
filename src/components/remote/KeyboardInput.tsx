import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  Keyboard, 
  Send, 
  Delete, 
  Space,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CornerDownLeft
} from "lucide-react";

export function KeyboardInput() {
  const [inputText, setInputText] = useState("");
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const [isCapsLock, setIsCapsLock] = useState(false);

  const sendText = () => {
    if (inputText.trim()) {
      console.log("Sending text to device:", inputText);
      setInputText("");
    }
  };

  const sendKey = (key: string) => {
    console.log("Sending key to device:", key);
  };

  const handleVirtualKey = (char: string) => {
    setInputText(prev => prev + char);
  };

  const handleBackspace = () => {
    setInputText(prev => prev.slice(0, -1));
  };

  const virtualKeys = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"]
  ];

  return (
    <Card className="bg-gradient-card border-border/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Keyboard className="h-5 w-5" />
          Keyboard Input
        </CardTitle>
        <CardDescription>
          Type text and send keyboard commands to device
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Text Input */}
        <div className="space-y-3">
          <Textarea
            placeholder="Type text to send to device..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-20 resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                sendText();
              }
            }}
          />
          
          <div className="flex gap-2">
            <Button 
              onClick={sendText}
              disabled={!inputText.trim()}
              className="flex-1 bg-gradient-primary hover:opacity-90"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Text
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => setInputText("")}
              disabled={!inputText}
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Virtual Keyboard */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Virtual Keyboard</h4>
          
          {/* Number Row */}
          <div className="flex gap-1 justify-center">
            {virtualKeys[0].map((key) => (
              <Button 
                key={key}
                variant="outline" 
                size="sm"
                className="w-8 h-8 p-0 text-xs"
                onClick={() => handleVirtualKey(key)}
              >
                {key}
              </Button>
            ))}
          </div>
          
          {/* Letter Rows */}
          {virtualKeys.slice(1).map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-1 justify-center">
              {row.map((key) => (
                <Button 
                  key={key}
                  variant="outline" 
                  size="sm"
                  className="w-8 h-8 p-0 text-xs"
                  onClick={() => handleVirtualKey(
                    isCapsLock || isShiftPressed ? key.toUpperCase() : key
                  )}
                >
                  {isCapsLock || isShiftPressed ? key.toUpperCase() : key}
                </Button>
              ))}
            </div>
          ))}
          
          {/* Bottom Row */}
          <div className="flex gap-1 justify-center">
            <Button 
              variant="outline" 
              size="sm"
              className="px-3 h-8 text-xs"
              onClick={() => setIsShiftPressed(!isShiftPressed)}
              data-pressed={isShiftPressed}
            >
              Shift
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1 h-8 text-xs"
              onClick={() => handleVirtualKey(" ")}
            >
              <Space className="h-3 w-3" />
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="px-3 h-8 text-xs"
              onClick={handleBackspace}
            >
              <Delete className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Special Keys */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Special Keys</h4>
          
          {/* Arrow Keys */}
          <div className="grid grid-cols-3 gap-1 w-32 mx-auto">
            <div></div>
            <Button 
              variant="outline" 
              size="sm"
              className="w-10 h-8"
              onClick={() => sendKey("ArrowUp")}
            >
              <ArrowUp className="h-3 w-3" />
            </Button>
            <div></div>
            
            <Button 
              variant="outline" 
              size="sm"
              className="w-10 h-8"
              onClick={() => sendKey("ArrowLeft")}
            >
              <ArrowLeft className="h-3 w-3" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="w-10 h-8"
              onClick={() => sendKey("ArrowDown")}
            >
              <ArrowDown className="h-3 w-3" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="w-10 h-8"
              onClick={() => sendKey("ArrowRight")}
            >
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
          
          {/* Function Keys */}
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => sendKey("Enter")}
            >
              <CornerDownLeft className="h-3 w-3 mr-1" />
              Enter
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => sendKey("Tab")}
            >
              Tab
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => sendKey("Escape")}
            >
              Esc
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsCapsLock(!isCapsLock)}
              data-pressed={isCapsLock}
            >
              Caps
            </Button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          Use Ctrl/Cmd + Enter to send text quickly
        </div>
      </CardContent>
    </Card>
  );
}