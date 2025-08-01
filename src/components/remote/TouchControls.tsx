import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { 
  MousePointer2, 
  Hand, 
  RotateCcw, 
  Home, 
  ArrowLeft, 
  Square,
  Volume2,
  VolumeX,
  Power,
  ZoomIn,
  ZoomOut
} from "lucide-react";

export function TouchControls() {
  const [touchSensitivity, setTouchSensitivity] = useState([50]);
  const [scrollSpeed, setScrollSpeed] = useState([30]);

  const handleNavigationAction = (action: string) => {
    console.log(`Navigation action: ${action}`);
    // Simulate haptic feedback
  };

  const handleGesture = (gesture: string) => {
    console.log(`Gesture: ${gesture}`);
  };

  return (
    <Card className="bg-gradient-card border-border/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hand className="h-5 w-5" />
          Touch Controls
        </CardTitle>
        <CardDescription>
          Virtual navigation and gesture controls
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Navigation Buttons */}
        <div>
          <h4 className="text-sm font-medium mb-3">Navigation</h4>
          <div className="grid grid-cols-3 gap-2">
            <Button 
              variant="outline" 
              className="flex flex-col gap-1 h-16"
              onClick={() => handleNavigationAction('back')}
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-xs">Back</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col gap-1 h-16"
              onClick={() => handleNavigationAction('home')}
            >
              <Home className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col gap-1 h-16"
              onClick={() => handleNavigationAction('recent')}
            >
              <Square className="h-5 w-5" />
              <span className="text-xs">Recent</span>
            </Button>
          </div>
        </div>

        {/* Gesture Controls */}
        <div>
          <h4 className="text-sm font-medium mb-3">Gestures</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              className="flex flex-col gap-1 h-16"
              onClick={() => handleGesture('swipe-up')}
            >
              <div className="transform rotate-180">
                <ArrowLeft className="h-5 w-5" />
              </div>
              <span className="text-xs">Swipe Up</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col gap-1 h-16"
              onClick={() => handleGesture('swipe-down')}
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-xs">Swipe Down</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col gap-1 h-16"
              onClick={() => handleGesture('pinch-zoom-in')}
            >
              <ZoomIn className="h-5 w-5" />
              <span className="text-xs">Zoom In</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col gap-1 h-16"
              onClick={() => handleGesture('pinch-zoom-out')}
            >
              <ZoomOut className="h-5 w-5" />
              <span className="text-xs">Zoom Out</span>
            </Button>
          </div>
        </div>

        {/* System Controls */}
        <div>
          <h4 className="text-sm font-medium mb-3">System</h4>
          <div className="grid grid-cols-3 gap-2">
            <Button 
              variant="outline" 
              className="flex flex-col gap-1 h-16"
              onClick={() => handleNavigationAction('volume-up')}
            >
              <Volume2 className="h-5 w-5" />
              <span className="text-xs">Vol +</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col gap-1 h-16"
              onClick={() => handleNavigationAction('volume-down')}
            >
              <VolumeX className="h-5 w-5" />
              <span className="text-xs">Vol -</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex flex-col gap-1 h-16"
              onClick={() => handleNavigationAction('power')}
            >
              <Power className="h-5 w-5" />
              <span className="text-xs">Power</span>
            </Button>
          </div>
        </div>

        {/* Sensitivity Settings */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Touch Sensitivity</label>
              <span className="text-xs text-muted-foreground">{touchSensitivity[0]}%</span>
            </div>
            <Slider
              value={touchSensitivity}
              onValueChange={setTouchSensitivity}
              max={100}
              step={5}
              className="w-full"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Scroll Speed</label>
              <span className="text-xs text-muted-foreground">{scrollSpeed[0]}%</span>
            </div>
            <Slider
              value={scrollSpeed}
              onValueChange={setScrollSpeed}
              max={100}
              step={5}
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}