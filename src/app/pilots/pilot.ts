export interface Pilot {
    code: string,
    number: string,
    id: string,
    name: {
        first: string,
        last: string
    },
    address: string,
    airports: Array<number>,
    planes: Array<number>      
}

