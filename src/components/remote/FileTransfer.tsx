import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  Upload, 
  Download, 
  File, 
  Folder, 
  Image, 
  Video, 
  Music,
  Trash2,
  RefreshCw,
  FolderOpen
} from "lucide-react";

export function FileTransfer() {
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferProgress, setTransferProgress] = useState(0);
  const [files, setFiles] = useState([
    { id: "1", name: "vacation_photos.zip", type: "archive", size: "2.5 MB", icon: Folder },
    { id: "2", name: "presentation.pdf", type: "document", size: "1.2 MB", icon: File },
    { id: "3", name: "music_playlist.mp3", type: "audio", size: "4.8 MB", icon: Music },
    { id: "4", name: "video_call.mp4", type: "video", size: "15.3 MB", icon: Video },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    console.log("Files dropped:", droppedFiles);
    simulateTransfer();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const simulateTransfer = () => {
    setIsTransferring(true);
    setTransferProgress(0);
    
    const interval = setInterval(() => {
      setTransferProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTransferring(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "archive": return Folder;
      case "document": return File;
      case "audio": return Music;
      case "video": return Video;
      case "image": return Image;
      default: return File;
    }
  };

  return (
    <Card className="bg-gradient-card border-border/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          File Transfer
        </CardTitle>
        <CardDescription>
          Drag and drop files or browse to transfer
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Transfer Actions */}
        <div className="flex gap-2">
          <Button 
            onClick={handleFileSelect}
            className="flex-1 bg-gradient-primary hover:opacity-90"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload to Device
          </Button>
          
          <Button variant="outline" className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Download from Device
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) {
              simulateTransfer();
            }
          }}
        />

        {/* Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors"
        >
          <FolderOpen className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-2">
            Drag and drop files here
          </p>
          <p className="text-xs text-muted-foreground">
            Supports all file types
          </p>
        </div>

        {/* Transfer Progress */}
        {isTransferring && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Transferring files...</span>
              <span>{transferProgress}%</span>
            </div>
            <Progress value={transferProgress} className="w-full" />
          </div>
        )}

        {/* Recent Files */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium">Recent Transfers</h4>
            <Button variant="ghost" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {files.map((file) => {
              const Icon = getFileIcon(file.type);
              return (
                <div key={file.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                  <Icon className="h-4 w-4 text-primary" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{file.name}</div>
                    <div className="text-xs text-muted-foreground">{file.size}</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Storage Info */}
        <div className="p-3 rounded-lg bg-muted/20">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Device Storage</span>
            <span>42.1 GB / 128 GB</span>
          </div>
          <Progress value={33} className="w-full" />
        </div>
      </CardContent>
    </Card>
  );
}