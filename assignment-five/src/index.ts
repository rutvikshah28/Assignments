import * as RX from "rxjs";
import inquirer from "inquirer";
import process from "process";

/*
  FRP - unidirectional flow.

  Main flow: 
  Init -> User inputs -> new UI -> User Inputs -> ... -> END

  Model (Init): Initial State:

  Update: Change State based on user inputs

  View: Change UI based on state inputs

  What will the cli app do?
  -> Lets make a form:
    1. First Name:
    2. Last Name:
    3. username:
    4. Age:
    5. Email:

    Initially - All are empty.
    We ask the user to fill this form.
    -> The user can choose from (1-5) which part to fill first.
    -> Upon selecting 'x' the user will then be prompted to provide an input to that value of the form.
    -> Once done, the main menu will be displayed again, The user can now choose 'x' again.
    -> This allows the user to go back and edit already filled form details.
    -> Once the user is happy with the inputs, they can type "S" or "s" to submit.
    -> At any point the user can quit the program by typing "Q" or "q".

*/

//---------- MODEL: State ----------

//Initial State 

//State type has readonly to ensure immutability.
type State = {
  readonly firstName: string,
  readonly lastName: string,
  readonly age: number,
  readonly email: string

}

const initialState: State = {
  firstName: "Rutvik",
  lastName: "Shah",
  age: 22,
  email: "test@test.com"
}

let currState: State = initialState;

// // ---------- UPDATE: State -> Command -> State ----------

const setState = (changes: Partial<State>) => {
  currState = {...currState, ...changes};
}

const printState = (): string => {
  return `First Name: ${currState.firstName}\nLast Name: ${currState.lastName}\nAge: ${currState.age}\nEmail: ${currState.email}\n`
}

const writeState = async (type: "q" | "s" | "fn" | "ln" | "a" | "e") => {
  if(type === "q"){
    console.log("Quitting...\n");
  }
  else if(type === "s"){
    console.log("Saving...\n");
  }
  else if(type === "fn"){
    const val = await inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: `Change First Name:\n`
      }
    ]);
    setState(val)
  }
  else if(type === "ln"){
    const val = await inquirer.prompt([
      {
        type: "input",
        name: "lastName",
        message: `Change Last Name:\n`
      }
    ]);
    setState(val);
  }
  else if(type === "a"){
    const val = await inquirer.prompt([
      {
        type: "input",
        name: "age",
        message: `Change Age:\n`
      }
    ]);
    setState(val);
  }
  else{
    const val = await inquirer.prompt([
      {
        type: "input",
        name: "email",
        message: `Change Email\n`
      }
    ]);
    setState(val);
  }
}

// ---------- VIEW: State -> UI ----------


const mainForm = RX.defer(() =>
  inquirer.prompt([
    {
      type: "input",
      name: "value",
      message: `${printState()}Command: 
                  \n\tEnter "1" to change first name
                  \n\tEnter "2" to change last name
                  \n\tEnter "3" to change age
                  \n\tEnter "4" to change email
                  \n\tEnter "s" or "S" to submit
                  \n\tEnter "q" or "Q" to quit\n`,
    },
  ])
);

const example = mainForm.pipe(RX.repeat());
let subscription = example.subscribe(cmd => processCommand(cmd));


const processCommand = async(cmd: any) => {
  switch(cmd.value.toLowerCase()){
    case "q" :  writeState("q");
                subscription.unsubscribe();
                process.exit();
    case "s" :  writeState("s");
                subscription.unsubscribe();
                process.exit();
    case "1" :  subscription.unsubscribe();
                await writeState("fn")
                subscription = example.subscribe(cmd => processCommand(cmd));
                break;
    case "2" :  subscription.unsubscribe();
                await writeState("ln")
                subscription = example.subscribe(cmd => processCommand(cmd));
                break;
    case "3" :  subscription.unsubscribe();
                await writeState("a")
                subscription = example.subscribe(cmd => processCommand(cmd));
                break;
    case "4" :  subscription.unsubscribe();
                await writeState("e")
                subscription = example.subscribe(cmd => processCommand(cmd));
                break;
    default :   console.log("Please enter a valid command\n");
  }
}
