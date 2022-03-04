import { defer, repeat } from "rxjs";
import inquirer from "inquirer";

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

const state: State = {
  firstName: "Enter First Name",
  lastName: "Enter Last Name",
  age: 0,
  email: "example@eg.com"
}

// ---------- UPDATE: State -> Command -> State ----------



// ---------- VIEW: State -> UI ----------



const processCommand = (cmd: any) => console.log(cmd);

const source = defer(() =>
  inquirer.prompt([
    {
      type: "input",
      name: "value",
      message: `First Name: ${state.firstName}\nLast Name: ${state.lastName}\nAge: ${state.age}\nEmail: ${state.email}\n`,
    },
  ])
);

const example = source.pipe(repeat());

const subscription = example.subscribe((cmd) => processCommand(cmd));

// Unsubscribe/kill after a duration
setTimeout(() => subscription.unsubscribe(), 100000);
