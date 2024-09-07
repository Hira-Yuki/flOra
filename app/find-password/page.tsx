'use client';

import FindPasswordForm from '@components/FindPasswordForm';
import {
  SignInBlock,
  SignInLogo,
  SignInSection,
  SignInTitle,
  SignInWrapper,
} from '@components/signInElements';

export default function FindPassword() {
  return (
    <SignInWrapper>
      <SignInBlock>
        <SignInLogo />
        <SignInSection>
          <SignInTitle text={'Welcome!'} />
          <FindPasswordForm />
        </SignInSection>
      </SignInBlock>
    </SignInWrapper>
  );
}
