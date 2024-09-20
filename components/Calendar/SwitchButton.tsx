export default function SwitchButton({
  isSwitch,
  label1,
  label2,
  func1,
  func2,
  goToday = null,
  isCalendar = false,
}) {
  return (
    <div className="flex-1 flex justify-end">
      {isCalendar && (
        <button
          type="button"
          className="bg-floraOlive rounded-badge w-[70px] mr-3 text-white active:bg-floraGreen hover:opacity-70"
          onClick={goToday}
        >
          오늘
        </button>
      )}
      <div className="relative bg-white rounded-badge w-[130px] font-semibold text-md text-mainText overflow-hidden">
        <button
          className={`w-[70px] px-2 py-2 h-full rounded-badge hover:opacity-70 ${isSwitch && 'bg-floraYellow'}`}
          onClick={func1}
        >
          {label1}
        </button>
        <button
          className={`absolute right-0 w-[70px] px-2 py-2 rounded-badge hover:opacity-70 ${!isSwitch && 'bg-floraYellow'}`}
          onClick={func2}
        >
          {label2}
        </button>
      </div>
    </div>
  );
}
