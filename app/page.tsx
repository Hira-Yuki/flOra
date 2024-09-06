'use client';

import SignInBlock from '@components/signInElements/SignInBlock';
import SignInLogo from '@components/signInElements/SignInLogo';
import SignInSection from '@components/signInElements/SignInSection';
import SignInSNSButtons from '@components/signInElements/SignInSNSButtons';
import SignInSNSDivider from '@components/signInElements/SignInSNSDivider';
import SignInTitle from '@components/signInElements/SignInTitle';
import SignInWrapper from '@components/signInElements/SignInWrapper';
import SignInForm from '@components/SignInForm';

export default function Home() {
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
