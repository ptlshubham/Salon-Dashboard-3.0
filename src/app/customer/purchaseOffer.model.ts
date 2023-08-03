export class purchaseOffer {
    constructor(
        public index?: number,
        public id?: number,
        public custid?: number,
        public empId?: string,
        public offerId?: number,
        public offerprice?: number,
        public payment?: string,
        public createddate?: Date,
        public updateddate?: Date,
        public appointmentId?: number,
        public totalprice?:number
    ) {

    }
}
