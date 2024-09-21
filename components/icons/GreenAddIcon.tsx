export default function GreenAddIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_372_2414)">
        <rect x="4" width="56" height="56" rx="28" fill="#576238" />
        <rect x="17" y="25.9985" width="30" height="4" rx="2" fill="white" />
        <rect
          x="30"
          y="43"
          width="30"
          height="4"
          rx="2"
          transform="rotate(-90 30 43)"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_372_2414"
          x="0"
          y="0"
          width="64"
          height="64"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_372_2414"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_372_2414"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
