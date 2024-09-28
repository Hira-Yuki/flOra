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
          <SignInTitle text={'비밀번호 찾기'} />
          <FindPasswordForm />
        </SignInSection>
      </SignInBlock>
    </SignInWrapper>
  );
}
