export default function BigCancelIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_371_5238)">
        <rect x="4" width="56" height="56" rx="28" fill="white" />
        <rect
          x="19.9766"
          y="37.1914"
          width="30"
          height="4"
          rx="2"
          transform="rotate(-45 19.9766 37.1914)"
          fill="#576238"
        />
        <rect
          x="41.1914"
          y="40.0205"
          width="30"
          height="4"
          rx="2"
          transform="rotate(-135 41.1914 40.0205)"
          fill="#576238"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_371_5238"
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
            result="effect1_dropShadow_371_5238"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_371_5238"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
