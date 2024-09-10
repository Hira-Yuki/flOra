'use client';

import {
  SignInBlock,
  SignInLogo,
  SignInSection,
  SignInSNSButtons,
  SignInSNSDivider,
  SignInTitle,
  SignInWrapper,
} from '@components/signInElements';
import SignInForm from '@components/SignInForm';

export default function SignIn() {
  return (
    <SignInWrapper>
      <SignInBlock>
        <SignInLogo />
        <SignInSection>
          <SignInTitle text={'Welcome!'} />
          <SignInForm />
          <SignInSNSDivider />
          <SignInSNSButtons />
        </SignInSection>
      </SignInBlock>
    </SignInWrapper>
  );
}
