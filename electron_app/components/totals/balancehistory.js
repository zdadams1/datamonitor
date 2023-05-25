const axios = require('axios');
const kucoinBotsEl = document.getElementById('kucoinBotsEl');
const fourHourTableBody = document.getElementById("four-hour-table").querySelector("tbody");
const { updateKucoinBots } = require('./botController');

let balanceHistory = JSON.parse(localStorage.getItem("balanceHistory")) || [];

async function updateBalanceHistory(kucoinBotsEl) {
  await updateKucoinBots();
  const totalBalance = parseFloat(kucoinBotsEl.textContent.split(" ")[2].slice(1));
  const timestamp = new Date();
  balanceHistory.push({ timestamp, balance: totalBalance });
  localStorage.setItem("balanceHistory", JSON.stringify(balanceHistory));
}

function updateBalanceTables(fourHourTableBody) {
  fourHourTableBody.innerHTML = balanceHistory
    .slice()
    .reverse()
    .map((entry) => {
      const dateObj = new Date(entry.timestamp);
      const dateFormatter = new Intl.DateTimeFormat('en-US', {month: '2-digit', day: '2-digit', timeZone: 'America/Los_Angeles'});
      const timeFormatter = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit', timeZone: 'America/Los_Angeles'});
      const date = dateFormatter.format(dateObj);
      const time = timeFormatter.format(dateObj);
      const totalBalance = entry.balance.toFixed(2);
      return `<tr><td>${date} ${time}</td><td>$${totalBalance}</td></tr>`;
    })
    .join("");
}

module.exports = {
  updateBalanceHistory,
  updateBalanceTables
}
