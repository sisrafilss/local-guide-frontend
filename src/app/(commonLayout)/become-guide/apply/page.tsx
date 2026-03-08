'use client';

import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';

type GuideApplicationForm = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  languages: string;
  yearsOfExperience: string;
  specialtyCategory: string;
  tourAreas: string;
  availability: string;
  bio: string;
};

const initialForm: GuideApplicationForm = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  country: '',
  languages: '',
  yearsOfExperience: '',
  specialtyCategory: '',
  tourAreas: '',
  availability: '',
  bio: '',
};

export default function GuideApplyPage() {
  const [form, setForm] = useState<GuideApplicationForm>(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange =
    (field: keyof GuideApplicationForm) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    console.log('Guide Application Submitted:', form);
    toast.success('Application submitted. Check console for payload.');

    await new Promise((resolve) => setTimeout(resolve, 600));
    setForm(initialForm);
    setSubmitting(false);
  };

  return (
    <main className="px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl space-y-8">
        <ScrollReveal variant="blur-up">
          <section className="space-y-3 text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Guide Application Form
            </h1>
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
              Tell us about your local expertise. We review each application
              and get back to you shortly.
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal variant="fade-up">
          <Card className="rounded-2xl border-border/80">
            <CardHeader>
              <CardTitle>Personal and Professional Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={form.fullName}
                      onChange={handleChange('fullName')}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange('email')}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={form.phone}
                      onChange={handleChange('phone')}
                      placeholder="+880 1XXX-XXXXXX"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="languages">Languages</Label>
                    <Input
                      id="languages"
                      value={form.languages}
                      onChange={handleChange('languages')}
                      placeholder="English, Bangla"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={form.city}
                      onChange={handleChange('city')}
                      placeholder="Dhaka"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={form.country}
                      onChange={handleChange('country')}
                      placeholder="Bangladesh"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      type="number"
                      min={0}
                      value={form.yearsOfExperience}
                      onChange={handleChange('yearsOfExperience')}
                      placeholder="2"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty Category</Label>
                    <Input
                      id="specialty"
                      value={form.specialtyCategory}
                      onChange={handleChange('specialtyCategory')}
                      placeholder="History, Food, Adventure"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tourAreas">Tour Areas / Spots</Label>
                  <Textarea
                    id="tourAreas"
                    rows={3}
                    value={form.tourAreas}
                    onChange={handleChange('tourAreas')}
                    placeholder="Old Dhaka, Lalbagh Fort, Ahsan Manzil..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Textarea
                    id="availability"
                    rows={2}
                    value={form.availability}
                    onChange={handleChange('availability')}
                    placeholder="Weekdays after 3pm, weekends full-day"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Short Bio</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    value={form.bio}
                    onChange={handleChange('bio')}
                    placeholder="Share your story and why travelers should choose you."
                    required
                  />
                </div>

                <Button className="w-full md:w-auto" type="submit" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </main>
  );
}
