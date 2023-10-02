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

// TYPE vs INTERFACE :
// they work the same. the difference is that types can be extended like this: 
type A= {
    a: number;
    b: number;
}
type B = A & {
    c:string;
    d:string;
}
// this needs the params of both A and B because B is extending A so it includes all of A's params as well.
let b:B = {
    a:4,
    b:5,
    c:"hi",
    d:"hello"
}

// TO extend the interface, we do this:

interface greeting {
    greet:string
}
interface wave extends greeting {
    isWaving: boolean
}
let goodmorning:wave = {
    greet:"hello",
    isWaving: true,
}


// array of objects
let lotsOfTodos: Todo[]

//Q: what if a want a variable to be able to be more than one type?
// A: use the union symbol: "|"
let tableNumber: string | number;
tableNumber="six"
tableNumber=6

// function types
//  => this will work fine, but there is a better way that will avoid more errors.
let printName: Function;

// => this is the better way!!
let logName: (name:string) => void;
//      (declare param type) => declare return type;


 