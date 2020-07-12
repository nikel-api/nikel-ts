import Base from "./Base";

export class Courses extends Base {
    public endpoint = 'courses';
    constructor() { super(); }
}


function main(){
    let c = new Courses();
    c.where({code: {'$sw': 'CSCA'}})
    c.get().then(resp => console.log(JSON.stringify(resp, null, 2)))
}

main();