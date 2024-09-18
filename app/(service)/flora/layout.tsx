import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'my',
};

export default function FloraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
