// types and how to declare

// string
let type:string;
type = "grace"

// number
let num:number;
num=27

// bool
let isTired:boolean;
isTired=true

// array
let weekdays: string[];
weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday"]

// tuple
let grace: [number, string]

// objects

type Todo = {
    name: string;
    priority: boolean;
    num: number
}

let todo:Todo = {
    name: "vacuum",
    priority: true,
    num:2
}

// array of objects
let lotsOfTodos: Todo[]