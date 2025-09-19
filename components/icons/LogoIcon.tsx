
const LogoIcon = ({ isSmall = false }) => {
  const size = isSmall ? 32 : 40;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="bg-bg-secondary rounded-full p-1 border-2 border-border-color"
    >
      <rect width="40" height="40" rx="20" fill="var(--bg-secondary)" />
      <g clipPath="url(#clip0_105_2)">
        <rect x="7" y="7" width="26" height="26" rx="6" fill="var(--logo-waffle)" />
        <path d="M7 17H33" stroke="var(--bg-secondary)" strokeOpacity="0.5" strokeWidth="2" />
        <path d="M7 23H33" stroke="var(--bg-secondary)" strokeOpacity="0.5" strokeWidth="2" />
        <path d="M17 7L17 33" stroke="var(--bg-secondary)" strokeOpacity="0.5" strokeWidth="2" />
        <path d="M23 7L23 33" stroke="var(--bg-secondary)" strokeOpacity="0.5" strokeWidth="2" />
        <path
          d="M20.0002 26.5C22.3263 26.5 24.2502 24.5761 24.2502 22.25V22.25C24.2502 21.056 23.3163 20.0833 22.143 19.9925L17.8574 19.6742C16.6841 19.5833 15.7502 18.6096 15.7502 17.4167V17.4167C15.7502 15.0899 17.6741 13.166 20.0002 13.166"
          stroke="var(--logo-butter)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <rect
          x="16.5"
          y="9.5"
          width="7"
          height="7"
          rx="2"
          fill="var(--logo-butter)"
        />
      </g>
      <defs>
        <clipPath id="clip0_105_2">
          <rect x="7" y="7" width="26" height="26" rx="6" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
