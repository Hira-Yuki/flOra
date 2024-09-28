'use client';

import {
  SignInSNSButtons,
  SignInSNSDivider,
  SignInTitle,
} from '@components/signInElements';
import SignInForm from '@components/SignInForm';

export default function SignIn() {
  return (
    <>
      <SignInTitle text={'Welcome!'} />
      <SignInForm />
      <SignInSNSDivider />
      <SignInSNSButtons />
    </>
  );
}
