import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Smartphone, 
  Wifi, 
  Usb as Cable, 
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
                <Cable className="h-4 w-4" />
                USB
              </TabsTrigger>
              <TabsTrigger value="bluetooth" className="flex items-center gap-2">
                <Bluetooth className="h-4 w-4" />
                Bluetooth
              </TabsTrigger>
            </TabsList>

            <TabsContent value="wifi" className="space-y-4">
              <Card className="bg-muted/50 border-border/40">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Wifi className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="font-medium">Prerequisites:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Both devices on same WiFi network</li>
                        <li>Android companion app running</li>
                        <li>Note the IP address shown in the app</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="ip-address">Device IP Address</Label>
                  <Input 
                    id="ip-address" 
                    placeholder="192.168.1.100" 
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter the IP address displayed in your Android app
                  </p>
                </div>
                <div>
                  <Label htmlFor="port">Port</Label>
                  <Input 
                    id="port" 
                    placeholder="8080" 
                    defaultValue="8080"
                    className="mt-2"
                  />
                </div>
                <Button onClick={() => handleConnect("wifi")} className="w-full">
                  Connect to Device
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="usb" className="space-y-4">
              <Card className="bg-muted/50 border-border/40">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Cable className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="font-medium">Prerequisites:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>ADB installed on Mac (<code className="px-1 py-0.5 bg-background rounded text-xs">brew install android-platform-tools</code>)</li>
                        <li>USB Debugging enabled on Android (Settings → Developer Options)</li>
                        <li>USB cable connected</li>
                        <li>Device authorized (check phone screen)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-amber-500/50 bg-amber-500/5">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10">
                      <Cable className="h-4 w-4 text-amber-500" />
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="font-medium text-amber-600 dark:text-amber-400">Setup Required</p>
                      <p className="text-muted-foreground">
                        Run in Terminal: <code className="px-2 py-1 bg-background rounded text-xs block mt-2">adb forward tcp:8080 tcp:8080</code>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        This forwards the Android app's port to localhost
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Button 
                onClick={() => handleConnect("usb")}
                className="w-full"
              >
                <Cable className="mr-2 h-4 w-4" />
                Connect via USB
              </Button>
            </TabsContent>

            <TabsContent value="bluetooth" className="space-y-4">
              <Card className="bg-muted/50 border-border/40">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Bluetooth className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="font-medium">Bluetooth Connection:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>Enable Bluetooth on both devices</li>
                        <li>Make Android device discoverable</li>
                        <li>Limited to file transfer only</li>
                        <li>Too slow for screen mirroring</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="p-4 border border-muted rounded-lg bg-muted/30">
                <p className="text-sm text-muted-foreground text-center">
                  Bluetooth is not recommended for remote control. Use WiFi or USB for best performance.
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