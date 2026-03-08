import Link from 'next/link';
import { Compass, Mail, MapPin, Phone } from 'lucide-react';

function PublicFooter() {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Explore Tours', href: '/explore-tours' },
    { label: 'Become a Guide', href: '/become-guide' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const accountLinks = [
    { label: 'Login', href: '/login' },
    { label: 'Register', href: '/register' },
    { label: 'Forgot Password', href: '/forget-password' },
  ];

  return (
    <footer className="border-t border-border bg-gradient-to-b from-background to-muted/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="rounded-lg bg-primary/10 p-2 text-primary">
                <Compass className="h-5 w-5" />
              </span>
              <span className="text-xl font-bold text-foreground">
                Local Guide
              </span>
            </Link>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              Discover authentic city experiences with verified local guides.
              Explore smarter, safer, and deeper wherever you travel.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
              Account
            </h3>
            <ul className="space-y-2 text-sm">
              {accountLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <p className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                support@localguide.com
              </p>
              <p className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                +1 (123) 456-7890
              </p>
              <p className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Dhaka, Bangladesh
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-5 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Local Guide. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;
