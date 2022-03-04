import { defer, repeat } from "rxjs";
import inquirer from "inquirer";

const processCommand = (cmd: any) => console.log(cmd);

const source = defer(() =>
  inquirer.prompt([
    {
      type: "input",
      name: "value",
      message: "Enter command :",
    },
  ])
);

const example = source.pipe(repeat());

const subscription = example.subscribe((cmd) => processCommand(cmd));

// Unsubscribe/kill after a duration
setTimeout(() => subscription.unsubscribe(), 100000);
