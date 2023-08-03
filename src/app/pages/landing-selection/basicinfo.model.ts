export class BasicInfo {
    constructor(
        public index?: number,
        public id?: number,
        public salonname?: string,
        public password?:string,
        public contact?: string,
        public address?: string,
        public city?: string,
        public pincode?: string,
        public isactive?: boolean,
        public createddate?: Date,
        public updateddate?: Date,
    ) {
    }
}
