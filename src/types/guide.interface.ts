export interface IGuide {
  id?: string;
  userId: string;
  email: string;
  name: string;
  profilePicUrl?: string | null;
  phone: string;
  address: string;
  gender: 'MALE' | 'FEMALE';

  //   guide specific
  expertise: string[];
  dailyRate: number;
  verificationStatus: boolean;
  // isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
