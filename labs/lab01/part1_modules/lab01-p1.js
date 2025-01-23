import lodash from "lodash";

// Task 1
const holidays = [
    { name: "Christmas", date: new Date("2025-12-25") },
    { name: "Canada Day", date: new Date("2025-07-01") },
    { name: "April Fools", date: new Date("2025-04-01") },
];

let today = new Date();

// Task 2
holidays.forEach(holiday => {
    let dateDifference = holiday.date - today;
    let numDays = Math.ceil(dateDifference / (1000 * 60 * 60 * 24));
    console.log(`${holiday.name} is in ${numDays} days`);
});

// Task 3
console.log(lodash.sample(holidays));

// Task 4
console.log(lodash.findIndex(holidays, { name: "Christmas" }));
console.log(lodash.findIndex(holidays, { name: "Canada Day" }));