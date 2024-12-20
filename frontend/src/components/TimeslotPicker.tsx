import DatePicker from "react-datepicker";

type Props = {
  timeslots: number[];
  isLoading: boolean;
  onSelect: () => void;
};

export function TimeslotPicker({ timeslots, isLoading, onSelect }: Props) {
  return (
    isLoading ? <div>Loading...</div> :
      <DatePicker onSelect={onSelect} dateFormat="dd/MM/yyyy" />
  );
}

