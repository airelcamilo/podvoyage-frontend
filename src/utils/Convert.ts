import { format } from "date-fns";

const calculateDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
  return [hours, minutes, formattedHours, formattedMinutes, formattedSeconds]
}

export const convertDuration = (seconds: number) => {
  const [hours, minutes, formattedHours, formattedMinutes, formattedSeconds] = calculateDuration(seconds);

  if (hours == 0) {
    return `${formattedMinutes} min ${formattedSeconds} sec`;
  }

  if (minutes == 0) {
    return `${formattedSeconds} sec`;
  }

  return `${formattedHours} hr ${formattedMinutes} min ${formattedSeconds} sec`;
}

export const convertDurationDense = (seconds: number) => {
  const [hours, minutes, formattedHours, formattedMinutes, formattedSeconds] = calculateDuration(seconds);

  if (hours == 0) {
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  if (minutes == 0) {
    return `${formattedSeconds}`;
  }

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export const convertDate = (date: string) => {
  const newDate = new Date(date);
  return format(newDate, "d MMM yyyy");
}