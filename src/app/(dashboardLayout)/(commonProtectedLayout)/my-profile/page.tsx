export const dynamic = 'force-dynamic';

import { ScrollReveal } from '@/components/animations/ScrollReveal';
import MyProfile from '@/components/modules/Dashboard/CommonProtected/MyProfile';
import { getUserInfo } from '@/services/auth/getUserInfo';
import { UserInfo } from '@/types/user.interface';

const MyProfilePage = async () => {
  const userInfo = (await getUserInfo()) as UserInfo;

  return (
    <ScrollReveal variant="blur-up" className="w-full">
      <MyProfile user={userInfo} />
    </ScrollReveal>
  );
};

export default MyProfilePage;
