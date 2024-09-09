export default function LoadingWidget({ size }) {
  return (
    <div
      className={`bg-gray-700 rounded-2xl p-4 ${size} text-gray-100 shadow-lg flex justify-center items-center text-center`}
    >
      Loading...
    </div>
  );
}
