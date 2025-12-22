import Link from 'next/link';

function PublicFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="mb-2 font-bold text-foreground">Local Guide</h3>
            <p className="text-sm text-muted-foreground">
              Your trusted platform to find and connect with local tour guides
              around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-2 font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {['Home', 'About Us', 'Services', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-2 font-semibold text-foreground">Support</h3>
            <ul className="space-y-2 text-sm">
              {['FAQ', 'Help Center', 'Terms of Service', 'Privacy Policy'].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-2 font-semibold text-foreground">Contact Us</h3>
            <p className="text-sm text-muted-foreground">
              Email: contact@localguide.com
              <br />
              Phone: +1 (123) 456-7890
              <br />
              Address: 123 Main St, Anytown, USA
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-border pt-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Local Guide. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;
