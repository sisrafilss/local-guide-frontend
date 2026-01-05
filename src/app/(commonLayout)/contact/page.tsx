'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 🔁 Replace with backend API later
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent successfully!');
    }, 1000);
  };

  return (
    <section className="w-full px-4 py-20">
      <div className="mx-auto max-w-5xl space-y-16">
        {/* ================= Header ================= */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Contact Us
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Have questions, feedback, or partnership ideas? We’d love to hear
            from you.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* ================= Contact Info ================= */}
          <Card className="rounded-3xl">
            <CardContent className="space-y-6 p-8">
              <h2 className="text-xl font-semibold text-foreground">
                Get in touch
              </h2>

              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  support@localguide.com
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  +880 1XXX-XXXXXX
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  Dhaka, Bangladesh
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ================= Contact Form ================= */}
          <Card className="rounded-3xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder="Your name" required />
                <Input type="email" placeholder="Your email" required />
                <Textarea placeholder="Your message" rows={5} required />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
