import { Component, OnInit } from '@angular/core';
import { empty } from 'rxjs';
import Swal from 'sweetalert2';
import { Expenses } from './expenses.model';
import { ExpensesService } from './expenses.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { FormControl } from '@angular/forms';


pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  public ExpensesModel: any = [];
  public expensesList: Expenses[];
  public expenses: Expenses[] = [];
  public Allexpenses: Expenses[] = [];
  public expensesdate: Date;
  public expensesname: string;
  public expensesprices: number;
  public employeename: string;
  public paymenttype: string;
  apiService: any;
  public search?: Date;
  public updateExpensesModel: Expenses = new Expenses;
  dailyTotal: number = 0;
  formdate: Date = new Date();
  selectedMode: any;
  searchexpenses: boolean = false;
  searchmonth: boolean = false;
  searchyear: boolean = false;
  constructor(
    private expensesService: ExpensesService
  ) {
    this.getExpensesDetails();
    this.formdate
  }

  ngOnInit(): void {
  }


  saveExpensesDetail() {
    this.expensesService.saveExpensesList(this.ExpensesModel).subscribe((data: any) => {
      this.expensesList = data;
      this.getExpensesDetails();
    })
  }

  selectChangeHandler(event: any) {
    this.selectedMode = event.target.value;
    this.ExpensesModel.paymenttype = event.target.value;
  }

  getExpensesDetails() {

    this.expensesService.getAllExpensesList().subscribe((data: any) => {
      this.Allexpenses = data;
      this.expenses = [];
      this.dailyTotal = 0;
      const curDate = new Date();
      data.forEach(element => {
        var searchdate = new Date(curDate).getDate()
        var newdate = new Date(element.expensesdate).getDate()
        var searchmonth = new Date(curDate).getMonth()
        var newmonth = new Date(element.expensesdate).getMonth()
        var searchyear = new Date(curDate).getFullYear()
        var newyear = new Date(element.expensesdate).getFullYear()
        if (searchdate === newdate && searchmonth === newmonth && searchyear === newyear) {
          this.expenses.push(element);
          console.log(element)
          this.dailyTotal = this.dailyTotal + element.expensesprices;
        }
        for (let i = 0; i < this.expenses.length; i++) {
          this.expenses[i].index = i + 1;
        }

      })
    });
  }

  removeExpensesList(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete! If you delete Expenses then all the expenses data will be delete.",
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      confirmButtonText: 'Yes',
      buttonsStyling: false
    }).then((result) => {
      if (result.value == true) {
        this.expensesService.removeExpensesDetails(id).subscribe((req) => {
          this.apiService.showNotification('top', 'right', 'Expenses removed Successfully.', 'success');
        })
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Your Expenses has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
        this.getExpensesDetails();
      }
    })

  }

  viewExpensesDetails(data) {
    var newdates = new Date(data.expensesdate).getDate()
    var newmonth = new Date(data.expensesdate).getMonth()
    var newyear = new Date(data.expensesdate).getFullYear()
    this.updateExpensesModel = data;
    var newdate = new Date(newyear, newmonth, newdates)
    data.set(data.expensesdate = newdate)
    console.log(data, "After the view Expenses")
  }

  updateExpensesDetails() {
    console.log(this.updateExpensesModel, "updatemodel")
    this.expensesService.updateExpensesList(this.updateExpensesModel).subscribe((req) => {
      this.apiService.showNotification('top', 'right', 'Expenses Details Successfully Updated.', 'success');
    })
    this.getExpensesDetails();
  }


  searmonth() {
    this.searchexpenses = true;
    this.searchmonth = true;
    this.transform(this.formdate)
  }
  searyear() {
    this.searchexpenses = true;
    this.searchmonth = false;
    this.searchyear = true;
    this.transform(this.formdate)
  }
  backToExpenses() {
    this.searchexpenses = false;
    this.getExpensesDetails()
  }
  searchExpensesList(val) {
    this.searchexpenses = true;
    if (!val) {
      this.getExpensesDetails();
    }
    else if (val.length === 7) {
      this.searchmonth = true;
      this.transform(val);
    }
    else if (val.length === 4) {
      this.searchmonth = false;
      this.searchyear = true;
      this.transform(val);
    }
    else {
      this.searchyear = false;
      this.searchmonth = false;
      this.transform(val);
    }
  }
  transform(searchValue: Date) {
    this.expenses = [];
    this.dailyTotal = 0;
    var searchdate = new Date(searchValue).getDate()
    var searchmonth = new Date(searchValue).getUTCMonth()
    var searchyear = new Date(searchValue).getFullYear()
    this.Allexpenses.forEach(element => {
      var newdate = new Date(element.expensesdate).getDate()
      var newmonth = new Date(element.expensesdate).getMonth()
      var newyear = new Date(element.expensesdate).getFullYear()
      if (searchdate === newdate && searchmonth === newmonth && searchyear === newyear && this.searchmonth == false && this.searchyear == false) {
        this.expenses.push(element);
        this.dailyTotal = this.dailyTotal + element.expensesprices;
      }
      else if (searchmonth === newmonth && searchyear === newyear && this.searchmonth == true) {
        this.expenses.push(element);
        this.dailyTotal = this.dailyTotal + element.expensesprices;
      }
      else if (searchyear === newyear && this.searchyear == true && this.searchmonth == false) {
        this.expenses.push(element);
        this.dailyTotal = this.dailyTotal + element.expensesprices;
      }
    })
    for (let i = 0; i < this.expenses.length; i++) {
      this.expenses[i].index = i + 1;
    }
  }



  generateInvoicePDF(action = 'open') {
    var invoctype = String();
    if (this.searchmonth === true) {
      invoctype = "Monthly";
    }
    else if (this.searchyear === true) {
      invoctype = "Yearly";
    }
    else {
      invoctype = "Daily";
    }
    let docDefinition = {
      content: [
        {
          columns: [
            {
              image: 'webimg',
              fillColor: 'lightgrey',
              width: 40,
              height: 40,
              alignment: 'left',
              margin: [80, 5, 0, 10],

            },
            {
              text: 'Angrez The Salon',
              fontSize: 42,
              alignment: 'center',
              color: '#252b4f',
            }
          ]
        },
        {
          text: 'Invoice',
          style: 'sectionHeader',
          fontSize: 32,
          alignment: 'center',
          color: '#54575a',
          margin: [30, 0, 35, 10]
        },
        {
          columns: [
            [
              {
                text: `DATE: ${new Date().toLocaleString()}`,
                style: ['Bill']
              },
              {
                text: `INVOICE : ${((Math.random() * 1000).toFixed(0))}`,
                style: ['Bill']
              }
            ]
          ]
        },
        {
          text: 'Invoice Type:    Expenses ',
          alignment: 'left',
          fontSize: 14,
        },
        {
          text: 'Expenses :    ' + invoctype,
          alignment: 'left',
          fontSize: 14,
          margin: [0, 0, 0, 15]
        },
        {
          layout: 'headerLineOnly',
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto', 'auto'],
            body: [
              [{ text: 'Expenses name', style: 'tablehead' }, { text: 'Expenses Date', style: 'tablehead' }, { text: 'Employee Name', style: 'tablehead' }, { text: 'Payment Type', style: 'tablehead' }, { text: 'Expense Prices', style: 'tablehead' }],
              ...this.expenses.map(p => ([{ text: p.expensesname, style: 'tablecell' }, { text: new Date(p.expensesdate).getDate() + "/" + (new Date(p.expensesdate).getMonth() + 1) + "/" + (new Date(p.expensesdate).getFullYear()), style: 'tablecell' }, { text: p.employeename, style: 'tablecell' }, { text: p.paymenttype, style: 'tablecell' }, { text: "₹" + p.expensesprices, style: 'tablecell' }])),
              [{}, {}, { text: 'Total Entry: ', bold: true, fontSize: 14, colSpan: 2, alignment: 'right', margin: [0, 25, 0, 0] }, {}, { text: this.expenses.reduce((sum) => sum + 1, 0), bold: true, fontSize: 14, margin: [0, 25, 0, 0], alignment: 'center' }],
              [{}, {}, { text: 'Total Expenses: ', bold: true, fontSize: 18, colSpan: 2, alignment: 'right' }, {}, { text: "₹" + this.expenses.reduce((sum, p) => sum + p.expensesprices, 0), bold: true, fontSize: 18, alignment: 'center' }],

            ],
            margin: [0, 0, 0, 15]
          }
        },
      ],

      images: {
        webimg: 'https://res.cloudinary.com/dfojt5f1l/image/upload/v1654686899/media/keryar/favicon1_maqlvr.png',
      },
      styles: {
        Bill: {
          fontSize: 10,
          alignment: 'left',
          margin: [380, 0, 0, 0],
          fillColor: '#dedede',
        },
        tablehead: {
          bold: true,
          fontSize: 12,
          alignment: 'center',
        },
        tablecell: {
          margin: [0, 0, 0, 5],
          alignment: 'center',
        }
      }
    };
    pdfMake.createPdf(docDefinition).open();
    pdfMake.createPdf(docDefinition).download('Angrez_Expenses_Invoices' + `${new Date().toLocaleString()}` + '.pdf');
    // if (action === 'download') {
    //   pdfMake.createPdf(docDefinition).download();
    // } else if (action === 'print') {
    //   pdfMake.createPdf(docDefinition).print();
    // } else {
    //   pdfMake.createPdf(docDefinition).open();
    // }
  }

}
