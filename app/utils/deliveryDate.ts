export const getDeliveryEstimates = () => {
  const now = new Date();
  const options = { weekday: 'short', month: 'short', day: 'numeric' } as const;
  
  // Cutoff time is 5:00 PM (17:00)
  const deadline = new Date(now);
  deadline.setHours(17, 0, 0, 0);

  const isPastCutoff = now > deadline;
  
  // If past 5 PM, shipping starts calculation from Tomorrow
  const baseDate = new Date(now);
  if (isPastCutoff) {
    baseDate.setDate(baseDate.getDate() + 1);
    // Reset deadline for tomorrow's countdown
    deadline.setDate(deadline.getDate() + 1);
  }

  // Calculate Countdown
  const diff = deadline.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const countdown = `${hours} hrs ${mins} mins`;

  // Delivery Dates (Business Days Logic could be added here)
  const fastest = new Date(baseDate);
  fastest.setDate(baseDate.getDate() + 1); // +1 day processing

  const standard = new Date(baseDate);
  standard.setDate(baseDate.getDate() + 4); // +4 days standard

  return {
    fastest: fastest.toLocaleDateString('en-GB', options), // en-GB puts Day before Month (12 Jan)
    standard: standard.toLocaleDateString('en-GB', options),
    countdown: countdown
  };
};