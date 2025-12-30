'use client';

import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
    <div className="mx-auto w-full max-w-3xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">My Profile</h1>
          <p className="text-sm text-muted-foreground">
            View and manage your personal information
          </p>
        </div>

        {!isEditing && (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </div>

      {/* Profile Card */}
      <div className="rounded-xl border bg-background p-6 shadow-sm">
        {/* Avatar */}
        <div className="mb-6 flex flex-col items-center gap-3 sm:flex-row">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.profilePicUrl || ''} />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="text-center sm:text-left">
            <p className="text-lg font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        {/* Form */}
        <form>
          <FieldGroup>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Name */}
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input
                  name="name"
                  defaultValue={user.name}
                  disabled={!isEditing}
                />
              </Field>

              {/* Email (read-only) */}
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input value={user.email} disabled />
                <FieldDescription>Email cannot be changed</FieldDescription>
              </Field>

              {/* Phone */}
              <Field>
                <FieldLabel>Phone</FieldLabel>
                <Input
                  name="phone"
                  defaultValue={user.phone}
                  disabled={!isEditing}
                />
              </Field>

              {/* Gender */}
              <Field>
                <FieldLabel>Gender</FieldLabel>
                <Input
                  name="gender"
                  defaultValue={user.gender}
                  disabled={!isEditing}
                />
              </Field>

              {/* Address */}
              <Field className="sm:col-span-2">
                <FieldLabel>Address</FieldLabel>
                <Input
                  name="address"
                  defaultValue={user.address}
                  disabled={!isEditing}
                />
              </Field>

              {/* Bio */}
              <Field className="sm:col-span-2">
                <FieldLabel>Bio</FieldLabel>
                <Textarea
                  name="bio"
                  rows={3}
                  defaultValue={user.bio}
                  disabled={!isEditing}
                />
              </Field>
            </div>

            {/* Actions */}
            {isEditing && (
              <FieldGroup className="mt-6">
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </FieldGroup>
            )}
          </FieldGroup>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
