import '../styles/globals.css';

export const metadata = {
  title: 'flOra - 나만의 시간관리',
  description: 'flOra와 함께 공부와 일상을 동시에 설계해 보세요.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
