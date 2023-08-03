export class Offer {
    constructor(
        public index?: number,
        public id?: number,
        public fname?: string,
        public lname?: string,
        public contact?: string,
        public offername?: string,
        public offerprice?: number,
        public servicesname?: string,
        public percentage?: number,
        public services?: any,
        public totalprice?: number,
        public price?: number,
        public status?:Boolean,
        public offeredServices:any=[]

    ) {
    }
}
