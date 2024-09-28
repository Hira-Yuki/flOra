'use client';

import {
  SignInSNSButtons,
  SignInSNSDivider,
  SignInTitle,
} from '@components/signInElements';
import SignInForm from '@components/SignInForm';
import useCookie from 'hooks/useCookie';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function SignIn() {
  const [alertMessage, setAlertMessage] = useState('');
  const cookie = useCookie();

  useEffect(() => {
    // 쿠키에서 메시지를 가져오고, 가져온 후 쿠키 삭제
    const message = cookie.getCookie('login-message');
    if (message) {
      setAlertMessage(message);
      cookie.removeCookie('login-message'); // 쿠키를 삭제하여 중복 표시 방지
    }
  }, []);

  if (alertMessage) {
    toast.warn(alertMessage);
    setAlertMessage('');
  }

  return (
    <>
      <SignInTitle text={'Welcome!'} />
      <SignInForm />
      <SignInSNSDivider />
      <SignInSNSButtons />
    </>
  );
}
