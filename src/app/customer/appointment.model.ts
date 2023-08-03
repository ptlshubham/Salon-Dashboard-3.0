export class Appointment {
    constructor(
        public index?: number,
        public id?: number,
        public custid?: number,
        public emp?: string,
        public selectedService?: any,
        public totalprice?: bigint,
        public totalpoint?: number,
        public totaltime?: string,
        public isactive?: boolean,
        public createddate?: Date,
        public updateddate?: Date,
        public redeempoints: number = 0,
        public lessPoints?: number,
        public tCustPoint?: number,
        public offerId?:number,
        public ratings?:number,
        public bookingdate?:Date,
        public timeSlot?:string
    ) {

    }
}
