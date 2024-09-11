export default function WidgetWrapper({ children }) {
  return (
    <div className="bg-floraBeige rounded-2xl p-4 w-full max-w-[422px] max-h-[300px] text-mainText shadow-gray-200 shadow-lg">
      {children}
    </div>
  );
}
