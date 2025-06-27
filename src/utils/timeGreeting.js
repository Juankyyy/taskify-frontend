export const TimeGreeting = () => {
  const date = new Date();
  let dateTime = date.getHours();
  let dateName;

  if (dateTime >= 0 && dateTime < 12) {
    dateName = "Buenos días";
  } else if (dateTime >= 12 && dateTime < 19) {
    dateName = "Buenas tardes";
  } else {
    dateName = "Buenas noches";
  }

  return {
    dateName,
  };
};
