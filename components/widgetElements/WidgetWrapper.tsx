export default function WidgetWrapper({ children, bgColor = 'bg-floraBeige' }) {
  return (
    <div
      className={`${bgColor} rounded-[20px] p-4 h-full text-mainText relative min-h-[266px]`}
    >
      {children}
    </div>
  );
}
