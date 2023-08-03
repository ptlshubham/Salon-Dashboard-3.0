export class CustomerAppointment {
    constructor(
        public index?: number,
        public id?: number,
        public custid?: any,
        public emp?: string,
        public selectedService?: any,
        public totalprice?: bigint,
        public totalpoint?: number,
        public totaltime?: string,
        public isactive?: boolean,
        public createddate?: Date,
        public updateddate?: Date,
        public selectdate?: Date,
        public redeempoints: number = 0,
        public lessPoints?: number,
        public tCustPoint?: number,
        public fname?: string,
        public lname?: string,
        public email?: string,
        public contact?: string,
        public whatsapp?: string,
        public gender?: any,
    ) {
    }
}