export const getDeliveryEstimates = () => {
  const now = new Date();

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
  };

  const CLOSING_HOUR = 21;
  const currentDay = now.getDay(); // Sunday = 0
  const deliveryDate = new Date(now);

  // Store closed on Sunday
  if (currentDay === 0) {
    deliveryDate.setDate(deliveryDate.getDate() + 1);
  }
  // Saturday after closing -> Monday
  else if (currentDay === 6 && now.getHours() >= CLOSING_HOUR) {
    deliveryDate.setDate(deliveryDate.getDate() + 2);
  }
  // Monday-Friday after closing -> Tomorrow
  else if (now.getHours() >= CLOSING_HOUR) {
    deliveryDate.setDate(deliveryDate.getDate() + 1);
  }

  // Countdown deadline
  const deadline = new Date(now);

  if (currentDay === 0) {
    // Sunday -> Monday 9PM
    deadline.setDate(deadline.getDate() + 1);
    deadline.setHours(CLOSING_HOUR, 0, 0, 0);
  } else {
    deadline.setHours(CLOSING_HOUR, 0, 0, 0);

    if (now > deadline) {
      if (currentDay === 6) {
        // Saturday after closing
        deadline.setDate(deadline.getDate() + 2);
      } else {
        deadline.setDate(deadline.getDate() + 1);
      }
    }
  }

  const diff = deadline.getTime() - now.getTime();
  const countdownHours = Math.max(
    0,
    Math.floor(diff / (1000 * 60 * 60))
  );

  const countdownMins = Math.max(
    0,
    Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  );

  let fastestDelivery = "Today • 40 mins - 1 hour";

  if (currentDay === 0) {
    fastestDelivery = "Monday • 40 mins - 1 hour";
  } else if (currentDay === 6 && now.getHours() >= CLOSING_HOUR) {
    fastestDelivery = "Monday • 40 mins - 1 hour";
  } else if (now.getHours() >= CLOSING_HOUR) {
    fastestDelivery = "Tomorrow • 40 mins - 1 hour";
  }

  return {
    deliveryDate: deliveryDate.toLocaleDateString("en-GB", options),
    fastestDelivery,
    isSameDayAvailable:
      currentDay !== 0 && now.getHours() < CLOSING_HOUR,
    countdown: `${countdownHours} hrs ${countdownMins} mins`,
    countdownHours,
    countdownMins,
  };
};