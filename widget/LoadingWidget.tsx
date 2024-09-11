export default function LoadingWidget({ size }) {
  return (
    <div
      className={`bg-floraBeige rounded-2xl p-4 ${size} text-mainText shadow-lg flex justify-center items-center text-center`}
    >
      Loading...
    </div>
  );
}
