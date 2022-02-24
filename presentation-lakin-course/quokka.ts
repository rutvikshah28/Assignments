import fetch from 'node-fetch';

const comments = async() => {
    return await fetch("https://jsonplaceholder.typicode.com/posts/1", undefined).then(results => results.json()).then(json => console.log(json));
}

const posts = async() => {
    return await fetch("https://jsonplaceholder.typicode.com/posts/1", undefined).then(results => results.json()).then(json => console.log(json));
}

const todos = async() => {
    return await fetch("https://jsonplaceholder.typicode.com/todos/1", undefined).then(results => results.json()).then(json => console.log(json));
}

const users = async() => {
    return await fetch("https://jsonplaceholder.typicode.com/users", undefined).then(results => results.json()).then(json => console.log(json));
}

const albums = async() => {
    return await fetch("https://jsonplaceholder.typicode.com/albums", undefined).then(results => results.json()).then(json => console.log(json));
}

console.log(comments())
console.log(posts());
console.log(todos());
console.log(users());
console.log(albums());