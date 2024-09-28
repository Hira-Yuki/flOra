import ResetPasswordForm from '@components/ResetPasswordForm';
import { SignInTitle } from '@components/signInElements';

export default function ResetPassword() {
  return (
    <>
      <SignInTitle text={'비밀번호 재설정'} />
      <ResetPasswordForm />
    </>
  );
}
