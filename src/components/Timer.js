import { useEffect, useState } from "react";

export default function Timer() {
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const fullTime = JSON.parse(localStorage.getItem("fullTime"));
    if (fullTime) {
      setMinutes(fullTime.minutes);
      setSeconds(fullTime.seconds);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "fullTime",
      JSON.stringify({ seconds: seconds, minutes: minutes })
    );
  }, [seconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 0) {
          setMinutes((prev) => prev - 1);
          return 59;
        } else return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center">
      <h1 className="text-6xl font-bold digital">{`${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")}`}</h1>
    </div>
  );
}
