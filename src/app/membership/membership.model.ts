export class Membership {
    constructor(
        public index?: number,
        public id?: number,
        public fname?: string,
        public lname?: string,
        public contact?: string,
        public membershipname?: string,
        public membershipprice?: number,
        public membershipdiscount?: number,
        public servicesname?: string,
        public percentage?: number,
        public services?: any,
        public totalprice?: number,
        public price?: number,
        public quantity?: number,
        public finalprice?: number,
    ) {
    }
}