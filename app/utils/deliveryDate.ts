export const getDeliveryEstimates = () => {
  const now = new Date();
  const options = { weekday: "short", month: "short", day: "numeric" } as const;

  const deadline = new Date(now);
  deadline.setHours(17, 0, 0, 0);

  const isPastCutoff = now > deadline;
  const baseDate = new Date(now);
  if (isPastCutoff) baseDate.setDate(baseDate.getDate() + 1);

  const addBusinessDays = (date: Date, days: number) => {
    const result = new Date(date);
    let added = 0;
    while (added < days) {
      result.setDate(result.getDate() + 1);
      if (result.getDay() !== 0) {
        added++;
      }
    }
    return result;
  };

  const fastest = addBusinessDays(baseDate, 3);
  const standard = addBusinessDays(baseDate, 6);

  // Countdown logic
  const diff = deadline.getTime() - now.getTime();
  const hours = Math.max(0, Math.floor(diff / (1000 * 60 * 60)));
  const mins = Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));

  return {
    fastest: fastest.toLocaleDateString("en-GB", options),
    standard: standard.toLocaleDateString("en-GB", options),
    countdown: `${hours} hrs ${mins} mins`,
  };
};
