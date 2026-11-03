type PropsType = {
  size?: number;
  onClick?: () => void;
  color?: string;
  bgColor?: string;
};

const CloseIcon: React.FC<PropsType> = ({
  size = 24,
  onClick,
  color = "#fff",
  bgColor = "#f44336",
}) => {
  return (
    <svg
      height={size}
      viewBox="0 0 512 512"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      cursor="pointer"
      style={{ marginLeft: "auto" }}
    >
      <g>
        <g>
          <circle id="background" cx="256" cy="256" fill={bgColor} r="256" />
          <path
            d="m348.6 391a42.13 42.13 0 0 1 -30-12.42l-62.6-62.58-62.6 62.61a42.41 42.41 0 1 1 -60-60l62.6-62.61-62.61-62.6a42.41 42.41 0 0 1 60-60l62.61 62.6 62.6-62.61a42.41 42.41 0 1 1 60 60l-62.6 62.61 62.61 62.6a42.41 42.41 0 0 1 -30 72.4z"
            fill={color}
          />
        </g>
      </g>
    </svg>
  );
};
export default CloseIcon;
