import { Button } from "./Button";
import { Popup } from "./Popup";

type Props = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmationPopup({ message, onConfirm, onCancel }: Props) {
  return (
    <Popup>
      <div className="text-2xl font-semibold text-center w-full">{message}</div>
      <div className="flex justify-between px-6 mt-4">
        <Button type="confirm" text="Confirm" onClick={onConfirm} />
        <Button type="cancel" text="Cancel" onClick={onCancel} />
      </div>
    </Popup>
  )
}
