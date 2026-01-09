export const dynamic = 'force-dynamic';

import MyProfile from '@/components/modules/Dashboard/CommonProtected/MyProfile';
import { getUserInfo } from '@/services/auth/getUserInfo';
import { UserInfo } from '@/types/user.interface';

const MyProfilePage = async () => {
  const userInfo = (await getUserInfo()) as UserInfo;

  return (
    <>
      <MyProfile user={userInfo} />
    </>
  );
};

export default MyProfilePage;
