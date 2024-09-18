import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'timer',
};

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
