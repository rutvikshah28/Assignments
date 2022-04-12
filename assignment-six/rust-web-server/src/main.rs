#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use] extern crate rocket;

#[macro_use] extern crate rocket_contrib;

use serde::Deserialize;

extern crate time;


use rocket::http::{Cookie, Cookies};
use rocket::response::status;
use rocket::response::status::BadRequest;
use rocket::Request;
use rocket_contrib::json::{Json, JsonValue};
use time::Duration;

const PASSWORD: &str = "chemdle_is_great";

#[derive(Deserialize)]
pub struct AuthInfo {
    pub user_id: i32,
    pub password: String,
}

#[post("/login", data="<user>", format = "json")]
fn login(
    user: Json<AuthInfo>,
    mut cookies: Cookies,
) -> Result<status::Accepted<JsonValue>, BadRequest<JsonValue>> {
    cookies.add_private(
        Cookie::build("password", user.password.to_string())
        .path("/")
        .max_age(Duration::days(5))
        .finish(),
    );

    return cookies.get_private("password").map(
        |_v| status::Accepted(Some(json!({"login" : "success"})))
    ).ok_or(
        BadRequest(Some(json!({"error": "you are not logged in!"})))
    )
}

#[get("/answer/<id>", format = "json")]
fn obtain_answer(
    mut cookies: Cookies,
    id: i32,
) -> Result<status::Accepted<JsonValue>, BadRequest<JsonValue>> {
    match cookies.get_private("password") {
        Some(v) => {
            if v.value() == PASSWORD && (id == 1 || id == 2) {
                //Logged in!
                Ok(status::Accepted(Some(
                    if id == 1 {
                        json!({"id": id, "answer" : "Monoxide"})
                    } else {
                        json!({"id" : id, "answer" : "Chlorine"})
                    }
                )))
            } else if v.value() != PASSWORD {
                Err(BadRequest(Some(json!({"error" : "invalid password"}))))
            } else {
                Err(BadRequest(Some(json!({"error" : "invalid id"}))))
            }
        }
        None => Err(BadRequest(Some(json!({"error" : "you are not logged in!"}))))
    }
}

#[get("/questions", format = "json")]
fn obtain_questions(
    mut cookies: Cookies,
) -> Result<status::Accepted<JsonValue>, BadRequest<JsonValue>> {
    match cookies.get_private("password") {
        Some(v) => {
            if v.value() == PASSWORD {
                Ok(status::Accepted(Some(
                    json!([
                        {"id": 1, "text": "Carbon _______ is posinous."}, 
                        {"id" : 2, "text" : "________ is commonly mixed in water at swimming pools."}, 
                    ])
                )))
            } else {
                Err(BadRequest(Some(json!({"error" : "invalid password"}))))
            }
        }
        None => Err(BadRequest(Some(json!({"error" : "you are not logged in!"}))))
    }
}

#[get("/")]
fn index() -> &'static str {
    "Chemdle Questions!"
}

#[catch(404)]
fn not_found(req: &Request) -> String {
    format!("Sorry, '{}' is not a valid path.", req.uri())
}

fn main() {
    rocket::ignite()
            .mount("/", routes![
                obtain_answer,
                obtain_questions,
                login,
                index,
            ],)
            .register(catchers![not_found])
            .launch();
}