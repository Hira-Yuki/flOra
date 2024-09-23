export default function WidgetWrapper({ children, bgColor = 'bg-floraBeige' }) {
  return (
    <div
      className={`${bgColor} rounded-2xl p-4 h-full text-mainText shadow-gray-200 shadow-lg relative`}
    >
      {children}
    </div>
  );
}
