import '@styles/globals.css';
import localFont from 'next/font/local';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'flOra - 나만의 시간관리',
  description: 'flOra와 함께 공부와 일상을 동시에 설계해 보세요.',
};

const pretendard = localFont({
  src: [
    {
      path: '../public/fonts/Pretendard-Thin.woff',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-ExtraLight.woff',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-ExtraBold.woff',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Black.woff',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {children}
      </body>
    </html>
  );
}
