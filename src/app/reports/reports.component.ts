import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'app/customer/customer.service';
import { Payment } from 'app/customer/payment.model';
import { iif } from 'rxjs';
import { elementAt } from 'rxjs-compat/operator/elementAt';
declare var require: any
declare var $: any;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  public paymentList: Payment[];
  public monthlyPList: Payment[];

  mop: any = []
  selectedMop: any;
  mopList: any = [];
  monthlyList: any = [];
  reportType: any;
  openReports: boolean = false;
  monthlyTotal: any = 0;
  dailyTotal: any = 0;
  model: Date;
  model2: Date;
  selected: any;
  constructor(
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.queryParams.subscribe((res: any) => {
      this.reportType = res.id;
      if (this.reportType == 'month') {
        this.openReports = true;
      }
    })
    this.getAllPaymentDetails();
    this.getAllMonthlyDetails();

    this.mop = [
      {
        name: 'All'
      },
      {
        name: 'Cash'
      },
      {
        name: 'GPay',
      },
      {
        name: 'Account',
      },

    ]
  }

  ngOnInit(): void {
    this.selectedMop = 'All';
    this.model = new Date();
    this.model2 = new Date();
    if ($(".datetimepicker").length != 0) {
      $('.datetimepicker').datetimepicker({
        icons: {
          time: "fa fa-clock-o",
          date: "fa fa-calendar",
          up: "fa fa-chevron-up",
          down: "fa fa-chevron-down",
          previous: 'fa fa-chevron-left',
          next: 'fa fa-chevron-right',
          today: 'fa fa-screenshot',
          clear: 'fa fa-trash',
          close: 'fa fa-remove'
        },
        debug: true
      });
    }

    if ($(".datepicker").length != 0) {
      $('.datepicker').datetimepicker({
        format: 'MM/DD/YYYY',
        icons: {
          time: "fa fa-clock-o",
          date: "fa fa-calendar",
          up: "fa fa-chevron-up",
          down: "fa fa-chevron-down",
          previous: 'fa fa-chevron-left',
          next: 'fa fa-chevron-right',
          today: 'fa fa-screenshot',
          clear: 'fa fa-trash',
          close: 'fa fa-remove'
        },
        debug: true
      });
    }

    if ($(".timepicker").length != 0) {

      $('.timepicker').datetimepicker({
        //          format: 'H:mm',    // use this format if you want the 24hours timepicker
        format: 'h:mm A', //use this format if you want the 12hours timpiecker with AM/PM toggle
        icons: {
          time: "fa fa-clock-o",
          date: "fa fa-calendar",
          up: "fa fa-chevron-up",
          down: "fa fa-chevron-down",
          previous: 'fa fa-chevron-left',
          next: 'fa fa-chevron-right',
          today: 'fa fa-screenshot',
          clear: 'fa fa-trash',
          close: 'fa fa-remove'
        },
        debug: true
      });
    }
  }
  onDateSelected(event: any) {
    this.selected = event;
    this.selectedDateForMonthly();
  }

  getAllPaymentDetails() {
    this.customerService.getPaymentDetails().subscribe((data: any) => {
      this.paymentList = data;
      this.paymentList.forEach(element => {
        if (element.tprice) {
          this.dailyTotal = this.dailyTotal + element.tprice;
        }
      })
      this.mopList = data;
      for (let i = 0; i < this.paymentList.length; i++) {
        this.paymentList[i].index = i + 1;
      }
    })
  }

  selectModeOfPayment(name) {
    this.mop.forEach(element => {
      if (element.name == name) {
        this.selectedMop = element.name;
        this.viewSelectedMop();
      }
    })

  }
  viewSelectedMop() {
    this.mopList = [];
    this.dailyTotal = 0;
    this.paymentList.forEach(element => {
      if (element.modeofpayment == this.selectedMop) {
        this.mopList.push(element);
        this.dailyTotal = this.dailyTotal + element.tprice;
      }
      else if (this.selectedMop == 'All') {
        this.mopList = this.paymentList;
        this.dailyTotal = this.dailyTotal + element.tprice;
      }

    })
  }

  getAllMonthlyDetails() {
    let today = new Date();
    let mm = today.getMonth(); 
    let yyyy = today.getFullYear();
     
    this.customerService.getMonthlyDetails().subscribe((data: any) => {
      this.monthlyPList = data;
      this.monthlyPList.forEach(element => {
        let mnth = new Date(element.pdate).getMonth();
        let year = new Date(element.pdate).getFullYear();
         
        if (mnth + 1 === mm + 1 && year === yyyy) {
           
          this.monthlyList.push(element);
          this.monthlyTotal = this.monthlyTotal + element.tprice;
        }
      })
    })
  }
  selectedDateForMonthly() {
    this.monthlyList = [];
    this.monthlyTotal = 0;
    this.monthlyPList.forEach(element => {
      let mnth = new Date(element.pdate).getMonth();
      let year = new Date(element.pdate).getFullYear();
       
      if (mnth + 1 === this.selected.month && year === this.selected.year) {
        this.monthlyList.push(element);
        this.monthlyTotal = this.monthlyTotal + element.tprice;
      }
    })
  }


}
