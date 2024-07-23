#! /usr/bin/env node

import inquirer from "inquirer";
import { differenceInSeconds, addSeconds } from "date-fns";
import chalk from "chalk";

let res = await inquirer.prompt([
    {
        name:"timer",
        type:"list",
        message:chalk.greenBright("Kindly Select the Timer"),
        choices:["Hours","Minutes","Seconds"]
    },
    {
        name:"input",
        type:"number",
        message:chalk.yellow("Please Enter the amount"),
        transformer: (input: string, answers: any, flags: any) => {
            return chalk.green(input); // Change the input color
        },
        validate:(input)=>{
            if(isNaN(input)){
                return "Please enter a valid number"
            }else if(input<1){
                return "The amount must be at least 1"
            }else{
                return true
            }
        }
    }
])


//Conver the input to seconds based on the selected timer

let input;
switch (res.timer) {
    case "Hours" :
        input = res.input * 3600;
        break;
    case "Minutes":
        input = res.input * 60; 
        break;
        
    case "Seconds":
      input = res.input;
      break; 

  
}



function startTime(num:number) {
    let endTime = addSeconds(new Date(), num);

    function updateTime() {
        let currentTime = new Date()
        
        let diff = differenceInSeconds(endTime,currentTime)

        if(diff <= 0){
            console.log("Timer has expired")
            process.exit()
        }

        let hours = Math.floor(diff / 3600);
        let minutes = Math.floor((diff % 3600) / 60)
        let second = Math.floor(diff % 60)


        if(hours > 0){
            console.log(`${chalk.red(hours.toString().padStart(2,"0"))}${chalk.yellow(`:`)}${chalk.red(minutes.toString().padStart(2,"0"))}${chalk.yellow(`:`)}${chalk.red(second.toString().padStart(2,"0"))}`)

        }else{
            console.log(`${chalk.red(minutes.toString().padStart(2,"0"))}${chalk.yellow(`:`)}${chalk.red(second.toString().padStart(2,"0"))}`)
        }

        let nextTick = 1000-(currentTime.getTime() % 1000);

        setTimeout(updateTime,nextTick)
        
    }
    updateTime()
}

startTime(input)