import React, { useEffect, useState } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);

  // Constants
  const TWO_DAYS_IN_SEC = 2 * 24 * 60 * 60;
  const TWENTY_MIN_IN_SEC = 20 * 60;

  // Utility to convert seconds into [d, h, m, s]
  const convertSeconds = (sec) => {
    const d = Math.floor(sec / (24 * 60 * 60));
    const h = Math.floor((sec % (24 * 60 * 60)) / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return [d, h, m, s];
  };

  // Set or get the start time from localStorage
  useEffect(() => {
    const existingStart = localStorage.getItem("countdownStart");
    let startTime = existingStart ? parseInt(existingStart, 10) : null;

    const now = Math.floor(Date.now() / 1000);

    if (!startTime) {
      startTime = now;
      localStorage.setItem("countdownStart", startTime.toString());
    }

    const calculateTimeLeft = () => {
      const now = Math.floor(Date.now() / 1000);
      const elapsed = now - startTime;

      if (elapsed >= TWO_DAYS_IN_SEC) {
        const postElapsed = elapsed - TWO_DAYS_IN_SEC;

        // If 20 minutes have passed since expiry, reset
        if (postElapsed >= TWENTY_MIN_IN_SEC) {
          const newStart = now;
          localStorage.setItem("countdownStart", newStart.toString());
          return TWO_DAYS_IN_SEC;
        } else {
          return 0; // Show all zero after 2 days (till 20 min passes)
        }
      } else {
        return TWO_DAYS_IN_SEC - elapsed;
      }
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [days, hours, minutes, seconds] = convertSeconds(timeLeft);

  return (
    <div className="timer_box flex gap-2">
      {[days, hours, minutes, seconds].map((val, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center">
            <p className="bg-red-500 w-[30px] h-[30px] flex justify-center items-center rounded text-white text-sm font-semibold">
              {val.toString().padStart(2, "0")}
            </p>
            <span className="text-xs text-gray-600 font-medium mt-1">
              {["Day", "Hr", "Min", "Sec"][i]}
            </span>
          </div>
          {i !== 3 && (
            <span className="text-gray-700 font-semibold mt-2">:</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CountdownTimer;
