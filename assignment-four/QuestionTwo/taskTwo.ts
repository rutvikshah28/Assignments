/*
    Task 2: Given a form interface where the user inputs of type T are stored in 'formValues',
            we want to map the 'formValues' to errors in 'formErrors'

*/

type FormError<T> = {
    [k in keyof T]: string;
}

type FormValues = {
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    phone: string,
}

interface IForm<T> {
    formValues: T,
    formErrors: Partial<FormError<T>>
}

const testForm: IForm<FormValues> = {
    formValues: {
        firstName: "Rutvik",
        lastName: "Shah",
        email: "dev@dev.dev",
        age: 22,
        phone: "555555555555555555" //deliberate error value here
    },
    formErrors: {
        // firstName: "Error in first name",
        // lastName: "Error in last name",
        // email: "Error in email",
        // age: "Error in age",
        phone: "Error in phone number",
    }
};

console.log("The form values: \n", testForm.formValues); //Ans = [values]
console.log("The form errors: \n", testForm.formErrors); //Ans = [phone number error]


