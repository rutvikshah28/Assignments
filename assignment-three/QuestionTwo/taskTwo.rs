/*
    Task Two:
        1. I'm choosing to implement it with Rust since I don't know Rust yet and It'd be fun to learn the basics of a new language.
        2. Type chosen: Option<T> from Rust : https://doc.rust-lang.org/stable/rust-by-example/std/option.html?highlight=option#option
        3. As per some of our codebase's usage of Option, I decided to implement a small program where there user inputs affect our option
           and at the end I will make use of the match and map functions to return an output to the user.
        4. It is a very short I/O program where the user chooses a number and then chooses an operation to perform on it.
        5. The user has the option to choose nothing and if the user enters something unexpected we handle it with the none state.
        6. We then take the user's choices into consideration and perform the desired operation.
        7. We finally print the output back to the user. 
*/

use std::io;
fn main() {

    let mut line = String::new();
    println!("Please choose a number: \n    1. 11\n    2. 22\n    3. 33\n    4. Nothing");
    io::stdin().read_line(&mut line).unwrap();

    let some_number: Option<i32>;
    if line.trim() == "1" {
        some_number = Some(11);
    }
    else if line.trim() == "2" {
        some_number = Some(22);
    }
    else if line.trim() == "3" {
        some_number = Some(33);
    }
    else {
        some_number = None;
    }
    
    let squared = some_number.map(|val| val * val);
    let cubed = some_number.map(|val| val * val * val);
    let sqrt = some_number.map(|val| f32::powf(val as f32, 0.5));

    println!("Please choose the operation to perform: \n    1. Sqaure\n    2. Cube\n    3. Square Root\n    4.Nothing");
    let mut operation = String::new();
    io::stdin().read_line(&mut operation).unwrap();

    if operation.trim() == "1" {
        match squared {
            Some(n) => println!("Squared value is: {}", n),
            None => println!("No value exists!")
        }
    }
    else if operation.trim() == "2" {
        match cubed {
            Some(n) => println!("Cubed value is: {}", n),
            None => println!("No value exists!")
        }
    }
    else if operation.trim() == "3" {
        match sqrt {
            Some(n) => println!("Squared value is: {}", n),
            None => println!("No value exists!")
        }
    }
    else{
        println!("No operation done!");
    }
}

