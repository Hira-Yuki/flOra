export default function SignInWrapper({ children }) {
  return (
    <div className="w-screen h-screen flex justify-end bg-gray-100">
      {children}
    </div>
  );
}
