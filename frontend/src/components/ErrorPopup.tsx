import { Button } from "./Button";

type Props = {
  message: string;
  onClose: () => void;
};

export function ErrorPopup({ message, onClose }: Props) {
  return (
    <div>
      <div>{"Error: " + message}</div>
      <div>
        <Button text="Close" onClick={onClose} />
      </div>
    </div>
  );
}
