import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Bell, 
  MessageCircle, 
  Mail, 
  Phone, 
  Calendar,
  X,
  Reply,
  Archive,
  Trash2,
  Settings
} from "lucide-react";

export function NotificationPanel() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      app: "WhatsApp",
      icon: "💬",
      title: "John Doe",
      message: "Hey, are we still on for lunch today?",
      time: "2 min ago",
      type: "message",
      unread: true
    },
    {
      id: "2",
      app: "Gmail",
      icon: "📧",
      title: "Meeting Reminder",
      message: "Your meeting with the design team starts in 15 minutes",
      time: "5 min ago",
      type: "email",
      unread: true
    },
    {
      id: "3",
      app: "Calendar",
      icon: "📅",
      title: "Daily Standup",
      message: "Starting in 30 minutes",
      time: "10 min ago",
      type: "calendar",
      unread: false
    },
    {
      id: "4",
      app: "Instagram",
      icon: "📷",
      title: "Sarah liked your photo",
      message: "Your post from yesterday",
      time: "1 hour ago",
      type: "social",
      unread: false
    },
    {
      id: "5",
      app: "Phone",
      icon: "📞",
      title: "Missed Call",
      message: "Mom called 2 times",
      time: "2 hours ago",
      type: "call",
      unread: true
    }
  ]);

  const [replyText, setReplyText] = useState("");
  const [selectedNotification, setSelectedNotification] = useState<string | null>(null);

  const handleDismiss = (notificationId: string) => {
    setNotifications(notifications.filter(n => n.id !== notificationId));
  };

  const handleReply = (notificationId: string) => {
    if (replyText.trim()) {
      console.log(`Replying to ${notificationId}: ${replyText}`);
      setReplyText("");
      setSelectedNotification(null);
      // Mark as read
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, unread: false } : n
      ));
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, unread: false } : n
    ));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message": return MessageCircle;
      case "email": return Mail;
      case "call": return Phone;
      case "calendar": return Calendar;
      default: return Bell;
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <Card className="bg-gradient-card border-border/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge className="bg-destructive text-destructive-foreground">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </CardTitle>
        <CardDescription>
          View and respond to device notifications
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setNotifications(notifications.map(n => ({ ...n, unread: false })))}
            className="flex-1"
          >
            Mark All Read
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setNotifications([])}
            className="flex-1"
          >
            Clear All
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {notifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            const isSelected = selectedNotification === notification.id;
            
            return (
              <div key={notification.id} className="space-y-2">
                <div className={`p-3 rounded-lg transition-colors ${
                  notification.unread ? "bg-primary/5 border border-primary/20" : "bg-muted/20"
                } hover:bg-muted/30`}>
                  <div className="flex items-start gap-3">
                    <div className="text-xl">{notification.icon}</div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{notification.app}</span>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                        <span className="text-xs text-muted-foreground ml-auto">
                          {notification.time}
                        </span>
                      </div>
                      
                      <div className="text-sm font-medium mb-1">{notification.title}</div>
                      <div className="text-sm text-muted-foreground">{notification.message}</div>
                      
                      <div className="flex items-center gap-1 mt-2">
                        {notification.type === "message" && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedNotification(
                              isSelected ? null : notification.id
                            )}
                          >
                            <Reply className="h-3 w-3 mr-1" />
                            Reply
                          </Button>
                        )}
                        
                        {notification.unread && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <Archive className="h-3 w-3 mr-1" />
                            Read
                          </Button>
                        )}
                        
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDismiss(notification.id)}
                          className="ml-auto"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Reply */}
                {isSelected && notification.type === "message" && (
                  <div className="ml-6 space-y-2">
                    <Input
                      placeholder="Type your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleReply(notification.id);
                        }
                      }}
                    />
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleReply(notification.id)}
                        disabled={!replyText.trim()}
                        className="bg-gradient-primary hover:opacity-90"
                      >
                        Send
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedNotification(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No notifications</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}