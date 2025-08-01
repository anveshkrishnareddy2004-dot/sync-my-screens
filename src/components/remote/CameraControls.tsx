import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Video, 
  RotateCcw, 
  FlipHorizontal,
  Zap,
  ZapOff,
  Focus,
  Grid3X3,
  Download,
  Circle,
  StopCircle,
  Volume2,
  VolumeX
} from "lucide-react";

export function CameraControls() {
  const [isRecording, setIsRecording] = useState(false);
  const [cameraMode, setCameraMode] = useState<"photo" | "video">("photo");
  const [flashMode, setFlashMode] = useState<"off" | "on" | "auto">("auto");
  const [zoom, setZoom] = useState([100]);
  const [isGridEnabled, setIsGridEnabled] = useState(false);
  const [quality, setQuality] = useState([80]);
  const [isMuted, setIsMuted] = useState(false);

  const handleCapture = () => {
    if (cameraMode === "photo") {
      console.log("Taking photo");
    } else {
      if (isRecording) {
        setIsRecording(false);
        console.log("Stopping video recording");
      } else {
        setIsRecording(true);
        console.log("Starting video recording");
      }
    }
  };

  const handleFlashToggle = () => {
    const modes: ("off" | "on" | "auto")[] = ["off", "auto", "on"];
    const currentIndex = modes.indexOf(flashMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setFlashMode(nextMode);
  };

  const getFlashIcon = () => {
    switch (flashMode) {
      case "on": return Zap;
      case "off": return ZapOff;
      case "auto": return Zap;
      default: return ZapOff;
    }
  };

  return (
    <Card className="bg-gradient-card border-border/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Camera Controls
        </CardTitle>
        <CardDescription>
          Access and control device camera remotely
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Camera Preview */}
        <div className="relative bg-black rounded-lg aspect-video overflow-hidden">
          {/* Simulated Camera Feed */}
          <div className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center">
            <Camera className="h-16 w-16 text-white/50" />
          </div>
          
          {/* Overlay Controls */}
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge className={`${flashMode === "on" ? "bg-yellow-500" : flashMode === "auto" ? "bg-blue-500" : "bg-gray-500"} text-white`}>
              Flash: {flashMode.toUpperCase()}
            </Badge>
            {isGridEnabled && (
              <Badge className="bg-white/20 text-white">
                <Grid3X3 className="h-3 w-3 mr-1" />
                Grid
              </Badge>
            )}
          </div>
          
          <div className="absolute top-2 right-2">
            {isRecording && (
              <Badge className="bg-destructive text-destructive-foreground animate-pulse">
                <Circle className="h-3 w-3 mr-1" />
                REC
              </Badge>
            )}
          </div>
          
          <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
            <Badge className="bg-black/50 text-white">
              {zoom[0]}%
            </Badge>
            <Badge className="bg-black/50 text-white">
              {quality[0]}% Quality
            </Badge>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="flex gap-2">
          <Button 
            variant={cameraMode === "photo" ? "default" : "outline"}
            onClick={() => setCameraMode("photo")}
            className="flex-1"
          >
            <Camera className="h-4 w-4 mr-2" />
            Photo
          </Button>
          <Button 
            variant={cameraMode === "video" ? "default" : "outline"}
            onClick={() => setCameraMode("video")}
            className="flex-1"
          >
            <Video className="h-4 w-4 mr-2" />
            Video
          </Button>
        </div>

        {/* Primary Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" size="sm" onClick={handleFlashToggle}>
            {(() => {
              const FlashIcon = getFlashIcon();
              return <FlashIcon className="h-4 w-4" />;
            })()}
          </Button>
          
          <Button 
            size="lg"
            onClick={handleCapture}
            className={`w-16 h-16 rounded-full ${
              cameraMode === "video" && isRecording 
                ? "bg-destructive hover:bg-destructive/90" 
                : "bg-gradient-primary hover:opacity-90"
            }`}
          >
            {cameraMode === "photo" ? (
              <Camera className="h-6 w-6" />
            ) : isRecording ? (
              <StopCircle className="h-6 w-6" />
            ) : (
              <Circle className="h-6 w-6" />
            )}
          </Button>
          
          <Button variant="outline" size="sm">
            <FlipHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Camera Settings */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Zoom</label>
              <span className="text-xs text-muted-foreground">{zoom[0]}%</span>
            </div>
            <Slider
              value={zoom}
              onValueChange={setZoom}
              min={100}
              max={800}
              step={10}
              className="w-full"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Quality</label>
              <span className="text-xs text-muted-foreground">{quality[0]}%</span>
            </div>
            <Slider
              value={quality}
              onValueChange={setQuality}
              min={30}
              max={100}
              step={10}
              className="w-full"
            />
          </div>
        </div>

        {/* Additional Controls */}
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsGridEnabled(!isGridEnabled)}
            className={isGridEnabled ? "bg-accent/20" : ""}
          >
            <Grid3X3 className="h-4 w-4 mr-1" />
            Grid
          </Button>
          
          <Button variant="outline" size="sm">
            <Focus className="h-4 w-4 mr-1" />
            Focus
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
            className={isMuted ? "bg-destructive/20 text-destructive" : ""}
          >
            {isMuted ? <VolumeX className="h-4 w-4 mr-1" /> : <Volume2 className="h-4 w-4 mr-1" />}
            {isMuted ? "Muted" : "Audio"}
          </Button>
          
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>

        {/* Camera Switching */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            Front Camera
          </Button>
          <Button variant="outline" className="flex-1">
            <RotateCcw className="h-4 w-4 mr-1" />
            Switch
          </Button>
          <Button variant="outline" className="flex-1">
            Rear Camera
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          Camera permissions required on device
        </div>
      </CardContent>
    </Card>
  );
}