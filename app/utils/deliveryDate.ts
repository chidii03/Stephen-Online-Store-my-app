export const getDeliveryEstimates = () => {
  const now = new Date();
  const options = { weekday: "short", month: "short", day: "numeric" } as const;

  // 1. Set the Cutoff time (5:00 PM)
  const deadline = new Date(now);
  deadline.setHours(17, 0, 0, 0);

  // FIX: If it's already past 5 PM, the "next" deadline is 5 PM tomorrow
  if (now > deadline) {
    deadline.setDate(deadline.getDate() + 1);
  }

  // 2. Base Date for shipping
  const baseDate = new Date(now);
  // If past 5 PM, we can't ship until tomorrow
  if (now.getHours() >= 17) {
    baseDate.setDate(baseDate.getDate() + 1);
  }

  const addBusinessDays = (date: Date, days: number) => {
    const result = new Date(date);
    let added = 0;
    while (added < days) {
      result.setDate(result.getDate() + 1);
      if (result.getDay() !== 0) { // Skip Sundays
        added++;
      }
    }
    return result;
  };

  const fastest = addBusinessDays(baseDate, 3);
  const standard = addBusinessDays(baseDate, 6);

  // 3. Countdown logic (Difference between now and the next 5 PM)
  const diff = deadline.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return {
    fastest: fastest.toLocaleDateString("en-GB", options),
    standard: standard.toLocaleDateString("en-GB", options),
    countdown: `${hours} hrs ${mins} mins`, // For the Product Page
    countdownHours: hours, // For the Shop All Page errors
    countdownMins: mins,   // For the Shop All Page errors
  };
};