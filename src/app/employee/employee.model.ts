export class Employee {
    constructor(
        public index?: number,
        public id?: number,
        public fname?: string,
        public lname?: string,
        public contact?: string,
        public whatsapp?: number,
        public address?: string,
        public city?: string,
        public pincode?: string,
        public gender?: any,
        public salary?: number,
        public services?: string,
        public isactive?: boolean,
        public createddate?: Date,
        public updateddate?: Date,
        public service?: any,
        public isworking?:boolean
        // public dateofbirth?: string
    ) {
    }
}
