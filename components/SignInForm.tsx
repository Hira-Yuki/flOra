import useDebouncedSubmit from '@hooks/useDebounceSubmit';
import useErrorState from '@hooks/useErrorState';
import useInput from '@hooks/useInput';
import { memberApi } from '@lib/api/member';
import { useState } from 'react';
import { toast } from 'react-toastify';

import {
  SignInButton,
  SignInErrorText,
  SignInFormWrapper,
  SignInInput,
  SignInSwitcher,
} from './signInElements';

export default function SignInForm() {
  const email = useInput('');
  const password = useInput('');
  const error = useErrorState();
  const [inProcess, setInProcess] = useState(false);

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
    setInProcess(true);

    try {
      const { data } = await memberApi.signUp({
        email: emailValue,
        password: passwordValue,
      });
      console.log('member API 응답', data);
      toast.success(data.message);
    } catch (err) {
      toast.error(err.message);
      console.log(err);
      error.setError({ massage: err.message, isError: true });
    } finally {
      resetForm();
      setInProcess(false);
    }
  };

  const debouncedSubmit = useDebouncedSubmit(handleSubmit);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    debouncedSubmit(email.value, password.value);
  };

  return (
    <SignInFormWrapper onSubmit={onSubmit}>
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
      <SignInButton inProcess={inProcess}>시작하기</SignInButton>
      <SignInSwitcher
        normalText={'비밀번호를 잊으셨나요?'}
        linkText={'비밀번호 찾기'}
        href={'/find-password'}
      />
    </SignInFormWrapper>
  );
}
