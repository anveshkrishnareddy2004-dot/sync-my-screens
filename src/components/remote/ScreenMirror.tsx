import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize, 
  Minimize,
  Settings,
  Circle,
  Camera,
  Volume2
} from "lucide-react";

interface ScreenMirrorProps {
  deviceInfo: {
    name: string;
    battery: number;
    signal: number;
    os: string;
  };
}

export function ScreenMirror({ deviceInfo }: ScreenMirrorProps) {
  const [isStreaming, setIsStreaming] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [quality, setQuality] = useState([75]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState([50]);
  const mirrorRef = useRef<HTMLDivElement>(null);

  const handleTouch = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    
    // Simulate touch feedback
    const ripple = document.createElement('div');
    ripple.className = 'absolute w-4 h-4 bg-accent rounded-full animate-ping pointer-events-none';
    ripple.style.left = `${event.clientX - rect.left - 8}px`;
    ripple.style.top = `${event.clientY - rect.top - 8}px`;
    
    event.currentTarget.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
    
    console.log(`Touch at: ${x.toFixed(1)}%, ${y.toFixed(1)}%`);
  };

  return (
    <Card className="bg-gradient-card border-border/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span>Screen Mirror</span>
            <span className="text-sm font-normal text-muted-foreground">
              - {deviceInfo.name}
            </span>
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRecording(!isRecording)}
              className={isRecording ? "bg-destructive/20 border-destructive text-destructive" : ""}
            >
              <Circle className="h-4 w-4 mr-1" />
              {isRecording ? "Stop" : "Record"}
            </Button>
            
            <Button variant="outline" size="sm">
              <Camera className="h-4 w-4 mr-1" />
              Screenshot
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsStreaming(!isStreaming)}
            >
              {isStreaming ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            
            <Button variant="outline" size="sm">
              <RotateCcw className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="w-20"
              />
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <span>Quality:</span>
              <Slider
                value={quality}
                onValueChange={setQuality}
                max={100}
                step={5}
                className="w-20"
              />
              <span className="w-10 text-muted-foreground">{quality[0]}%</span>
            </div>
          </div>
        </div>

        {/* Screen Display */}
        <div 
          ref={mirrorRef}
          className={`relative bg-black rounded-lg overflow-hidden cursor-pointer select-none ${
            isFullscreen ? "fixed inset-4 z-50" : "aspect-[9/19.5]"
          }`}
          onClick={handleTouch}
        >
          {/* Simulated Android Screen */}
          <div className="w-full h-full bg-gradient-to-b from-blue-900 via-purple-900 to-blue-900 relative">
            {/* Status Bar */}
            <div className="h-8 bg-black/20 flex items-center justify-between px-4 text-white text-xs">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <span>•••</span>
                <span>📶</span>
                <span>🔋 {deviceInfo.battery}%</span>
              </div>
            </div>
            
            {/* Home Screen */}
            <div className="p-6 h-full">
              <div className="grid grid-cols-4 gap-4 mt-8">
                {/* App Icons */}
                {[
                  "📱", "📷", "🎵", "📧",
                  "🌐", "📝", "⚙️", "📞",
                  "💬", "📍", "🎮", "🛒"
                ].map((icon, index) => (
                  <div key={index} className="aspect-square bg-white/10 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-sm">
                    {icon}
                  </div>
                ))}
              </div>
              
              {/* Dock */}
              <div className="absolute bottom-8 left-6 right-6 h-16 bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center gap-6">
                {["📱", "💬", "📷", "🌐"].map((icon, index) => (
                  <div key={index} className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-xl">
                    {icon}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Connection Status Overlay */}
            {!isStreaming && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-white text-center">
                  <Pause className="h-8 w-8 mx-auto mb-2" />
                  <p>Screen mirroring paused</p>
                </div>
              </div>
            )}
            
            {isRecording && (
              <div className="absolute top-12 right-4 bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs font-medium animate-pulse">
                REC
              </div>
            )}
          </div>
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          Click anywhere on the screen to send touch commands
        </div>
      </CardContent>
    </Card>
  );
}