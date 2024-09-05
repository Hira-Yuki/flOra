'use client'
import useInput from "@hooks/useInput";

export default function Hello() {
  // useInput 훅 사용
  const email = useInput('');
  const password = useInput('');

  const resetForm = () => {
    email.reset()
    password.reset()
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.value || !password.value) {
      console.log('몬가 비어있음')
      return
    }
    console.log(`Email: ${email.value}\tPassword: ${password.value}`);
    // 로그인 로직 추가

    resetForm()
  };

  return (
    <section className="w-screen h-screen flex justify-end bg-teal-400">

      {/* 로그인 영역 */}
      <div className="w-full lg:w-1/2 h-full flex relative bg-white lg:shadow-2xl lg:shadow-gray-800">
        <h1 className="m-4 text-xl md:text-2xl font-semibold absolute">FLORA</h1>
        <div className="flex mx-auto w-4/5 sm:w-3/4 md:w-1/2 lg:w-1/3 justify-center flex-col items-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-6 lg:mb-10">
            Welcome!
          </h2>

          {/* 폼 영역 */}
          <form className="flex justify-center flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <input
              id='sign_email'
              className="border border-gray-700 rounded-badge px-4 py-2"
              placeholder="e-mail"
              type="email"
              value={email.value} onChange={email.onChange}
            />
            <input
              id='sign_password'
              className="border border-gray-700 rounded-badge px-4 py-2"
              placeholder="password"
              type="password"
              value={password.value} onChange={password.onChange}
            />
            <button
              className="mt-4 md:mt-6 mb-4 md:mb-6 py-2 md:py-3 rounded-badge w-full bg-sky-400"
              type="submit"
            >
              시작하기
            </button>

            {/* 영역 분리 */}
            <div className="flex items-center mb-4">
              <hr className="border-1 border-gray-600 w-1/6 md:w-1/5 opacity-60" />
              <span className="w-4/6 md:w-3/5 text-xs text-center text-gray-700 opacity-60">
                SNS 계정으로 시작하기
              </span>
              <hr className="border-1 border-gray-600 w-1/6 md:w-1/5 opacity-60" />
            </div>

            {/* SNS 아이콘 영역 */}
            <div className="flex items-center gap-3 md:gap-5 justify-center">
              <div className="w-6 md:w-8 h-6 md:h-8 bg-gray-800 rounded-full" />
              <div className="w-6 md:w-8 h-6 md:h-8 bg-gray-800 rounded-full" />
              <div className="w-6 md:w-8 h-6 md:h-8 bg-gray-800 rounded-full" />
              <div className="w-6 md:w-8 h-6 md:h-8 bg-gray-800 rounded-full" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
