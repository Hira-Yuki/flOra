import useDebouncedSubmit from '@hooks/useDebounceSubmit';
import useErrorState from '@hooks/useErrorState';
import useInput from '@hooks/useInput';
import { toast } from 'react-toastify';

import SignInButton from './signInElements/SignInButton';
import SignInErrorText from './signInElements/SignInErrorText';
import SignInInput from './signInElements/SignInInput';
import SignInSwitcher from './signInElements/SignInSwitcher';

export default function FindPasswordForm() {
  const email = useInput('');
  const error = useErrorState();

  const handleSubmit = async (emailValue: string) => {
    error.reset();
    if (!emailValue) {
      toast.warning('이메일을 정확히 입력해 주세요.');
      return;
    }

    try {
      toast.success('인증 메일 발송 성공');
    } catch (err) {
      toast.error('오류 발생');
      console.log(err);
      error.setError({ massage: err.message, isError: true });
    }
  };

  const debouncedSubmit = useDebouncedSubmit(handleSubmit);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    debouncedSubmit(email.value);
  };

  return (
    <form className="flex flex-col gap-6 w-full" onSubmit={onSubmit}>
      <SignInInput
        id="sign_email"
        placeholder="e-mail"
        type="email"
        value={email.value}
        onChange={email.onChange}
      />
      {error.isError && <SignInErrorText text={error.message} />}
      <SignInButton>이메일 발송하기</SignInButton>
      <SignInSwitcher
        normalText={'처음으로'}
        linkText={'돌아가기'}
        href={'/'}
      />
    </form>
  );
}
