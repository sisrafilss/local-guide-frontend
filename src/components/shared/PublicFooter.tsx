import Link from 'next/link';
import { Compass, Mail, MapPin, Phone, Instagram, Twitter, Facebook, ArrowUpRight, Github } from 'lucide-react';

function PublicFooter() {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Explore Tours', href: '/explore-tours' },
    { label: 'AI Summarizer', href: '/summarizer' },
    { label: 'Become a Guide', href: '/become-guide' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const accountLinks = [
    { label: 'Login', href: '/login' },
    { label: 'Register', href: '/register' },
    { label: 'Forgot Password', href: '/forget-password' },
  ];

  const socialLinks = [
     { icon: Instagram, href: '#' },
     { icon: Twitter, href: '#' },
     { icon: Facebook, href: '#' },
     { icon: Github, href: '#' },
  ];

  return (
    <footer className="relative w-full border-t border-border/40 bg-background pt-24 pb-12 overflow-hidden">
      {/* Decorative Gradient Overlay */}
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-primary/5 blur-[120px] -z-10 translate-x-1/2 translate-y-1/2 opacity-60" />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-6 lg:gap-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="group flex items-center space-x-3 transition-all active:scale-95">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
                 <Compass className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black italic tracking-tighter text-foreground leading-none">LOCAL GUIDE</span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase opacity-60">Verified Experts</span>
              </div>
            </Link>
            
            <p className="text-sm font-medium leading-relaxed text-muted-foreground max-w-xs italic">
              Empowering travelers to discover the heart of every city through the eyes of local experts. Experience authenticity redefined.
            </p>

            <div className="flex items-center gap-4">
               {socialLinks.map((social, i) => (
                  <Link key={i} href={social.href} className="h-10 w-10 flex items-center justify-center rounded-xl bg-muted/20 border border-border/40 text-muted-foreground transition-all hover:bg-primary hover:text-white hover:border-primary active:scale-90">
                     <social.icon className="h-4 w-4" />
                  </Link>
               ))}
            </div>
          </div>

          {/* Nav Categories */}
          <div className="col-span-1 space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 italic leading-none">Navigation</h3>
            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center text-sm font-bold text-muted-foreground/80 transition-all hover:text-foreground italic uppercase tracking-widest gap-2"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 transition-all group-hover:opacity-100 group-hover:translate-y-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 italic leading-none">Account</h3>
            <ul className="space-y-4">
              {accountLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center text-sm font-bold text-muted-foreground/80 transition-all hover:text-foreground italic uppercase tracking-widest gap-2"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 transition-all group-hover:opacity-100 group-hover:translate-y-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 italic leading-none">Contact Us</h3>
            <div className="space-y-6">
               <div className="flex items-start gap-4 p-4 rounded-3xl bg-muted/30 border border-border/20 shadow-inner group hover:bg-muted/50 transition-all">
                  <div className="h-10 w-10 rounded-2xl bg-background flex items-center justify-center border border-border/40 shadow-sm text-primary transition-transform group-hover:rotate-12">
                     <Mail className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">Email</span>
                     <span className="text-xs font-black italic text-foreground uppercase tracking-tight">support@localguide.com</span>
                  </div>
               </div>

               <div className="flex items-start gap-4 p-4 rounded-3xl bg-muted/30 border border-border/20 shadow-inner group hover:bg-muted/50 transition-all">
                  <div className="h-10 w-10 rounded-2xl bg-background flex items-center justify-center border border-border/40 shadow-sm text-primary transition-transform group-hover:-rotate-12">
                     <Phone className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">Phone</span>
                     <span className="text-xs font-black italic text-foreground uppercase tracking-tight">+1 (123) 456-7890</span>
                  </div>
               </div>

               <div className="flex items-start gap-4 p-4 rounded-3xl bg-muted/30 border border-border/20 shadow-inner group hover:bg-muted/50 transition-all">
                  <div className="h-10 w-10 rounded-2xl bg-background flex items-center justify-center border border-border/40 shadow-sm text-primary transition-transform group-hover:scale-110">
                     <MapPin className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">Location</span>
                     <span className="text-xs font-black italic text-foreground uppercase tracking-tight">Dhaka, Bangladesh</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-24 pt-12 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-60">
             &copy; {new Date().getFullYear()} LOCAL_GUIDE. ALL RIGHTS RESERVED.
          </div>
          
          <div className="flex items-center gap-8">
             <Link href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
             <Link href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors">Terms of Use</Link>
             <Link href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors">Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;
