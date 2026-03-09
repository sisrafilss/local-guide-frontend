'use client';

import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  FileText, 
  ShieldCheck,
  Calendar,
  Save,
  X,
  Edit2
} from 'lucide-react';

type MyProfileProps = {
  user: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    gender?: 'MALE' | 'FEMALE' | 'OTHER';
    bio?: string;
    profilePicUrl?: string | null;
  };
};

const MyProfile = ({ user }: MyProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header Banner Section */}
      <div className="relative h-48 rounded-2xl bg-gradient-to-r from-primary/80 to-primary overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
        <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col md:flex-row items-end gap-6 translate-y-12 md:translate-y-8 group">
          <div className="relative shrink-0">
            <Avatar className="h-32 w-32 border-4 border-background shadow-xl rounded-2xl bg-background">
              <AvatarImage src={user.profilePicUrl || ''} className="object-cover" />
              <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
                {user.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <button className="absolute -bottom-2 -right-2 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform border-4 border-background">
                <Camera className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex-1 pb-6 md:pb-12 text-center md:text-left space-y-1">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
              <h1 className="text-3xl font-bold text-white drop-shadow-sm">{user.name}</h1>
              <Badge variant="secondary" className="w-fit mx-auto md:mx-0 bg-white/20 text-white border-white/20 backdrop-blur-md">
                <ShieldCheck className="h-3 w-3 mr-1" />
                Admin
              </Badge>
            </div>
            <p className="text-white/80 font-medium flex items-center justify-center md:justify-start gap-2">
              <Mail className="h-4 w-4" />
              {user.email}
            </p>
          </div>
          <div className="pb-12 hidden md:block">
            {!isEditing ? (
              <Button 
                variant="secondary" 
                className="bg-white/90 hover:bg-white text-primary font-bold shadow-lg"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-white/10 font-bold"
                  onClick={() => setIsEditing(false)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  className="bg-white text-primary hover:bg-white/90 font-bold shadow-lg border-none"
                  onClick={() => setIsEditing(false)}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16 pt-12 md:pt-0">
        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="shadow-none border-border/50 bg-card/50 overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <User className="h-4 w-4" />
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Verification</span>
                <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 px-2 py-0">Verified</Badge>
              </div>
              <Separator className="bg-border/50" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Joined</span>
                <span className="font-medium text-foreground italic opacity-70">Jan 2024</span>
              </div>
              <Separator className="bg-border/50" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Role Permissions</span>
                <span className="font-bold text-primary">Full Access</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none border-border/50 bg-card/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Latest Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold leading-none">Security Login</p>
                      <p className="text-[10px] text-muted-foreground italic">2 hours ago from Dhaka</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Personal Information</CardTitle>
              <CardDescription>Update your profile details and bio.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <User className="h-3 w-3" />
                    Full Name
                  </Label>
                  <Input 
                    id="name" 
                    defaultValue={user.name} 
                    disabled={!isEditing}
                    className="bg-muted/30 focus-visible:ring-primary/50 font-medium" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    Email
                  </Label>
                  <Input 
                    id="email" 
                    value={user.email} 
                    disabled 
                    className="bg-muted opacity-60 font-medium italic" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    Phone Number
                  </Label>
                  <Input 
                    id="phone" 
                    defaultValue={user.phone || '+880 1XXX-XXXXXX'} 
                    disabled={!isEditing}
                    className="bg-muted/30 focus-visible:ring-primary/50 font-medium" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <User className="h-3 w-3" />
                    Gender
                  </Label>
                  <Input 
                    id="gender" 
                    defaultValue={user.gender || 'Not Specified'} 
                    disabled={!isEditing}
                    className="bg-muted/30 focus-visible:ring-primary/50 font-medium" 
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    Address
                  </Label>
                  <Input 
                    id="address" 
                    defaultValue={user.address || 'Your base location'} 
                    disabled={!isEditing}
                    className="bg-muted/30 focus-visible:ring-primary/50 font-medium" 
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <FileText className="h-3 w-3" />
                    Short Bio
                  </Label>
                  <Textarea 
                    id="bio" 
                    rows={4}
                    defaultValue={user.bio || 'Tell us something about yourself...'} 
                    disabled={!isEditing}
                    className="bg-muted/30 focus-visible:ring-primary/50 font-medium resize-none" 
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end gap-3 pt-6 border-t md:hidden">
                   <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                    className="font-bold"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => setIsEditing(false)}
                    className="bg-primary text-white font-bold"
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
