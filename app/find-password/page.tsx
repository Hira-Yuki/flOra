'use client';
import useDebouncedSubmit from '@hooks/useDebounceSubmit';
import useInput from '@hooks/useInput';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-toastify';

export default function FindPassword() {
  const email = useInput('');

  const handleSubmit = async (emailValue: string) => {
    if (!emailValue) {
      toast.warning('이메일을 정확히 입력해 주세요.');
      return;
    }

    try {
      toast.success('인증 메일 발송 성공');
    } catch (error) {
      toast.error('오류 발생');
      console.log(error);
    }
  };

  const debouncedSubmit = useDebouncedSubmit(handleSubmit);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    debouncedSubmit(email.value);
  };

  return (
    <div className="w-screen h-screen flex justify-end bg-teal-400">
      {/* 인터페이스 */}
      <div className="w-full lg:w-1/2 h-full flex relative bg-white lg:shadow-2xl lg:shadow-gray-800">
        <h1 className="m-4 text-xl md:text-2xl font-semibold absolute">
          FLORA
        </h1>
        <section className="flex mx-auto w-3/5 sm:w-1/2 justify-center flex-col items-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-6 lg:mb-10 cursor-default">
            비밀번호 찾기
          </h2>

          {/* 폼 영역 */}
          <form
            className="flex justify-center flex-col gap-4 w-full"
            onSubmit={onSubmit}
          >
            <input
              id="sign_email"
              className="border border-gray-700 rounded-badge px-4 py-2"
              placeholder="e-mail"
              type="email"
              value={email.value}
              onChange={email.onChange}
            />
            <button
              className="mt-4 md:mt-6 py-2 md:py-3 rounded-badge w-full bg-sky-400"
              type="submit"
            >
              이메일 발송하기
            </button>
          </form>
          <div className="w-full px-3 py-2">
            <p className="font-light text-sm">
              처음으로{' '}
              <Link className="font-bold underline" href={'/'}>
                돌아가기
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
