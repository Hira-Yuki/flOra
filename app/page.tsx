'use client';
import useDebouncedSubmit from '@hooks/useDebounceSubmit';
import useInput from '@hooks/useInput';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function Hello() {
  const email = useInput('');
  const password = useInput('');

  const resetForm = () => {
    email.reset();
    password.reset();
  };

  const handleSubmit = async (emailValue: string, passwordValue: string) => {
    if (!emailValue || !passwordValue) {
      toast.warning('이메일과 비밀번호를 정확히 입력해 주세요.');
      return;
    }

    try {
      toast.success('로그인 요청!!');
    } catch (error) {
      toast.error('로그인 실패');
      console.log(error);
    }

    resetForm();
  };

  const debouncedSubmit = useDebouncedSubmit(handleSubmit);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    debouncedSubmit(email.value, password.value);
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
            Welcome!
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
            <input
              id="sign_password"
              className="border border-gray-700 rounded-badge px-4 py-2"
              placeholder="password"
              type="password"
              value={password.value}
              onChange={password.onChange}
            />
            <button
              className="mt-4 md:mt-6 py-2 md:py-3 rounded-badge w-full bg-sky-400"
              type="submit"
            >
              시작하기
            </button>
          </form>
          <div className="w-full px-3 py-2">
            <p className="font-light text-sm">
              비밀번호를{' '}
              <Link className="font-bold underline" href={'/find-password'}>
                잊어버리셨나요?
              </Link>
            </p>
          </div>
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
