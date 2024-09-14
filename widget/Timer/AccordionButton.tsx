export default function AccordionButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-0.5 whitespace-nowrap rounded-full ${isActive ? 'bg-floraYellow border border-floraYellow' : 'bg-transparent border border-white text-white'}`}
    >
      {label}
    </button>
  );
}
