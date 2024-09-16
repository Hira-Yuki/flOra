import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'calendar',
};

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
