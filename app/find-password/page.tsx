'use client';

import FindPasswordForm from '@components/FindPasswordForm';
import SignInBlock from '@components/signInElements/SignInBlock';
import SignInLogo from '@components/signInElements/SignInLogo';
import SignInSection from '@components/signInElements/SignInSection';
import SignInTitle from '@components/signInElements/SignInTitle';
import SignInWrapper from '@components/signInElements/SignInWrapper';

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
