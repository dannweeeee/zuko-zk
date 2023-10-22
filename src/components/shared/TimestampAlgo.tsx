import { useEffect, useState } from "react";

export default function TimeAgo({ timestamp }: { timestamp: number }) {
  const [timeAgo, setTimeAgo] = useState<string>("");

  useEffect(() => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const timeDifference = now.getTime() - date.getTime();

    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = day * 365;

    if (timeDifference < minute) {
      setTimeAgo("Just now");
    } else if (timeDifference < hour) {
      const minutes = Math.floor(timeDifference / minute);
      setTimeAgo(`${minutes} minute${minutes > 1 ? "s" : ""} ago`);
    } else if (timeDifference < day) {
      const hours = Math.floor(timeDifference / hour);
      setTimeAgo(`${hours} hour${hours > 1 ? "s" : ""} ago`);
    } else if (timeDifference < week) {
      const days = Math.floor(timeDifference / day);
      setTimeAgo(`${days} day${days > 1 ? "s" : ""} ago`);
    } else if (timeDifference < month) {
      const weeks = Math.floor(timeDifference / week);
      setTimeAgo(`${weeks} week${weeks > 1 ? "s" : ""} ago`);
    } else if (timeDifference < year) {
      const months = Math.floor(timeDifference / month);
      setTimeAgo(`${months} month${months > 1 ? "s" : ""} ago`);
    } else {
      const years = Math.floor(timeDifference / year);
      setTimeAgo(`${years} year${years > 1 ? "s" : ""} ago`);
    }
  }, [timestamp]);

  return <span>{timeAgo}</span>;
}
