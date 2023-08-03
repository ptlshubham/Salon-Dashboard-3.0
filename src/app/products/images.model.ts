export class ImagesModel {
    constructor(
        public id?: any,
        public productid?: any,
        public catid?: any,
        public listimages?: string,
        public multi?:any[],
        public createddate?:Date,
        public updateddate?:Date

    ) {
    }
}