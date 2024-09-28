'use client';
import {
  SignInButton,
  SignInErrorText,
  SignInFormWrapper,
  SignInInput,
} from '@components/signInElements';
import { passwordRegex, ROUTE_LISTS } from '@constants';
import { useDebouncedSubmit, useErrorState, useInput } from '@hooks';
import { memberApi } from '@lib/api/member';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function ResetPasswordForm() {
  const password = useInput('');
  const passwordConfirm = useInput('');
  const error = useErrorState();
  const [inProcess, setInProcess] = useState(false);

  const param = useSearchParams();
  const router = useRouter();

  const memberId = param.get('mi');

  const displayError = (message: string) => {
    toast.warning(message);
    error.setError({ message: message, isError: true });
  };

  const handleSubmit = async (passwordValue: string) => {
    error.reset();
    if (!passwordValue) {
      toast.warning('새 비밀번호를 입력해 주세요.');
      return;
    }

    if (!passwordRegex.test(password.value)) {
      const message =
        '비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.';

      displayError(message);
      return;
    }

    if (password.value !== passwordConfirm.value) {
      const message = '비밀번호가 일치하지 않아요.';
      displayError(message);
      return;
    }

    setInProcess(true);

    try {
      const { data } = await memberApi.resetPassword(memberId, password.value);
      toast.success(data.message);
      router.push(ROUTE_LISTS.dashBoard);
    } catch (err) {
      displayError(err.message);
    } finally {
      password.reset();
      setInProcess(false);
    }
  };
  const debouncedSubmit = useDebouncedSubmit(handleSubmit);

  const onSubmit = (e) => {
    e.preventDefault();
    debouncedSubmit(password.value);
  };

  return (
    <SignInFormWrapper onSubmit={onSubmit}>
      <SignInInput
        id="reset_password"
        placeholder="new password"
        type="password"
        value={password.value}
        onChange={password.onChange}
      />
      <SignInInput
        id="reset_password_confirm"
        placeholder="new password confirm"
        type="password"
        value={passwordConfirm.value}
        onChange={passwordConfirm.onChange}
      />
      {error.isError && <SignInErrorText text={error.message} />}
      <SignInButton inProcess={inProcess}>비밀번호 재설정</SignInButton>
    </SignInFormWrapper>
  );
}
