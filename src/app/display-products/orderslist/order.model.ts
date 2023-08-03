export class Order {
    index: number;
    constructor(
        public id?: number,
        public userid?: number,
        public productid?: number,
        public quantity?: number,
        public price?: number,
        public total?: number,
        public createddate?: Date,
        public updateddate?: Date,
        public orderdate?: Date,
        public isactive?: boolean
    ) { }
}