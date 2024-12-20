type ButtonType = "cancel" | "confirm" | "neutral";

type Props = {
  text: string;
  type?: ButtonType;
  disabled?: boolean;
  onClick: () => void;
};

export function Button({ text, disabled, type, onClick }: Props) {
  let className: string;

  switch (type) {
    case "cancel": {
      className = "bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
      break;
    }
    case "confirm": {
      className = "bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
      break;
    }
    default: {
      className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
      break;
    }
  }

  return <button
    onClick={onClick}
    disabled={disabled}
    className={className}
  >{text}
  </button>
}
