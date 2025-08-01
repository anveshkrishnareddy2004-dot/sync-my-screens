import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Search, 
  Play, 
  Square, 
  RefreshCw,
  Settings,
  Trash2,
  Info
} from "lucide-react";

export function AppManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [apps, setApps] = useState([
    { 
      id: "1", 
      name: "WhatsApp", 
      package: "com.whatsapp", 
      version: "2.23.24.14", 
      status: "running",
      icon: "💬",
      size: "245 MB"
    },
    { 
      id: "2", 
      name: "Chrome", 
      package: "com.android.chrome", 
      version: "119.0.6045.163", 
      status: "stopped",
      icon: "🌐",
      size: "180 MB"
    },
    { 
      id: "3", 
      name: "Instagram", 
      package: "com.instagram.android", 
      version: "309.0.0.28.107", 
      status: "running",
      icon: "📷",
      size: "167 MB"
    },
    { 
      id: "4", 
      name: "Spotify", 
      package: "com.spotify.music", 
      version: "8.8.52.345", 
      status: "stopped",
      icon: "🎵",
      size: "98 MB"
    },
    { 
      id: "5", 
      name: "Gmail", 
      package: "com.google.android.gm", 
      version: "2023.11.26.588049346", 
      status: "background",
      icon: "📧",
      size: "124 MB"
    }
  ]);

  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.package.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAppAction = (appId: string, action: string) => {
    setApps(apps.map(app => {
      if (app.id === appId) {
        switch (action) {
          case "start":
            return { ...app, status: "running" };
          case "stop":
            return { ...app, status: "stopped" };
          case "uninstall":
            // In real implementation, would remove from list
            console.log(`Uninstalling ${app.name}`);
            return app;
          default:
            return app;
        }
      }
      return app;
    }));
    console.log(`Action: ${action} on app: ${appId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "bg-green-500/20 text-green-500";
      case "background": return "bg-yellow-500/20 text-yellow-500";
      case "stopped": return "bg-gray-500/20 text-gray-500";
      default: return "bg-gray-500/20 text-gray-500";
    }
  };

  return (
    <Card className="bg-gradient-card border-border/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          App Manager
        </CardTitle>
        <CardDescription>
          Launch, stop, and manage device applications
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search apps..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Settings className="h-4 w-4 mr-1" />
            Settings
          </Button>
        </div>

        {/* App List */}
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {filteredApps.map((app) => (
            <div key={app.id} className="p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">{app.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">{app.name}</span>
                    <Badge className={getStatusColor(app.status)}>
                      {app.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {app.package} • {app.size}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                {app.status === "stopped" ? (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleAppAction(app.id, "start")}
                    className="flex-1"
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Launch
                  </Button>
                ) : (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleAppAction(app.id, "stop")}
                    className="flex-1"
                  >
                    <Square className="h-3 w-3 mr-1" />
                    Stop
                  </Button>
                )}
                
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleAppAction(app.id, "info")}
                >
                  <Info className="h-3 w-3" />
                </Button>
                
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleAppAction(app.id, "uninstall")}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredApps.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Smartphone className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No apps found</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/20">
          <div className="text-center">
            <div className="text-sm font-medium">{apps.filter(a => a.status === "running").length}</div>
            <div className="text-xs text-muted-foreground">Running</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium">{apps.length}</div>
            <div className="text-xs text-muted-foreground">Total Apps</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}