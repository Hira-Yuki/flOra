'use client';
import { useRouter } from 'next/navigation';

export default function GoBackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-block px-6 py-2 bg-floraGreen text-floraWhite font-medium rounded-lg shadow hover:bg-floraYellow hover:text-mainText transition duration-300"
      aria-label="Go back to the previous page"
    >
      Go Back Previous
    </button>
  );
}
