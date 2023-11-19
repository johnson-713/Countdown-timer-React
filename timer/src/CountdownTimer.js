import React, { useEffect, useState } from "react";
import "./CountdownTimer.css";

const CountdownTimer = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (
            prevTime.hours === 0 &&
            prevTime.minutes === 0 &&
            prevTime.seconds === 0
          ) {
            clearInterval(interval);
            setIsRunning(false);
            return { hours: 0, minutes: 0, seconds: 0 };
          }

          let newTime = { ...prevTime };

          if (newTime.seconds > 0) {
            newTime.seconds -= 1;
          } else {
            if (newTime.minutes > 0) {
              newTime.minutes -= 1;
              newTime.seconds = 59;
            } else {
              newTime.hours -= 1;
              newTime.minutes = 59;
              newTime.seconds = 59;
            }
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setTime({ hours: 0, minutes: 0, seconds: 0 });
    setIsRunning(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const initialValue = parseInt(value, 10) || 0;
    const limitedValue = Math.min(Math.max(initialValue, 0), 99);
    setTime((prevTime) => ({ ...prevTime, [name]: limitedValue }));
  };
  return (
    <div className="container">
      <p className="container__title">Countdown Timer</p>

      <div className="container__labels">
        <p className="container__labels--label">Hours</p>
        <p className="container__labels--label">Minutes</p>
        <p className="container__labels--label">Seconds</p>
      </div>

      <div className="container__inputs">
        <input
          className="container__inputs--time hour"
          type="number"
          name="hours"
          value={time.hours}
          placeholder="00"
          onChange={handleChange}
          max="99"
        />
        <input
          type="number"
          className="container__inputs--time minute"
          name="minutes"
          value={time.minutes}
          placeholder="00"
          onChange={handleChange}
          max="99"
        />
        <input
          type="number"
          className="container__inputs--time second"
          name="seconds"
          value={time.seconds}
          placeholder="00"
          onChange={handleChange}
          max="99"
        />
      </div>

      <div className="container__btns">
        <button className="btns start" onClick={handleStartStop}>
          {isRunning ? "Stop" : "Start / Continue"}
        </button>
        <button className="btns reset" onClick={handleReset}>
          Reset
        </button>
      </div>
      <p>
        Time Remaining:
        {String(time.hours).padStart(2, "0")}:
        {String(time.minutes).padStart(2, "0")}:
        {String(time.seconds).padStart(2, "0")}
      </p>
    </div>
  );
};

export default CountdownTimer;
