type Guest = {
    id:number | string,
    first_name: string,
    last_name:string,
    wedding_id?: number,
    isAttending?: boolean,
}

export default Guest;