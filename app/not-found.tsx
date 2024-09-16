import GoBackButton from '@components/not-foundElements/GoBackButton';

export const metadata = {
  title: 'Not found',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-floraWhite p-6">
      <div className="bg-floraBeige p-8 rounded-lg shadow-md max-w-md text-center">
        <h1 className="text-6xl font-bold text-floraOlive mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-mainText mb-2">
          Page Not Found
        </h2>
        <p className="text-subText mb-6">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <GoBackButton />
      </div>
    </div>
  );
}
