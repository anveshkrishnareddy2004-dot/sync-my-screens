import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Smartphone, 
  Wifi, 
  Usb, 
  Bluetooth,
  Search,
  Loader2,
  Check
} from "lucide-react";

interface DeviceConnectionProps {
  onConnect: () => void;
}

export function DeviceConnection({ onConnect }: DeviceConnectionProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [connectionMethod, setConnectionMethod] = useState<"wifi" | "usb" | "bluetooth">("wifi");
  const [devices, setDevices] = useState([
    { id: "1", name: "Samsung Galaxy S23", type: "Android 14", signal: 4, method: "wifi" },
    { id: "2", name: "Pixel 7 Pro", type: "Android 13", signal: 3, method: "bluetooth" },
  ]);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate device discovery
    setTimeout(() => {
      setIsScanning(false);
    }, 2000);
  };

  const handleConnect = (deviceId: string) => {
    // Simulate connection process
    setTimeout(() => {
      onConnect();
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gradient-card border-border/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Connect Your Device</CardTitle>
          <CardDescription>
            Choose a connection method to start controlling your Android device
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="wifi" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="wifi" className="flex items-center gap-2">
                <Wifi className="h-4 w-4" />
                Wi-Fi
              </TabsTrigger>
              <TabsTrigger value="usb" className="flex items-center gap-2">
                <Usb className="h-4 w-4" />
                USB
              </TabsTrigger>
              <TabsTrigger value="bluetooth" className="flex items-center gap-2">
                <Bluetooth className="h-4 w-4" />
                Bluetooth
              </TabsTrigger>
            </TabsList>

            <TabsContent value="wifi" className="space-y-4">
              <div className="text-center space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <h3 className="font-semibold mb-2">Wi-Fi Connection</h3>
                  <p className="text-sm text-muted-foreground">
                    Make sure both devices are on the same network
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ip">Device IP Address</Label>
                    <Input id="ip" placeholder="192.168.1.100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="port">Port</Label>
                    <Input id="port" placeholder="5555" defaultValue="5555" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="usb" className="space-y-4">
              <div className="text-center space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <h3 className="font-semibold mb-2">USB Connection</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect your device via USB cable and enable USB debugging
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Setup Instructions:</h4>
                  <ol className="text-sm text-muted-foreground space-y-1 text-left max-w-md mx-auto">
                    <li>1. Enable Developer Options on your Android device</li>
                    <li>2. Turn on USB Debugging</li>
                    <li>3. Connect device via USB cable</li>
                    <li>4. Allow USB debugging when prompted</li>
                  </ol>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bluetooth" className="space-y-4">
              <div className="text-center space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <h3 className="font-semibold mb-2">Bluetooth Connection</h3>
                  <p className="text-sm text-muted-foreground">
                    Pair your device via Bluetooth for basic controls
                  </p>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Note: Bluetooth connection provides limited functionality compared to Wi-Fi or USB
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 space-y-4">
            <div className="flex justify-center">
              <Button 
                onClick={handleScan} 
                disabled={isScanning}
                className="bg-gradient-primary hover:opacity-90"
              >
                {isScanning ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Scan for Devices
                  </>
                )}
              </Button>
            </div>

            {/* Available Devices */}
            {devices.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-center">Available Devices</h3>
                <div className="grid gap-3">
                  {devices.map((device) => (
                    <Card key={device.id} className="bg-muted/20 hover:bg-muted/30 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Smartphone className="h-5 w-5 text-primary" />
                            <div>
                              <div className="font-medium">{device.name}</div>
                              <div className="text-sm text-muted-foreground">{device.type}</div>
                            </div>
                          </div>
                          <Button 
                            size="sm" 
                            onClick={() => handleConnect(device.id)}
                            className="bg-gradient-primary hover:opacity-90"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Connect
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}