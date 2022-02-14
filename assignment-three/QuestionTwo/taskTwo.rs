/*
    Task Two:
        1. I'm choosing to implement it with Rust since I don't know Rust yet and It'd be fun to learn the basics of a new language.
        2. Type chosen: Option<T> from Rust : https://doc.rust-lang.org/stable/rust-by-example/std/option.html?highlight=option#option
        3. As per some of our codebase's usage of Option, I decided to implement a small program where there user inputs affect our option
           and at the end I will make use of the match and map functions to return an output to the user.
*/


fn main() {
    let some_number = Some(11i32);
    let some_sqaured_number = match some_number {
        Some(n) => {},
        None => 0
    };

    println!("Answer is: {0}", some_sqaured_number);
}

