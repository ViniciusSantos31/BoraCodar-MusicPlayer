export const transformDurationToTimeString = (duration: number) => {
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);

  const timeString = [minutes, seconds]
    .map((unit) => String(unit).padStart(2, "0"))
    .join(":");
  return timeString;
};
