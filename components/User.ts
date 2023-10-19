import ToDo from "./ToDo";

export type User = {
    first_name: string;
    last_name: string;
    id?: number;
    email: string;
    todos: ToDo[];
    // weddings?:[];
}