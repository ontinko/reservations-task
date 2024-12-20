import "react-datepicker/dist/react-datepicker.css"
import DatePicker from 'react-datepicker';
import { useEffect, useRef, useState } from "react";
import { Button } from "./components/Button";
import { Loader } from "./components/Loader";
import { fetchTimeslots } from "./api/fetchTimeslots";
import { createReservation } from "./api/createReservation";
import { TimeslotData } from "./types/timeslot";
import { ConfirmationPopup } from "./components/ConfirmationPopup";
import { ErrorPopup } from "./components/ErrorPopup";
import { SuccessPopup } from "./components/SuccessPopup";

const isMonthInThePast = ({ month, year }: TimeslotData) => {
  const currentDate = new Date();
  const [currentYear, currentMonth] = [
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
  ];

  if (year > currentYear) {
    return false;
  }

  if (year < currentYear) {
    return true;
  }

  return month < currentMonth;
}

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [timeslots, setTimeslots] = useState<{
    [key: number]: number[],
  }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMonthLoading, setIsMonthLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const getTimeslots = async ({ year, month }: TimeslotData) => {
    setIsMonthLoading(true);

    const { data, error } = await fetchTimeslots({ year, month });
    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setTimeslots(data);
    setIsMonthLoading(false);
  }

  useEffect(() => {
    (async () => {
      const [year, month] = [
        new Date().getFullYear(),
        new Date().getMonth() + 1,
      ];

      setSelectedMonth(month);
      await getTimeslots({ year, month });
    })();
  }, []);

  const isDayAvailable = (date: Date): boolean => {
    const day = date.getDate();
    return !!timeslots[day]?.length;
  }

  const isTimeAvailable = (date: Date): boolean => {
    const [day, hour] = [date.getDate(), date.getHours()];
    if (!timeslots[day]?.length) {
      return false;
    }

    return timeslots[day].includes(hour);
  }

  const onMonthChange = async (date: Date) => {

    const [year, month] = [
      date.getFullYear(),
      date.getMonth() + 1,
    ];

    if (month === selectedMonth) {
      return;
    }

    setSelectedMonth(month);

    if (isMonthInThePast({ year, month })) {
      setTimeslots({});
      return false;
    }

    await getTimeslots({ year, month });
  }

  const onSelect = () => {
    if (!selectedDate) {
      return;
    }

    setIsConfirming(true);
  }

  const onConfirm = async () => {
    if (!selectedDate) {
      setIsConfirming(false);
      setErrorMessage("Something went wrong");
      return;
    }

    const [year, month, day, timeslot] = [
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      selectedDate.getDate(),
      selectedDate.getHours(),
    ];
    console.log(`Selected: ${day}/${month}/${year}, ${timeslot}:00`);

    setIsLoading(true);
    const { error } = await createReservation({ year, month, day, timeslot });
    if (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
    setIsConfirming(false);

    if (!error) {
      setShowSuccess(true);
    }
    await getTimeslots({ year, month });
    setSelectedDate(null);
  }

  const datePickerRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <div ref={mainRef} className="relative">

        {
          errorMessage && mainRef.current && (
            <div
              style={{
                width: `${mainRef.current.getBoundingClientRect().width}px`,
                height: `${mainRef.current.getBoundingClientRect().height}px`,
                zIndex: 60,
                position: "absolute",
              }}
              className="bg-gray-50 bg-opacity-60 flex items-center justify-center"
            >
              <ErrorPopup
                message={errorMessage}
                onClose={() => setErrorMessage(null)}
              />
            </div>
          )
        }

        {
          isConfirming && mainRef.current && (
            <div
              style={{
                width: `${mainRef.current.getBoundingClientRect().width}px`,
                height: `${mainRef.current.getBoundingClientRect().height}px`,
                zIndex: 60,
                position: "absolute",
              }}
              className="bg-gray-50 bg-opacity-60 flex items-center justify-center"
            >
              <ConfirmationPopup
                message="Are you sure you want to make a reservation at the selected time?"
                onConfirm={onConfirm}
                onCancel={() => setIsConfirming(false)}
              />
            </div>
          )
        }

        {
          showSuccess && mainRef.current && (
            <div
              style={{
                width: `${mainRef.current.getBoundingClientRect().width}px`,
                height: `${mainRef.current.getBoundingClientRect().height}px`,
                zIndex: 60,
                position: "absolute",
              }}
              className="bg-gray-50 bg-opacity-60 flex items-center justify-center"
            >
              <SuccessPopup
                message="Reservation created successfully!"
                onClose={() => setShowSuccess(false)}
              />
            </div>
          )
        }

        {
          isLoading && mainRef.current && (
            <div
              style={{
                width: `${mainRef.current.getBoundingClientRect().width}px`,
                height: `${mainRef.current.getBoundingClientRect().height}px`,
                zIndex: 60,
                position: "absolute",
              }}
              className="bg-gray-50 bg-opacity-60 flex items-center justify-center"
            >
              <div className="flex flex-col items-center justify-center">
                <Loader />
                <div>Loading...</div>

              </div>
            </div>
          )
        }

        <div>Restaurant Name</div>
        <div>Make a reservation!</div>
        <div className="relative">
          {
            isMonthLoading && datePickerRef.current && (
              <div
                style={{
                  width: `${datePickerRef.current.getBoundingClientRect().width}px`,
                  height: `${datePickerRef.current.getBoundingClientRect().height}px`,
                  zIndex: 50,
                  position: "absolute",
                }}
                className="bg-gray-50 bg-opacity-60 flex items-center justify-center"
              >
                <div className="flex flex-col items-center justify-center">
                  <Loader />
                  <div>Loading...</div>

                </div>
              </div>
            )
          }
          <div ref={datePickerRef} className="w-fit h-fit">
            <DatePicker
              selected={selectedDate}
              showTimeSelect
              onChange={(date) => setSelectedDate(date)}
              filterDate={isDayAvailable}
              filterTime={isTimeAvailable}
              timeIntervals={60}
              dateFormat="MMMM d, yyyy h:mm aa"
              timeFormat="HH:mm"
              onMonthChange={onMonthChange}
              inline
            >
              <div className="w-full flex flex-col items-center justify-center">
                <Button type="confirm" text="Confirm" onClick={onSelect} disabled={selectedDate === null} />
              </div>
            </DatePicker>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
