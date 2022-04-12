# Assignment 6 - Rust Web Server

1. As per the Question, we have created a Rust based web server using Rocket
2. Majority of the code has been written with the help of bootstrapping the `oranger` code given as a starter.
3. I had the idea of creating a wordle like puzzle with a chemistry based theme.. considering we are developing this in `rust`
4. This directory is divided into `rust-web-server` and `rust-web-client` packages.
5. The `rust-web-server` heavily relies on the oranger as an inspiration to set cookie based authentication and create protected routes for getting a list of questions and an answer for a given question.
6. The goal was to link this using `yew` crate to render a frontend ui where a user can interact and play a short puzzle.
7. The server has been completed but as an extension for the frontend ui, I could only create the html barebones.
8. Rust syntax and packages will take some getting used to, I struggled a lot typing this out (;-;)
9. To run the server:
```bash
    cd rust-web-server
    cargo watch -x run #For a development server
    cargo run #To simply run the server without watching for changes
```
10. To run the client:
```bash
    cd rust-web-client
    trunk serve --open
```
11. Before running make sure you have the latest `rust-nightly` installed long with `cargo`, `trunk` and other dependencies.