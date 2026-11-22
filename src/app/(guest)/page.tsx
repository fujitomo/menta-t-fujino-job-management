import { type Metadata } from 'next';
import { AuthLoginContainer } from '@/features/auth/components/AuthLoginContainer';
import { GuestLayout } from '@/components/layouts/layout';

export const metadata: Metadata = {
  title: 'ログイン | お仕事管理',
};

export default async function LoginPage() {
  return (
    <GuestLayout>
      <AuthLoginContainer />
    </GuestLayout>
  );
}
