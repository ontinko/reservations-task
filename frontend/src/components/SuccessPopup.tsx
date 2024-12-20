import { Button } from "./Button";

type Props = {
  message: string;
  onClose: () => void;
};

export function SuccessPopup({ message, onClose }: Props) {
  return (
    <div>
      <div>{message}</div>
      <div>
        <Button text="Close" onClick={onClose} />
      </div>
    </div>
  );
}

