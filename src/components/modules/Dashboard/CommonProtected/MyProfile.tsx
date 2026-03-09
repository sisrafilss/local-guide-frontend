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
  Edit2,
  Compass,
  Layout
} from 'lucide-react';
import { cn } from '@/lib/utils';

type MyProfileProps = {
  user: {
    name: string;
    email: string;
    role: string;
    phone?: string;
    address?: string;
    gender?: 'MALE' | 'FEMALE' | 'OTHER';
    bio?: string;
    profilePicUrl?: string | null;
    createdAt?: string;
  };
};

const MyProfile = ({ user }: MyProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const getRoleIcon = () => {
    switch (user.role) {
      case 'ADMIN': return <ShieldCheck className="h-3 w-3 mr-1.5" />;
      case 'GUIDE': return <Compass className="h-3 w-3 mr-1.5" />;
      case 'TOURIST': return <User className="h-3 w-3 mr-1.5" />;
      default: return <Layout className="h-3 w-3 mr-1.5" />;
    }
  };

  const getRoleBadgeColor = () => {
    switch (user.role) {
      case 'ADMIN': return 'bg-white/20 text-white border-white/30';
      case 'GUIDE': return 'bg-sky-500/20 text-white border-sky-400/30';
      case 'TOURIST': return 'bg-emerald-500/20 text-white border-emerald-400/30';
      default: return 'bg-white/10 text-white border-white/20';
    }
  };

  const getGradient = () => {
    switch (user.role) {
       case 'ADMIN': return 'from-primary/90 to-primary/70';
       case 'GUIDE': return 'from-sky-600 to-sky-500';
       case 'TOURIST': return 'from-emerald-600 to-emerald-500';
       default: return 'from-primary/80 to-primary';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Header Banner Section */}
      <div className={cn("relative h-48 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 bg-gradient-to-r", getGradient())}>
        <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px]" />
        
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
           <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/20 blur-2xl rounded-full -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col md:flex-row items-end gap-6 translate-y-12 md:translate-y-8">
          <div className="relative shrink-0">
            <Avatar className="h-32 w-32 border-[6px] border-background shadow-2xl rounded-3xl bg-background transition-transform hover:scale-105 duration-300">
              <AvatarImage src={user.profilePicUrl || ''} className="object-cover" />
              <AvatarFallback className="text-4xl font-black bg-muted text-primary">
                {user.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <button className="absolute -bottom-1 -right-1 p-2.5 bg-primary text-white rounded-xl shadow-xl hover:scale-110 transition-transform border-4 border-background animate-in zoom-in duration-300">
                <Camera className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex-1 pb-6 md:pb-12 text-center md:text-left space-y-1.5">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <h1 className="text-3xl font-black text-white tracking-tight drop-shadow-md">{user.name}</h1>
              <Badge variant="outline" className={cn("w-fit mx-auto md:mx-0 backdrop-blur-md px-3 py-1 font-bold text-[10px] uppercase tracking-widest", getRoleBadgeColor())}>
                {getRoleIcon()}
                {user.role}
              </Badge>
            </div>
            <p className="text-white/80 font-bold text-xs uppercase tracking-widest flex items-center justify-center md:justify-start gap-2 italic">
              <Mail className="h-3 w-3" />
              {user.email}
            </p>
          </div>
          <div className="pb-12 hidden md:block">
            {!isEditing ? (
              <Button 
                variant="secondary" 
                className="bg-white/95 hover:bg-white text-primary font-black shadow-xl rounded-2xl px-6 transition-all hover:translate-y-[-2px] active:translate-y-0"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2 animate-in slide-in-from-right-4 duration-300">
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-white/10 font-bold px-6"
                  onClick={() => setIsEditing(false)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  className="bg-white text-primary hover:bg-white/90 font-black shadow-xl border-none rounded-2xl px-6"
                  onClick={() => setIsEditing(false)}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20 pt-16 md:pt-4">
        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="shadow-none border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden rounded-2xl border-2">
            <CardHeader className="pb-4 border-b border-border/20 bg-muted/20">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                <ShieldCheck className="h-3 w-3 text-primary" />
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-muted-foreground uppercase">Verification</span>
                <Badge className="bg-emerald-500/10 text-emerald-600 border-none px-3 py-0.5 font-black text-[9px] uppercase tracking-widest leading-none">Verified</Badge>
              </div>
              <Separator className="bg-border/30" />
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-muted-foreground uppercase">Joined</span>
                <span className="font-black text-xs italic opacity-80">{user.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, {month: 'short', year:'numeric'}) : 'Jan 2024'}</span>
              </div>
              <Separator className="bg-border/30" />
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-muted-foreground uppercase">Role Access</span>
                <span className="font-black text-xs text-primary italic uppercase tracking-tighter">{user.role}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-none border-border/50 bg-card/40 backdrop-blur-sm rounded-2xl border-2">
            <CardHeader className="pb-4 border-b border-border/20 bg-muted/20">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                <Calendar className="h-3 w-3 text-primary" />
                Latest Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-5">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="h-2 w-2 rounded-full bg-primary/40 mt-1.5 shrink-0 transition-all group-hover:scale-150 group-hover:bg-primary" />
                    <div className="space-y-1">
                      <p className="text-[11px] font-black uppercase tracking-widest leading-none text-foreground/80">Login</p>
                      <p className="text-[9px] text-muted-foreground font-bold italic opacity-60">Activity {i === 1 ? '2 hours' : '1 day'} ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm border-border/50 rounded-2xl border-2 overflow-hidden">
            <CardHeader className="bg-muted/5 border-b border-border/20">
              <CardTitle className="text-lg font-black tracking-tight italic">Personal Information</CardTitle>
              <CardDescription className="text-[11px] font-bold uppercase tracking-widest opacity-60">Update your profile details and bio.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2.5 group">
                  <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                    <User className="h-3 w-3 text-primary/60" />
                    Full Name
                  </Label>
                  <Input 
                    id="name" 
                    defaultValue={user.name} 
                    disabled={!isEditing}
                    className="h-11 bg-muted/40 border-border/40 focus-visible:ring-primary/20 font-black text-sm italic rounded-xl px-4 transition-all" 
                  />
                </div>
                <div className="space-y-2.5 group">
                  <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                    <Mail className="h-3 w-3 text-primary/60" />
                    Email
                  </Label>
                  <Input 
                    id="email" 
                    value={user.email} 
                    disabled 
                    className="h-11 bg-muted/20 border-border/40 opacity-70 font-black text-sm italic rounded-xl px-4 border-dashed" 
                  />
                </div>
                <div className="space-y-2.5 group">
                  <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                    <Phone className="h-3 w-3 text-primary/60" />
                    Phone Number
                  </Label>
                  <Input 
                    id="phone" 
                    defaultValue={user.phone || 'Enter phone...'} 
                    disabled={!isEditing}
                    className="h-11 bg-muted/40 border-border/40 focus-visible:ring-primary/20 font-black text-sm rounded-xl px-4" 
                  />
                </div>
                <div className="space-y-2.5 group">
                  <Label htmlFor="gender" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                    <User className="h-3 w-3 text-primary/60" />
                    Gender
                  </Label>
                  <Input 
                    id="gender" 
                    defaultValue={user.gender || 'Not specified'} 
                    disabled={!isEditing}
                    className="h-11 bg-muted/40 border-border/40 focus-visible:ring-primary/20 font-black text-sm rounded-xl px-4 uppercase tracking-tighter" 
                  />
                </div>
                <div className="space-y-2.5 md:col-span-2">
                  <Label htmlFor="address" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-primary/60" />
                    Address
                  </Label>
                  <Input 
                    id="address" 
                    defaultValue={user.address || 'Enter address...'} 
                    disabled={!isEditing}
                    className="h-11 bg-muted/40 border-border/40 focus-visible:ring-primary/20 font-bold text-sm rounded-xl px-4" 
                  />
                </div>
                <div className="space-y-2.5 md:col-span-2">
                  <Label htmlFor="bio" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                    <FileText className="h-3 w-3 text-primary/60" />
                    Short Bio
                  </Label>
                  <Textarea 
                    id="bio" 
                    rows={5}
                    defaultValue={user.bio || 'Tell us something about yourself...'} 
                    disabled={!isEditing}
                    className="bg-muted/40 border-border/40 focus-visible:ring-primary/20 font-medium text-sm italic rounded-xl px-4 py-3 resize-none scrollbar-hide" 
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end gap-3 pt-6 border-t animate-in fade-in slide-in-from-bottom-2 duration-300">
                   <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                    className="font-bold rounded-xl h-11 px-6 border-2"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => setIsEditing(false)}
                    className="bg-primary text-white font-black uppercase tracking-widest text-xs h-11 px-8 rounded-xl shadow-lg hover:shadow-primary/20 transition-all hover:scale-[1.02]"
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
