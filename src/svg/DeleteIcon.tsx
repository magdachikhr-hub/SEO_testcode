type PropsType = {
  size?: number;
  color?: string;
  onClick?: () => void;
  borderColor?: string;
};

const DeleteIcon: React.FC<PropsType> = ({
  size = 24,
  color = "#aed6f1",
  borderColor = "#323d51",
  onClick,
}) => {
  return (
    <svg
      height={size}
      viewBox="0 0 32 32"
      width={size}
      onClick={onClick}
      cursor="pointer"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="m26 7h-5v-1.862a2.14 2.14 0 0 0 -2.138-2.138h-5.724a2.14 2.14 0 0 0 -2.138 2.138v1.862h-5a1 1 0 0 0 0 2h1.037a2.278 2.278 0 0 0 -.037.362v17.276a2.365 2.365 0 0 0 2.362 2.362h13.276a2.365 2.365 0 0 0 2.362-2.362v-17.276a2.278 2.278 0 0 0 -.037-.362h1.037a1 1 0 0 0 0-2zm-7 0h-6v-1.862a.138.138 0 0 1 .138-.138h5.724a.138.138 0 0 1 .138.138z"
          fill={borderColor}
        />
        <path
          d="m23 9.362v17.276a.362.362 0 0 1 -.362.362h-13.276a.362.362 0 0 1 -.362-.362v-17.276a.362.362 0 0 1 .362-.362h13.276a.362.362 0 0 1 .362.362z"
          fill={color}
        />
        <g fill={borderColor}>
          <path d="m12 12a1 1 0 0 0 -1 1v10a1 1 0 0 0 2 0v-10a1 1 0 0 0 -1-1z" />
          <path d="m16 12a1 1 0 0 0 -1 1v10a1 1 0 0 0 2 0v-10a1 1 0 0 0 -1-1z" />
          <path d="m19 13v10a1 1 0 0 0 2 0v-10a1 1 0 0 0 -2 0z" />
        </g>
      </g>
    </svg>
  );
};

export default DeleteIcon;
