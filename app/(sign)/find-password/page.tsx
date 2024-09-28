'use client';

import FindPasswordForm from '@components/FindPasswordForm';
import { SignInTitle } from '@components/signInElements';

export default function FindPassword() {
  return (
    <>
      <SignInTitle text={'비밀번호 찾기'} />
      <FindPasswordForm />
    </>
  );
}
