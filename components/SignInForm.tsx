import useDebouncedSubmit from '@hooks/useDebounceSubmit';
import useErrorState from '@hooks/useErrorState';
import useInput from '@hooks/useInput';
import { toast } from 'react-toastify';

import SignInButton from './signInElements/SignInButton';
import SignInErrorText from './signInElements/SignInErrorText';
import SignInInput from './signInElements/SignInInput';
import SignInSwitcher from './signInElements/SignInSwitcher';

export default function SignInForm() {
  const email = useInput('');
  const password = useInput('');
  const error = useErrorState();

  const resetForm = () => {
    email.reset();
    password.reset();
  };

  const handleSubmit = async (emailValue: string, passwordValue: string) => {
    error.reset();
    if (!emailValue || !passwordValue) {
      toast.warning('이메일과 비밀번호를 정확히 입력해 주세요.');
      return;
    }

    try {
      toast.success('로그인 요청!!');
    } catch (err) {
      toast.error(err.message);
      console.log(err);
      error.setError({ massage: err.message, isError: true });
    }

    resetForm();
  };

  const debouncedSubmit = useDebouncedSubmit(handleSubmit);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    debouncedSubmit(email.value, password.value);
  };

  return (
    <form className="flex flex-col gap-6 w-full" onSubmit={onSubmit}>
      <SignInInput
        id="sign_email"
        placeholder="E-mail"
        type="email"
        value={email.value}
        onChange={email.onChange}
      />
      <SignInInput
        id="sign_password"
        placeholder="Password"
        type="password"
        value={password.value}
        onChange={password.onChange}
      />
      {error.isError && <SignInErrorText text={error.message} />}
      <SignInButton>시작하기</SignInButton>
      <SignInSwitcher
        normalText={'비밀번호를 잊으셨나요?'}
        linkText={'비밀번호 찾기'}
        href={'/find-password'}
      />
    </form>
  );
}
