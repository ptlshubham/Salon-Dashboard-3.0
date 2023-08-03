export class Payment {
    constructor(
        public id?: number,
        public cid?: number,
        public appointmentid?: string,
        public cname?: string,
        public modeofpayment?: string,
        public tprice?: bigint,
        public tpoint?: number,
        public createddate?: Date,
        public pdate?: Date,
        public index?: number
    ) {
    }
}