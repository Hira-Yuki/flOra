const LoadingSpinner = () => (
  <div className="inline-block w-5 h-5 border-2 border-t-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
);
export default function SignInButton({ children, inProcess }) {
  return (
    <button
      className={`bg-floraGreen text-white rounded-badge py-4 w-full mt-4 hover:opacity-80 transition flex items-center justify-center ${inProcess && 'cursor-not-allowed opacity-50'}`}
      disabled={inProcess}
      type="submit"
    >
      {inProcess ? <LoadingSpinner /> : children}
    </button>
  );
}
