'use client';
import { useDebouncedSubmit, useErrorState, useInput } from '@hooks/index';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Hello() {
  const email = useInput('');
  const password = useInput('');
  const error = useErrorState();

  // 디버그용
  const [isDebug, setIsDebug] = useState(false);

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
      if (isDebug) throw new Error('비밀번호가 일치하지 않습니다.');

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

  const debugToggler = () => {
    setIsDebug((prev) => !prev);
  };

  return (
    <div className="w-screen h-screen flex justify-end bg-gray-100">
      <div className="w-full lg:w-1/2 h-full flex relative bg-white lg:shadow-2xl">
        <div className="absolute left-4 top-4">
          <h1 className="text-xl font-bold">FLORA</h1>
          <button
            className="px-2 bg-gray-800 text-white rounded-md py-3 w-full mt-4 hover:bg-gray-700 transition"
            type="submit"
            onClick={debugToggler}
          >
            {isDebug ? '강제 에러 발생시키는 중' : '정상 동작 중'}
          </button>
        </div>
        <section className="flex mx-auto w-3/5 sm:w-1/2 justify-center flex-col items-center gap-8 p-6 lg:p-10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800">
            Welcome!
          </h2>
          <form className="flex flex-col gap-6 w-full" onSubmit={onSubmit}>
            <input
              id="sign_email"
              className="border border-gray-300 rounded-badge px-4 py-3 w-full"
              placeholder="E-mail"
              type="email"
              value={email.value}
              onChange={email.onChange}
            />
            <input
              id="sign_password"
              className="border border-gray-300 rounded-badge px-4 py-3 w-full"
              placeholder="Password"
              type="password"
              value={password.value}
              onChange={password.onChange}
            />
            {error.isError && (
              <span className="text-red-600 text-xs">{error.message}</span>
            )}
            <button
              className="bg-gray-800 text-white rounded-badge py-3 w-full mt-4 hover:bg-gray-700 transition"
              type="submit"
            >
              시작하기
            </button>
            <p className="text-xs text-center mt-2 text-gray-500">
              비밀번호를 잊으셨나요?{' '}
              <Link className="underline" href={'/find-password'}>
                비밀번호 찾기
              </Link>
            </p>
          </form>
          <div className="flex items-center w-full mt-8">
            <hr className="border-gray-300 w-1/5" />
            <span className="mx-4 text-xs text-gray-500 w-3/5 text-center text-nowrap">
              SNS 계정으로 시작하기
            </span>
            <hr className="border-gray-300 w-1/5" />
          </div>
          <ul className="flex items-center justify-around w-full">
            <li className="w-8 h-8 sm:w-16 sm:h-16 lg:w-8 lg:h-8 bg-gray-400 rounded-full" />
            <li className="w-8 h-8 sm:w-16 sm:h-16 lg:w-8 lg:h-8 bg-gray-400 rounded-full" />
            <li className="w-8 h-8 sm:w-16 sm:h-16 lg:w-8 lg:h-8 bg-gray-400 rounded-full" />
            <li className="w-8 h-8 sm:w-16 sm:h-16 lg:w-8 lg:h-8 bg-gray-400 rounded-full" />
          </ul>
        </section>
      </div>
    </div>
  );
}
