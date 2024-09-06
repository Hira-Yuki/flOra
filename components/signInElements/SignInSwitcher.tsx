import Link from 'next/link';

export default function SignInSwitcher({ normalText, linkText, href }) {
  return (
    <p className="text-xs text-center mt-2 text-gray-500">
      {normalText + ' '}
      <Link className="font-bold underline text-xs" href={href}>
        {linkText}
      </Link>
    </p>
  );
}
