import { getCookie } from '@/services/auth/tokenHandlers';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from '../ModeToggler';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';
import LogoutButton from './LogoutButton';

const PublicNavbar = async () => {
  const navItems = [
    { href: '/explore-tours', label: 'Explore Tours' },
    { href: '/become-guide', label: 'Become a Guide' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const accessToken = await getCookie('accessToken');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">Local Guide</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-2">
          <ModeToggle />
          {accessToken ? (
            <LogoutButton />
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-background text-foreground"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

              <nav className="mt-8 flex flex-col space-y-4">
                {navItems.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="mt-4 flex items-center space-x-4 border-t border-border pt-4">
                  <ModeToggle />
                  <Link href="/login">
                    <Button className="w-full">Login</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
