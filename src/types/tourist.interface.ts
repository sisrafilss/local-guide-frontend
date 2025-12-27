export interface ITourist {
  id?: string;
  email: string;
  name: string;
  profilePicUrl?: string | null;
  phone: string;
  address: string;
  gender: 'MALE' | 'FEMALE';
  // isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
