export default function SignInWrapper({ children }) {
  return (
    <div className="w-screen h-screen flex justify-end relative bg-no-repeat bg-[url('/image/logo.png')] bg-[left_0_top_50%] xl:bg-[url('/image/sign-logo.png')] xl:bg-[left_39.3%_top_50%] bg-[length:48.3vw_auto]">
      {/* <div className="items-center h-full w-fit hidden lg:flex">
        <img
          src="/image/sign-logo.png"
          className="object-none hidden 2xl:block absolute left-[15.6%]"
        />
        <img src="/image/logo.png" className="2xl:hidden" />
      </div> */}
      {children}
    </div>
  );
}
