import Base from "./Base";

class Courses extends Base {
    public endpoint_callback = () => { throw new Error("Not implemented!") };

    constructor() { super(); }
}


function main(){
    let c = new Courses();
    console.log(c);
}

main();