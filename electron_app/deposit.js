/////////////////////////////////////////
//RUN IN CONSOLE CTRL + SHIFT + I 
/////////////////////////////////////////

// Retrieve the balanceHistory from localStorage
let balanceHistory = JSON.parse(localStorage.getItem("balanceHistory"));

// Remove the first 6 data points
balanceHistory.splice(0, 20); // This will remove the first 6 elements from the array

// Save the modified balanceHistory back to localStorage
localStorage.setItem("balanceHistory", JSON.stringify(balanceHistory));
