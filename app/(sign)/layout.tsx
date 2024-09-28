import {
  SignInBlock,
  SignInLogo,
  SignInSection,
  SignInWrapper,
} from '@components/signInElements';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: { template: 'flOra - %s', default: 'flOra - Loading' },
};

export default function SignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SignInWrapper>
      <SignInBlock>
        <SignInLogo />
        <SignInSection>{children}</SignInSection>
      </SignInBlock>
    </SignInWrapper>
  );
}
