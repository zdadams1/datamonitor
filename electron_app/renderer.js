const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list'); 
const balanceModal = document.getElementById("balance-modal");
const closeBtn = document.querySelector(".close");
const showBalanceModalBtn = document.getElementById("show-balance-modal");
const clockUpdater = require('./components/clock/clock');
const weatherUpdater = require('./components/weather/weather');
const alarmController = require('./components/alarm/alarm');
const { playAlarm,  initAlarmController, stopAlarm } = require('./components/alarm/alarm');
const cryptoController = require('./components/crypto/crypto');
const botController = require('./components/bot/bot');
const todo = require('./components/todo/todo');
//

const SERVER_URL = 'http://localhost:3001';

//Init clock
clockUpdater.updateClock();
setInterval(clockUpdater.updateClock, 1000);

//Init weather
weatherUpdater.updateWeather();

//init crypto
cryptoController.startUpdatingCrypto();

//Init alarm
document.addEventListener("DOMContentLoaded", function () {
  alarmController.initAlarmController();
});

//Init bot data
botController.updateKucoinBots(playAlarm);

async function calculateProjectedIncome(mostRecentBalance) {
  // Set the origin date (May 2nd)
  // Change this date when you deposit funds
  const originDate = new Date("2023-05-02T05:26:00-06:15");

  // Find the balance on May 2nd
  const originBalanceData = balanceHistory.find(entry =>
    new Date(entry.timestamp).toDateString() === originDate.toDateString()
  );

  if (!originBalanceData) {
    console.error("Origin balance not found");
    return;
  }

  // Calculate the number of days since May 2nd
  const currentDate = new Date();
  const daysPassed = Math.floor(
    (currentDate - originDate) / (1000 * 60 * 60 * 24)
  );


  // Calculate the daily income for each day
  let dailyIncomeSum = 0;

  // Calculate the daily income for the last day (from the start of the day to the current time)
  const lastDayStart = new Date(originDate.getTime() + daysPassed * 24 * 60 * 60 * 1000);
  const startOfLastDayBalance = balanceHistory.find(
    entry => new Date(entry.timestamp) >= lastDayStart && new Date(entry.timestamp) < currentDate
  );

  if (startOfLastDayBalance) {
    dailyIncomeSum += mostRecentBalance - startOfLastDayBalance.balance;
  }

  // Calculate the daily income for the previous days
  for (let i = 0; i < daysPassed - 1; i++) { // Change this line
    const dayStart = new Date(originDate.getTime() + i * 24 * 60 * 60 * 1000);
    const dayEnd = new Date(originDate.getTime() + (i + 1) * 24 * 60 * 60 * 1000);
    const startOfDayBalance = balanceHistory.find(
      entry => new Date(entry.timestamp) >= dayStart && new Date(entry.timestamp) < dayEnd
    );
    const endOfDayBalance = balanceHistory.slice().reverse().find(
      entry => new Date(entry.timestamp) >= dayStart && new Date(entry.timestamp) < dayEnd
    );

    if (startOfDayBalance && endOfDayBalance) {
      dailyIncomeSum += endOfDayBalance.balance - startOfDayBalance.balance;
    }
  }
// Calculate the average daily income
const dailyProjectedIncome = dailyIncomeSum / daysPassed;

// Calculate the daily growth rate
const dailyGrowthRate = Math.pow(mostRecentBalance / originBalanceData.balance, 1 / daysPassed) - 1;

// Calculate the weekly, monthly, and yearly projected incomes
const weeklyFutureValue = mostRecentBalance * Math.pow(1 + dailyGrowthRate, 7);
const monthlyFutureValue = mostRecentBalance * Math.pow(1 + dailyGrowthRate, 30);
const yearlyFutureValue = mostRecentBalance * Math.pow(1 + dailyGrowthRate, 365);

// Calculate the weekly, monthly, and yearly projected incomes considering compound growth
const weeklyProjectedIncome = weeklyFutureValue - mostRecentBalance;
const monthlyProjectedIncome = monthlyFutureValue - mostRecentBalance;
const yearlyProjectedIncome = yearlyFutureValue - mostRecentBalance;

// Update the projected incomes element with the new data
const projectedIncomesEl = document.getElementById("projected-incomes");
projectedIncomesEl.innerHTML = `<p><span class="white-label">Daily</span> $${dailyProjectedIncome.toFixed(2)}</p>
<p><span class="white-label">Weekly</span> $${weeklyProjectedIncome.toFixed(2)}</p>
<p><span class="white-label">Monthly</span> $${monthlyProjectedIncome.toFixed(2)}</p>
<p><span class="white-label">Yearly</span> $${yearlyProjectedIncome.toFixed(2)}</p>`;
}

async function updateProjectedIncome() {
  const botsData = await axios.get(`${SERVER_URL}/kucoinBots`);

  // Find the USDT and BTC balances in the bot data
  const usdtData = botsData.data.bots[0].find(
    (item) => item.currency === "USDT"
  );
  const btcData = botsData.data.bots[0].find(
    (item) => item.currency === "BTC"
  );

  // Extract the balances
  const usdtBalance = usdtData ? parseFloat(usdtData.balance) : 0;
  const btcBalance = btcData ? parseFloat(btcData.balance) : 0;

  // Get the current market value of BTC
  const btcValue = await updateCrypto();

  // Total bot balance in USD
  const mostRecentBalance = usdtBalance + btcBalance * btcValue;

  // Call calculateProjectedIncome() with the most recent balance to update the projected income data
  calculateProjectedIncome(mostRecentBalance);
}

// Call updateProjectedIncome() every 5 minutes
setInterval(updateProjectedIncome, 5 * 60 * 1000);

// Call updateProjectedIncome() initially to display the projected income data
updateProjectedIncome();



//Init todo's
todoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  if (todoInput.value.trim()) {
    todo.addTodoToList(todoInput.value, todoList);
    todo.saveTodos(todoList);
    todoInput.value = '';
  }
});

todo.loadTodos(todoList, todo.addTodoToList);