import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScreenMirror } from "./remote/ScreenMirror";
import { TouchControls } from "./remote/TouchControls";
import { FileTransfer } from "./remote/FileTransfer";
import { AppManager } from "./remote/AppManager";
import { NotificationPanel } from "./remote/NotificationPanel";
import { KeyboardInput } from "./remote/KeyboardInput";
import { CameraControls } from "./remote/CameraControls";
import { DeviceConnection } from "./remote/DeviceConnection";
import { 
  Smartphone, 
  Monitor, 
  Wifi, 
  WifiOff,
  Battery,
  Signal
} from "lucide-react";

export function RemoteControl() {
  const [isConnected, setIsConnected] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState({
    name: "Samsung Galaxy S23",
    battery: 85,
    signal: 4,
    os: "Android 14"
  });

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-gradient-primary">
              <Smartphone className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Remote Control</h1>
              <p className="text-muted-foreground">Control your Android device from Mac</p>
            </div>
          </div>
          
          {/* Connection Status */}
          <Card className="bg-gradient-card border-border/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                {isConnected ? (
                  <Wifi className="h-5 w-5 text-accent animate-glow" />
                ) : (
                  <WifiOff className="h-5 w-5 text-muted-foreground" />
                )}
                <div className="text-sm">
                  <div className="font-medium">
                    {isConnected ? deviceInfo.name : "Not Connected"}
                  </div>
                  {isConnected && (
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Battery className="h-3 w-3" />
                        {deviceInfo.battery}%
                      </div>
                      <div className="flex items-center gap-1">
                        <Signal className="h-3 w-3" />
                        {deviceInfo.signal}/4
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {!isConnected ? (
          <DeviceConnection onConnect={() => setIsConnected(true)} />
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Main Screen Mirror - Takes up 2/3 on larger screens */}
            <div className="xl:col-span-2">
              <ScreenMirror deviceInfo={deviceInfo} />
            </div>

            {/* Control Panels - Takes up 1/3 on larger screens */}
            <div className="space-y-6">
              <Tabs defaultValue="touch" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="touch">Touch</TabsTrigger>
                  <TabsTrigger value="apps">Apps</TabsTrigger>
                  <TabsTrigger value="camera">Camera</TabsTrigger>
                </TabsList>
                
                <TabsContent value="touch" className="space-y-4">
                  <TouchControls />
                  <KeyboardInput />
                </TabsContent>
                
                <TabsContent value="apps" className="space-y-4">
                  <AppManager />
                  <NotificationPanel />
                </TabsContent>
                
                <TabsContent value="camera" className="space-y-4">
                  <CameraControls />
                </TabsContent>
              </Tabs>

              <Separator />
              
              {/* File Transfer - Always visible */}
              <FileTransfer />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}