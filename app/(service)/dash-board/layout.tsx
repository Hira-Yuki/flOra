import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'dashboard',
};

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
