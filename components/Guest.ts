type Guest = {
    id?:number,
    first_name: string,
    last_name:string,
    user_id?: number,
    isAttending?: boolean,
}

export default Guest;