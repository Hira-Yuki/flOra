export default function WidgetWrapper({ children }) {
  return (
    <div className="bg-floraBeige rounded-2xl p-4 text-mainText shadow-gray-200 shadow-lg relative">
      {children}
    </div>
  );
}
