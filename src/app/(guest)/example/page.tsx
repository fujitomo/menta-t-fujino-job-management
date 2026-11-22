import { type Metadata } from 'next';
import { ExampleContainer } from '@/features/example/components/ExampleContainer';
import { GuestLayout } from '@/components/layouts/layout';

export const metadata: Metadata = {
  title: 'サンプル | お仕事管理',
};

export default async function ExamplePage() {
  return (
    <GuestLayout>
      <ExampleContainer />
    </GuestLayout>
  );
}
