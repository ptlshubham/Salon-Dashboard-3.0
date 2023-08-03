import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Appointment } from 'app/customer/appointment.model';
import { Customer } from 'app/customer/customer.model';
import { CustomerComponent } from 'app/customer/customer.component';
import { CustomerService } from 'app/customer/customer.service';
import { OfferService } from 'app/offer/offer.service';
import { Payment } from 'app/customer/payment.model';
import { Employee } from 'app/employee/employee.model';
import { EmployeeService } from 'app/employee/employee.service';
import { Enquiry } from 'app/enquiry/enquiry.model';
import { EnquiryService } from 'app/enquiry/enquiry.service';
import { Services } from 'app/services/services.model';
import { ServicesService } from 'app/services/services.service';
import { Router } from '@angular/router';
import { ExpensesService } from 'app/expenses/expenses.service';
import { Membership } from 'app/membership/membership.model';
import { MembershipService } from 'app/membership/membership.service';
import { BannersService } from 'app/banners/banners.service';
import { Webbanners } from 'app/banners/banners.model';
import { ProductService } from 'app/products/products.service';
import { Order } from 'app/display-products/orderslist/order.model';
import { Purchased } from 'app/membership/purchsed-membership/purchased.model';
import ls from 'localstorage-slim';

declare const $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {


  // activePageDataChunk: any = [];
  // pageSize = 10;
  // pageSizeOptions: number[] = [10, 15, 20];
  modelPage: any;

  totalModelRecords: string;
  totalRec: string;
  totalcompletedService: string;
  totalcmRecords: string;
  totalapRecords: string;
  totalERec: string;

  page: Number = 1;
  epage: number = 1;
  mpage: Number = 1;
  cspage: Number = 1;
  cmpage: Number = 1;
  appage: Number = 1;


  public appointmentModel: Appointment = new Appointment;
  public paymentModel: Payment = new Payment;
  public paymentList: Payment[];
  public employeeReg: Employee[];
  public servicesList: Services[];
  public customerList: Customer[];
  public membershipList: Membership[];
  public offerList: Customer[];
  public dailyTotal: Customer[];
  public monthlyTotal: Customer[];
  public enquiryList: Enquiry[];
  public appointmentList: Appointment[];
  public completedAppointment: any = [];
  public orderList: Order[];
  public purchsedMembership: Purchased[];

  // activePageDataChunkComApp: any = [];
  // activePageDataChunkAppo: any = [];

  dailytotal: number = 0;
  monthlytotal: number = 0;
  adminRole: any='';
  usedServices: any[];
  totalPriceForDetails: any;
  totalPointForDetails: any;
  cContact: any;
  cEmail: any;
  cName: any;
  cPoint: any;
  cPrice: any;
  cId: any;
  appId: any;
  monthlyexpensestotal: number = 0;
  expenseTotal: number = 0;
  compateserviceslist: any;
  customerData: any[];
  totalCustExpense: number = 0;
  public Banners: Webbanners[] = [];
  topban: any = [];
  ratings: number = 0;
  isworking: boolean = false;


  constructor(
    private customercomponent: CustomerComponent,
    private servicesService: ServicesService,
    private employeeService: EmployeeService,
    private customerService: CustomerService,
    private membershipService: MembershipService,
    private offerService: OfferService,
    private enquiryService: EnquiryService,
    private expensesService: ExpensesService,
    private productService: ProductService,
    private apiService: ApiService,
    private router: Router,
    private bannersService: BannersService
  ) {
    this.adminRole = ls.get('role', { decrypt: true });

    this.getAllServices();
    this.getAllEmployee();
    this.getCustomerDetails();
    this.getPurchasedMemberList();
    this.getOfferDetails();
    this.getAllEnquiry();
    this.GetDailyTotal();
    this.GetMonthlyTotal();
    this.getAllAppointment();
    this.getAllCompletedAppointment();
    this.getExpensesDetails();
    this.GetMonthlyExpensesTotal();
    this.onlyViewCustomerDetails();
    this.getBanners();
    this.getAllOrderList();
  }
  public ngOnInit() {
  }
  getAllEmployee() {
    this.employeeService.getAllEmployeeList().subscribe((data: any) => {
      this.employeeReg = data;
      for (let i = 0; i < this.employeeReg.length; i++) {
        this.employeeReg[i].index = i + 1;
      }
    });
  }

  updateEmpProcessingActive(data) {
    let valu = {
      id: data.id,
      isworking: this.isworking = false
    }
    this.employeeService.updateEmpActiveStatus(valu).subscribe((data: any) => {
      this.getAllEmployee();
    })
  }
  updateEmpProcessingDeActive(data) {
    let valu = {
      id: data.id,
      isworking: this.isworking = true
    }
    this.employeeService.updateEmpActiveStatus(valu).subscribe((data: any) => {
      this.getAllEmployee();
    })
  }
  openEmployee() {
    this.router.navigate(['employee']);
  }
  getAllServices() {
    this.servicesService.getAllServicesList().subscribe((data: any) => {
      this.servicesList = data;
    });
  }
  getAllOrderList() {
    this.productService.getAllOrderList().subscribe((data: any) => {
      this.orderList = data;
    })
  }
  openServices() {
    this.router.navigate(['services']);
  }
  openServCustom() {
    this.router.navigate(['servicescustm']);
  }
  openCustomerService() {
    this.router.navigate(['customerservice']);
  }
  getCustomerDetails() {
    this.customerService.getAllCustomerList().subscribe((data: any) => {
      this.customerList = data;
    });
  }
  openCustomer() {
    this.router.navigate(['customer']);
  }
  // getMembershipDetails() {
  //   this.membershipService.getAllMembershipList().subscribe((data: any) => {
  //     this.membershipList = data;
  //   });
  // }
  getPurchasedMemberList() {
    this.purchsedMembership=[];
    this.membershipService.getAllMemberPurchased().subscribe((data: any) => {
      this.purchsedMembership = data;
      for (let i = 0; i < this.purchsedMembership.length; i++) {
        this.purchsedMembership[i].index = i + 1;
      }
    })
  }
  openMembership() {
    this.router.navigate(['purchsed-membership']);
  }
  getAllEnquiry() {
    this.enquiryService.getAllEnquiryList().subscribe((data: any) => {
      this.enquiryList = data;
      // this.activePageDataChunk = this.enquiryList.slice(0, this.pageSize);
      for (let i = 0; i < this.enquiryList.length; i++) {
        this.enquiryList[i].index = i + 1;
      }
    })
  }
  // setPageSizeOptions(setPageSizeOptionsInput: string) {

  //   this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  // }
  // onPageChangedEnquiry(e) {
  //   let firstCut = e.pageIndex * e.pageSize;
  //   let secondCut = firstCut + e.pageSize;
  //   this.activePageDataChunk = this.enquiryList.slice(firstCut, secondCut);
  // }

  openExpenses() {
    this.router.navigate(['expenses']);
  }
  getExpensesDetails() {
    this.expensesService.getAllExpensesList().subscribe((data: any) => {
      const curDate = new Date(); data.forEach(element => {
        var searchdate = new Date(curDate).getDate()
        var newdate = new Date(element.expensesdate).getDate()
        var searchmonth = new Date(curDate).getMonth()
        var newmonth = new Date(element.expensesdate).getMonth()
        var searchyear = new Date(curDate).getFullYear()
        var newyear = new Date(element.expensesdate).getFullYear()
        if (searchdate === newdate && searchmonth === newmonth && searchyear === newyear) {
          this.expenseTotal = this.expenseTotal + element.expensesprices;
        }
      })
    })
  }
  GetMonthlyExpensesTotal() {
    this.monthlyexpensestotal = 0;
    this.expensesService.getMonthlyExpensesList().subscribe((data: any) => {
      data.forEach(element => {
        if ((element.expensesdate != undefined)) {
          this.monthlyexpensestotal = this.monthlyexpensestotal + element.expensesprices;
        }
      })
    })
  }


  openEniquiry() {
    this.router.navigate(['enquiry']);
  }
  openOffer() {
    this.router.navigate(['offer']);
  }
  openPendingOrder() {
    this.router.navigate(['orderslist']);

  }
  getOfferDetails() {
    this.offerService.getAllOfferList().subscribe((data: any) => {
      this.offerList = data;
    });
  }
  openDaily() {
    this.router.navigate(['reports'], {
      queryParams: {
        id: 'daily'
      }
    });
  }
  openMonthly() {
    this.router.navigate(['reports'], {
      queryParams: {
        id: 'month'
      }
    });

  }
  GetDailyTotal() {
    this.dailytotal = 0;
    this.customerService.getDailyTotalList().subscribe((data: any) => {
      this.dailyTotal = data;

      this.dailyTotal.forEach(element => {
        if ((element.totalprice != undefined)) {
          this.dailytotal = this.dailytotal + element.totalprice;
        }
      })
    })
  }
  GetMonthlyTotal() {
    this.monthlytotal = 0;
    this.customerService.getMonthlyTotalList().subscribe((data: any) => {
      this.monthlyTotal = data;
      this.monthlyTotal.forEach(element => {
        if ((element.totalprice != undefined)) {
          this.monthlytotal = this.monthlytotal + element.totalprice;
        }
      })
    })
  }
  getAllAppointment() {
    this.customerService.getAllAppointmentList().subscribe((data: any) => {
      this.appointmentList = data;
      // this.activePageDataChunkAppo = this.appointmentList.slice(0, this.pageSize);
      for (let i = 0; i < this.appointmentList.length; i++) {
        this.appointmentList[i].index = i + 1;
        this.customerService.getServicesListUsingId(data[i].id).subscribe((data: any) => {
          this.usedServices = data;
          for (let i = 0; i < this.usedServices.length; i++) {
            this.usedServices[i].index = i + 1;
          }
        });
      }
    });

  }
  // onPageChangedAppoi(e) {
  //   let firstCut = e.pageIndex * e.pageSize;
  //   let secondCut = firstCut + e.pageSize;
  //   this.activePageDataChunkAppo = this.enquiryList.slice(firstCut, secondCut);
  // }
  getAllCompletedAppointment() {
    this.customerService.getCompletedServices().subscribe((data: any) => {
      this.completedAppointment = data;
      // this.activePageDataChunkComApp = this.completedAppointment.slice(0, this.pageSize);
      for (let i = 0; i < this.completedAppointment.length; i++) {
        this.completedAppointment[i].index = i + 1;
      }
    });
  }
  // onPageChangedComAp(e) {
  //   let firstCut = e.pageIndex * e.pageSize;
  //   let secondCut = firstCut + e.pageSize;
  //   this.activePageDataChunkComApp = this.enquiryList.slice(firstCut, secondCut);
  // }
  modeOfPayment(obj) {
    this.cContact = obj.contact;
    this.cEmail = obj.email;
    this.cName = obj.fname + ' ' + obj.lname;
    this.cPoint = obj.totalpoint;
    this.cPrice = obj.totalprice;
    this.cId = obj.custid;
    this.appId = obj.id;
  }
  saveModeOfPaymentDetails(val) {

    if (val == 'Cash') {
      this.paymentModel.modeofpayment = 'Cash';
    }
    else if (val == 'GPay') {
      this.paymentModel.modeofpayment = 'GPay';
    }
    else {
      this.paymentModel.modeofpayment = 'Account';
    }
    this.paymentModel.cname = this.cName;
    this.paymentModel.tpoint = this.cPoint;
    this.paymentModel.tprice = this.cPrice;
    this.paymentModel.cid = this.cId;
    this.paymentModel.appointmentid = this.appId;
    this.customerService.savePaymentDetails(this.paymentModel).subscribe((data: any) => {
      this.paymentList = data;
      if (data == 'success') {
        this.paymentCompleted(this.appId);
        this.apiService.showNotification('top', 'right', 'Payment accepted Successfully.', 'success');
      }
      else {
        this.apiService.showNotification('top', 'right', 'Payment Failed Please Resubmit.', 'danger');
      }
    });
  }

  paymentCompleted(id) {
    this.appointmentModel.id = id;
    this.appointmentModel.isactive = false;
    this.customerService.updateActiveStatusList(this.appointmentModel).subscribe((req) => {
      this.getAllAppointment();
      this.getAllCompletedAppointment();
      this.GetDailyTotal();
      this.GetMonthlyTotal();
    })
  }
  openUsedServiceList(obj) {
    this.totalPriceForDetails = obj.totalprice
    this.totalPointForDetails = obj.totalpoint
    this.customerService.getServicesListUsingId(obj.id).subscribe((data: any) => {
      this.usedServices = data;
      for (let i = 0; i < this.usedServices.length; i++) {
        this.usedServices[i].index = i + 1;
      }
    });
  }
  onlyViewCustomerDetails() {
    this.customerService.getCustomerById(   ls.get('UserId', { decrypt: true })).subscribe((data: any) => {
      this.customerData = data;
      this.customerData.forEach(element => {
        this.totalCustExpense = this.totalCustExpense + element.totalprice;
      });
      for (let i = 0; i < this.customerData.length; i++) {
        this.customerData[i].index = i + 1;
      }
    });
  }

  generatepdf() {
    this.customercomponent.generateInvoicePDF(this.appointmentList[0], this.usedServices);
  }

  generatecompateappoinmentpdf(data) {
    this.customerService.getServicesListUsingId(data.id).subscribe((data1: any) => {
      this.usedServices = data1;
      for (let i = 0; i < this.usedServices.length; i++) {
        this.usedServices[i].index = i + 1;
      }
      console.log(this.usedServices, "in generate")
      this.customercomponent.generateInvoicePDF(data, this.usedServices);
    });
  }
  getBanners() {
    this.bannersService.getWebSlider().subscribe((data: any) => {
      this.Banners = data;

      this.Banners.forEach(element => {
        if (element.name == 'Top') {
          this.topban.push(element);
        }
      })

    });
  }
  submitServiceRating(data) {
    this.customerService.saveRatingsDetailsById(data).subscribe((data1: any) => {
      if (data1 = 'success') {
        this.apiService.showNotification('top', 'right', 'Ratings saved Successfully.', 'success');
      }
    });
  }
}
