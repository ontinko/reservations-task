export type TimeslotData = {
  year: number;
  month: number;
}

// Could've used an array, but an object allows to avoid off-by-one errors
export type TimeslotsDTO = {
  [key: number]: number[];
}
