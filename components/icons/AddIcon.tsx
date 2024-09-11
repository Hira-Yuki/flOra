export default function AddIcon({ className, onClick }) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <rect width="56" height="56" rx="28" fill="white" />
      <rect
        x="13"
        y="25.9987"
        width="30"
        height="4"
        rx="2"
        fill="currentColor"
      />
      <rect
        x="26"
        y="43"
        width="30"
        height="4"
        rx="2"
        transform="rotate(-90 26 43)"
        fill="currentColor"
      />
    </svg>
  );
}
