export default function SignInWrapper({ children }) {
  return (
    <div className="w-screen h-screen flex justify-end relative bg-floraBeige bg-no-repeat bg-[url('/image/logo.png')] bg-[left_0_top_50%] xl:bg-[url('/image/sign-logo.png')] xl:bg-[left_39.3%_top_50%] bg-[length:48.3vw_auto]">
      {children}
    </div>
  );
}
