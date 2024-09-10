import useDebouncedSubmit from '@hooks/useDebounceSubmit';
import useErrorState from '@hooks/useErrorState';
import useInput from '@hooks/useInput';
import { memberApi } from '@lib/api/member';
import { ROUTE_LISTS } from 'constants/index';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const email = useInput('');
  const password = useInput('');
  const error = useErrorState();
  const [inProcess, setInProcess] = useState(false);

  const resetForm = () => {
    email.reset();
    password.reset();
  };

  const displayError = (message) => {
    toast.warning(message);
    error.setError({ message: message, isError: true });
  };

  const handleSubmit = async (email: string, password: string) => {
    error.reset();
    if (!email || !password) {
      toast.warning('이메일과 비밀번호를 정확히 입력해 주세요.');
      return;
    }

    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=[\]{};:/,.?~|])(?!.*[\s]).{8,16}$/;

    if (!passwordRegex.test(password)) {
      const message =
        '비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.';

      displayError(message);
      return;
    }

    setInProcess(true);

    try {
      const { data } = await memberApi.signUp({
        email,
        password,
      });

      toast.success(data.message);
      router.push(ROUTE_LISTS.dashBoard);
    } catch (err) {
      displayError(err.message);
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
        href={ROUTE_LISTS.findPassword}
      />
    </SignInFormWrapper>
  );
}
