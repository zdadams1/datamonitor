function updateClock() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    month: "2-digit",
    day: "2-digit",
  });

  let formattedTime = formatter.format(now).replace(/,/g, "");
  const hour = now.getHours();
  const amPm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  const minute = now.getMinutes();

  formattedTime = formattedTime.replace(/\d{2}:\d{2}\s(?:AM|PM)/, `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}<span class="ampm">${amPm}</span>`);

  document.getElementById("clock").innerHTML = formattedTime;
}

module.exports = {
  updateClock: updateClock
};