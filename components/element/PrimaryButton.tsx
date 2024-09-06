export default function PrimaryButton({ children }) {
  return (
    <button
      className="bg-gray-800 text-white rounded-badge py-3 w-full mt-4 hover:bg-gray-700 transition"
      type="submit"
    >
      {children}
    </button>
  );
}
