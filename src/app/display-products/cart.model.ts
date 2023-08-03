export class Cart {
    index: number;
    constructor(
        public id?: number,
        public userid?: number,
        public productid?: number,
        public quantity?: number,
        public createddate?: Date,
        public updateddate?: Date,
        public images?: string,
        public productlist: any = [],
        public totalprice?:number,
        public uid?:number
    ) { }
}