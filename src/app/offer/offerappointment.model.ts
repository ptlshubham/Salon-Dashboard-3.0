export class Appointment {
    constructor(
        public index?: number,
        public id?: number,
        public servicesname?: string,
        public price?: number,
        public offerprice?: number,
        public offername?: string,
        public selectedService?: any,
        public totalprice?: number,
        public totalpoint?: number,
        public totaltime?: string,
        public isactive?: boolean,
        public percentage: number = 0,
        public lessPoints?: number,
        public tCustPoint?: number
    ) {
    }
}
