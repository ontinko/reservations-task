import { Button } from "./Button";

type Props = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmationPopup({ message, onConfirm, onCancel }: Props) {
  return (
    <div>
      <div>{message}</div>
      <div>
        <Button type="confirm" text="Confirm" onClick={onConfirm} />
        <Button type="cancel" text="Cancel" onClick={onCancel} />
      </div>
    </div>
  );
}
