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
    <div className="w-screen h-screen flex justify-end bg-teal-400">
      {/* 인터페이스 */}
      <div className="w-full lg:w-1/2 h-full flex relative bg-white lg:shadow-2xl lg:shadow-gray-800">
        {/* debug */}
        <div className="absolute">
          <h1 className="m-4 text-xl md:text-2xl font-semibold ">FLORA</h1>
          <button
            type="button"
            className="mt-4 p-2 md:mt-6 py-2 md:py-3 rounded-badge w-full bg-red-400"
            onClick={debugToggler}
          >
            {isDebug ? '강제 에러 발생시키는 중' : '정상 동작 중'}
          </button>
        </div>

        <section className="flex mx-auto w-3/5 sm:w-1/2 justify-center flex-col items-center gap-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-6 lg:mb-10 cursor-default">
            Welcome!
          </h2>

          {/* 폼 영역 */}
          <form
            className="flex justify-center flex-col gap-8 w-full items-center"
            onSubmit={onSubmit}
          >
            <input
              id="sign_email"
              className="border border-gray-700 rounded-badge px-4 py-2 lg:w-4/5"
              placeholder="e-mail"
              type="email"
              value={email.value}
              onChange={email.onChange}
            />
            <input
              id="sign_password"
              className="border border-gray-700 rounded-badge px-4 py-2 lg:w-4/5"
              placeholder="password"
              type="password"
              value={password.value}
              onChange={password.onChange}
            />
            {error.isError && (
              <span className="text-red-600 text-xs pl-2">{error.message}</span>
            )}
            <button
              className="mt-4 md:mt-6 py-2 md:py-3 rounded-badge w-full bg-sky-400 lg:w-4/5"
              type="submit"
            >
              시작하기
            </button>
            <div className="flex w-full px-3 py-2 lg:w-4/5">
              <p className="font-light text-xs">
                비밀번호를 잊으셨나요?{' '}
                <Link
                  className="font-bold underline text-xs"
                  href={'/find-password'}
                >
                  비밀번호 찾기
                </Link>
              </p>
            </div>
          </form>
          {/* 영역 분리 */}
          <div className="flex items-center my-4 w-full">
            <hr className="border-1 border-gray-600 w-1/6 md:w-1/5 opacity-60" />
            <span className="w-4/6 md:w-3/5 text-xs text-center text-gray-700 opacity-60 cursor-default">
              SNS 계정으로 시작하기
            </span>
            <hr className="border-1 border-gray-600 w-1/6 md:w-1/5 opacity-60" />
          </div>

          {/* SNS 아이콘 영역 */}
          <ul className="flex items-center gap-3 md:gap-5 justify-center">
            <li className="w-6 md:w-8 h-6 md:h-8 bg-gray-800 rounded-full cursor-pointer" />
            <li className="w-6 md:w-8 h-6 md:h-8 bg-gray-800 rounded-full cursor-pointer" />
            <li className="w-6 md:w-8 h-6 md:h-8 bg-gray-800 rounded-full cursor-pointer" />
            <li className="w-6 md:w-8 h-6 md:h-8 bg-gray-800 rounded-full cursor-pointer" />
          </ul>
        </section>
      </div>
    </div>
  );
}
