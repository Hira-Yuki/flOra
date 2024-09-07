export default function SignInForm({ children, onSubmit }) {
  return (
    <form className="flex flex-col gap-6 w-full" onSubmit={onSubmit}>
      {children}
    </form>
  );
}
