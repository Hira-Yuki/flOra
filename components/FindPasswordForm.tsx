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

export default function FindPasswordForm() {
  const email = useInput('');
  const error = useErrorState();
  const [inProcess, setInProcess] = useState(false);

  const handleSubmit = async (emailValue: string) => {
    error.reset();
    if (!emailValue) {
      toast.warning('이메일을 정확히 입력해 주세요.');
      return;
    }

    setInProcess(true);

    try {
      const { data } = await memberApi.findPassword({ email: emailValue });
      console.log('member API 응답', data);
      toast.success(data.message);
    } catch (err) {
      toast.error(err.message);
      console.log(err);
      error.setError({ massage: err.message, isError: true });
    } finally {
      email.reset();
      setInProcess(false);
    }
  };

  const debouncedSubmit = useDebouncedSubmit(handleSubmit);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    debouncedSubmit(email.value);
  };

  return (
    <SignInFormWrapper onSubmit={onSubmit}>
      <SignInInput
        id="sign_email"
        placeholder="e-mail"
        type="email"
        value={email.value}
        onChange={email.onChange}
      />
      {error.isError && <SignInErrorText text={error.message} />}
      <SignInButton inProcess={inProcess}>이메일 발송하기</SignInButton>
      <SignInSwitcher
        normalText={'처음으로'}
        linkText={'돌아가기'}
        href={'/'}
      />
    </SignInFormWrapper>
  );
}
