#![feature(proc_macro_hygiene, decl_macro)]

use yew::prelude::*;

//TODO : Use Yew fetch services to extend this into a client-server app where user can interact with question/answer puzzle

#[function_component(App)]
fn app() -> Html {
    html! {
        <>
            <div class="mainContainer">
                <div class="titleContainer">
                    <h1>{"CHEMDLE"}</h1>
                </div>
                <div class="questionContainer">
                    {"Question Placeholder"}
                </div>
                <div>
                    <form class="chemdleContainer">
                        <input type="text" placeholder="Whats your guess?" id="answer"/>
                        <button type="submit" id="submitBtn">
                        {"SUBMIT"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    }
}

fn main() {
    yew::Renderer::<App>::new().render();
}