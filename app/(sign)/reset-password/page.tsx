import Loading from '@components/Loading';
import ResetPasswordForm from '@components/ResetPasswordForm';
import { SignInTitle } from '@components/signInElements';
import { Suspense } from 'react';

export default function ResetPassword() {
  return (
    <>
      <SignInTitle text={'비밀번호 재설정'} />
      <Suspense fallback={<Loading />}>
        <ResetPasswordForm />
      </Suspense>
    </>
  );
}
