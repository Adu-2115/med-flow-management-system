
import React, { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/sonner";
import { useForm } from "react-hook-form";
import { 
  User, 
  Bell, 
  Shield, 
  Lock, 
  CreditCard, 
  Globe, 
  Palette,
  Save,
  Printer,
  Wifi,
  CircleCheck,
  History
} from "lucide-react";

const Settings = () => {
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Settings saved successfully", {
        description: "Your changes have been applied"
      });
    }, 1000);
  };

  const form = useForm({
    defaultValues: {
      fullName: "Admin User",
      email: "admin@halomed.com",
      role: "administrator",
      theme: "system",
      notifications: true,
      emailAlerts: true,
      stockAlerts: true,
      language: "english",
    }
  });

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 md:grid-cols-none gap-2 md:gap-0">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User size={16} />
            <span className="hidden md:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield size={16} />
            <span className="hidden md:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell size={16} />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette size={16} />
            <span className="hidden md:inline">Appearance</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your account details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...form}>
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2 mt-6">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Select 
                            value={field.value} 
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="administrator">Administrator</SelectItem>
                              <SelectItem value="manager">Manager</SelectItem>
                              <SelectItem value="staff">Staff</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <FormControl>
                          <Select 
                            value={field.value} 
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="spanish">Spanish</SelectItem>
                              <SelectItem value="french">French</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </Form>

              <div className="flex justify-end mt-6">
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin">⏳</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Connected Services</CardTitle>
              <CardDescription>Manage your connected accounts and services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Payment Gateway</h4>
                      <p className="text-sm text-muted-foreground">Connected to Stripe</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <Printer className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Thermal Printer</h4>
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <Wifi className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Barcode Scanner</h4>
                      <p className="text-sm text-muted-foreground">Connected (XYZ-100)</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button onClick={() => toast.success("Password updated successfully")}>
                  <Save className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Two-factor authentication</h4>
                  <p className="text-sm text-muted-foreground">Secure your account with 2FA</p>
                </div>
                <Switch 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      toast.success("Two-factor authentication enabled");
                    } else {
                      toast.info("Two-factor authentication disabled");
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Login Sessions</CardTitle>
              <CardDescription>Manage your active sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <CircleCheck className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">Current Session</h4>
                      <p className="text-sm text-muted-foreground">Last active: Just now</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" disabled>Current</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <History className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Chrome on Windows</h4>
                      <p className="text-sm text-muted-foreground">Last active: 2 days ago</p>
                    </div>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => toast.success("Session revoked")}>
                    Revoke
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Control how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch 
                  defaultChecked 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      toast.success("Email notifications enabled");
                    } else {
                      toast.info("Email notifications disabled");
                    }
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Stock Alert Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get alerts when stock is running low</p>
                </div>
                <Switch 
                  defaultChecked
                  onCheckedChange={(checked) => {
                    if (checked) {
                      toast.success("Stock alerts enabled");
                    } else {
                      toast.info("Stock alerts disabled");
                    }
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Payment Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get notified about payment events</p>
                </div>
                <Switch 
                  defaultChecked
                  onCheckedChange={(checked) => {
                    if (checked) {
                      toast.success("Payment notifications enabled");
                    } else {
                      toast.info("Payment notifications disabled");
                    }
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">System Notifications</Label>
                  <p className="text-sm text-muted-foreground">Updates and maintenance alerts</p>
                </div>
                <Switch 
                  defaultChecked
                  onCheckedChange={(checked) => {
                    if (checked) {
                      toast.success("System notifications enabled");
                    } else {
                      toast.info("System notifications disabled");
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Customize the appearance of your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Theme Mode</Label>
                <Select defaultValue="system">
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose between light, dark, or system default theme
                </p>
              </div>

              <div className="grid gap-2">
                <Label>Primary Color</Label>
                <Select defaultValue="pharmacy-purple">
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pharmacy-purple">Purple</SelectItem>
                    <SelectItem value="pharmacy-blue">Blue</SelectItem>
                    <SelectItem value="pharmacy-green">Green</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Set the main accent color for the application
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Compact View</Label>
                  <p className="text-sm text-muted-foreground">Use condensed spacing throughout the UI</p>
                </div>
                <Switch 
                  onCheckedChange={(checked) => {
                    if (checked) {
                      toast.success("Compact view enabled");
                    } else {
                      toast.info("Compact view disabled");
                    }
                  }}
                />
              </div>

              <div className="flex justify-end mt-6">
                <Button onClick={() => toast.success("Appearance settings saved")}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Settings;
