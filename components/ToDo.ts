interface ToDo {
    id: number | string;
    todo: string;
    isDone: boolean;
    user_id?:number
}

export default ToDo;