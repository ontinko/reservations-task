import { Button } from "./Button";
import { Popup } from "./Popup";

type Props = {
  message: string;
  onClose: () => void;
};

export function SuccessPopup({ message, onClose }: Props) {
  return <Popup>
    <div className="text-2xl font-semibold text-center w-full">{message}</div>
    <div className="flex justify-center mt-4">
      <Button text="Close" onClick={onClose} />
    </div>
  </Popup>
}
