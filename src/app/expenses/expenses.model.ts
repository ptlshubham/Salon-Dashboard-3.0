export class Expenses {
    constructor(
        public index?: number,
        public id?: number,
        public expensesdate ?: Date,
        public expensesname?: string,
        public expensesprices?: number,
        public employeename?: string,
        public paymenttype?: string,
    ) {
    }
}
