// Global Variables
let price = 19.50; // You can change this for different test cases
let cid = [
    ["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25],
    ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]
];

// Currency unit values
const currencyUnits = {
    "PENNY": 0.01, "NICKEL": 0.05, "DIME": 0.1, "QUARTER": 0.25,
    "ONE": 1, "FIVE": 5, "TEN": 10, "TWENTY": 20, "ONE HUNDRED": 100
};

document.getElementById("purchase-btn").addEventListener("click", function () {
    let cash = parseFloat(document.getElementById("cash").value);
    let changeDue = cash - price;

    if (changeDue < 0) {
        alert("Customer does not have enough money to purchase the item");
        return;
    } else if (changeDue === 0) {
        document.getElementById("change-due").innerText = "No change due - customer paid with exact cash";
        return;
    }

    let totalCid = cid.reduce((sum, curr) => sum + curr[1], 0).toFixed(2);
    
    if (parseFloat(totalCid) < changeDue) {
        document.getElementById("change-due").innerText = "Status: INSUFFICIENT_FUNDS";
        return;
    }

    let changeArr = [];
    let remainingChange = changeDue;

    for (let i = cid.length - 1; i >= 0; i--) {
        let unit = cid[i][0];
        let unitTotal = cid[i][1];
        let unitValue = currencyUnits[unit];
        let amount = 0;

        while (remainingChange >= unitValue && unitTotal > 0) {
            remainingChange = (remainingChange - unitValue).toFixed(2);
            unitTotal -= unitValue;
            amount += unitValue;
        }

        if (amount > 0) {
            changeArr.push([unit, parseFloat(amount.toFixed(2))]);
        }
    }

    if (parseFloat(remainingChange) > 0) {
        document.getElementById("change-due").innerText = "Status: INSUFFICIENT_FUNDS";
        return;
    }

    let totalChangeGiven = changeArr.reduce((sum, curr) => sum + curr[1], 0).toFixed(2);

    if (parseFloat(totalCid) === parseFloat(totalChangeGiven)) {
        document.getElementById("change-due").innerText = `Status: CLOSED ${changeArr.map(c => `${c[0]}: $${c[1].toFixed(2)}`).join(' ')}`;
    } else {
        document.getElementById("change-due").innerText = `Status: OPEN ${changeArr.map(c => `${c[0]}: $${c[1].toFixed(2)}`).join(' ')}`;
    }
});

