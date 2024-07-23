import inquirer from "inquirer";
import { differenceInSeconds, addSeconds } from "date-fns";

// Prompt the user to select the time unit and enter the amount
const res = await inquirer.prompt([
    {
        name: "unit",
        type: "list",
        message: "Select the time unit:",
        choices: ["hours", "minutes", "seconds"]
    },
    {
        name: "input",
        type: "number",
        message: "Please enter the amount:",
        validate: (input) => {
            if (isNaN(input)) {
                return "Please enter a valid number";
            } else if (input < 1) {
                return "The amount must be at least 1";
            } else {
                return true;
            }
        }
    }
]);

// Convert the input to seconds based on the selected unit
let input;
switch (res.unit) {
    case "hours":
        input = res.input * 3600;
        break;
    case "minutes":
        input = res.input * 60;
        break;
    case "seconds":
        input = res.input;
        break;
}

function startTime(val:number) {
    let endTime = addSeconds(new Date(), val);

    function updateTimer() {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(endTime, currentTime);

        if (timeDiff <= 0) {
            console.log("Timer has expired");
            process.exit();
        }

        const hours = Math.floor(timeDiff / 3600);
        const minutes = Math.floor((timeDiff % 3600) / 60);
        const seconds = timeDiff % 60;

        if (hours > 0) {
            console.log(`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
        } else {
            console.log(`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
        }

        const nextTick = 1000 - (currentTime.getTime() % 1000);
        setTimeout(updateTimer, nextTick);
    }

    updateTimer();
}

startTime(input);