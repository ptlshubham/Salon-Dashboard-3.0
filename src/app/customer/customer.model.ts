export class Customer {
    constructor(
        public index?: number,
        public id?: number,
        public fname?: string,
        public lname?: string,
        public email?: string,
        public contact?: string,
        public whatsapp?: string,
        public date?: Date,
        public gender?: any,
        public emp?: string,
        public createddate?: Date,
        public updateddate?: Date,
        public totalprice?: number,
        public monthlyprice?: number,
        public itemName?: string,
        public price?: number,
        public point?: number,
        public address?: string,
        public vip?: boolean,
        public otp?: number,
        public password?: any,
        public role?:any,
        public vipbonus?:any,
        public isMembership?:any

    ) {
    }
}
