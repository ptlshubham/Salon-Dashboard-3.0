export class Purchased {
    constructor(
        public id?: number,
        public cid?: number,
        public memid?: number,
        public serid?: number,
        public sname?: string,
        public quntity?: number,
        public tprice?: number,
        public discount?: number,
        public dprice?: number,
        public isactive?: boolean,
        public createddate?: Date,
        public updateddate?: Date,
        public index?: number,
        public services: any = []
    ) {
    }
}