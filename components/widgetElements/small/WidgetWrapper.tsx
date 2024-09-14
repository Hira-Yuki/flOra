export default function WidgetWrapper({ children }) {
  return (
    <div className="bg-floraBeige rounded-2xl p-4 w-full h-[300px] text-mainText shadow-gray-200 shadow-lg">
      {children}
    </div>
  );
}
