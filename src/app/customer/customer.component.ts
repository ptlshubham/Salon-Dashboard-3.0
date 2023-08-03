import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Employee } from 'app/employee/employee.model';
import { EmployeeService } from 'app/employee/employee.service';
import { Services } from 'app/services/services.model';
import { ServicesService } from 'app/services/services.service';
import { Appointment } from './appointment.model';
import { Customer } from './customer.model';
import { CustomerService } from './customer.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Offer } from 'app/offer/offer.model';
import { OfferService } from 'app/offer/offer.service';
import { purchaseOffer } from './purchaseOffer.model';
import { MembershipService } from 'app/membership/membership.service';
import { ThemePalette } from '@angular/material/core';
import { FormControl, Validators } from '@angular/forms';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  public customerModel: Customer = new Customer;
  public appointmentModel: Appointment = new Appointment
  public appointment: Appointment[];
  public appointmentList: Appointment[];
  public pur_off: purchaseOffer = new purchaseOffer;
  public customer: any;
  public customerList: Customer[];
  employeename: any;
  empId: any;
  servicesname: any;
  servId: any;
  public employeeReg: Employee[];
  public servicesList: Services[];
  serviceData: any = [];
  search: string = '';
  totalPrice: any = 0;
  totalPoint: any = 0;
  totalCustomerPoint: any = 0;
  totalTime: any = 0;
  custAppointment: boolean = false;
  selectCustomer: boolean = false;
  viewCustomerAllData: boolean = false;
  selectedCustId: any;
  totalCustPoint: any[];
  tCustPoint: any = 0;
  customerData: any[];
  usedServices: any[];
  totalRecords: string;
  vip: boolean;
  totalModelRecords: string;
  page: Number = 1;
  modelPage: number = 1;
  totalPriceForDetails: any;
  totalPointForDetails: any;
  addService: any = [];
  valu: 0;
  isDashboard: boolean = false;
  vipbonus: any = 0;
  public offerList: Offer[];
  selectedOffer: any;
  offerId: any;
  selctedPer: any;
  offerData: any[];
  offerPrice: bigint;
  offerEmpId: any;
  selectedOfferEmpName: any;
  membersActive: boolean;
  activeMembership: any = [];
  usedSer: any;
  formdate: Date = new Date();
  bookingTimeInterval: any = [];
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  timeSl: any;
  timeControl = new FormControl(null, Validators.required);
  constructor(
    private servicesService: ServicesService,
    private employeeService: EmployeeService,
    private customerService: CustomerService,
    private apiService: ApiService,
    private router: Router,
    private offerService: OfferService,
  ) {

    this.getAllEmployee();
    this.getAllServices();
    this.getCustomerDetails();
    this.getOfferDetails();
    if (this.router.routerState.snapshot.url === '/dashboard') {
      this.isDashboard = true;
    }
  }

  ngOnInit(): void {
    this.addService = [
      {
        time: null,
        serpoint: null,
        price: null,
        name1: this.valu,
        servicesname: '',
        employeename: '',
        selectedServid: null,
        selectedEmpid: null
      }]
    this.valu++;
    this.vip;
  }
  getTimeIntervalJson() {
    this.customerService.getBookingTimeInterval().subscribe((data: any) => {
      this.bookingTimeInterval = data;
    })
  }
  addServiceList() {

    this.valu++;
    this.addService.push({ time: null, serpoint: null, price: null, name1: this.valu, servicesname: '', employeename: '', selectedServid: null, selectedEmpid: null });
  }
  removeServiceList(valu) {
    this.addService.splice(valu, 1);
    this.addPoinInList();
  }

  getAllEmployee() {
    this.employeeService.getAllEmployeeList().subscribe((data: any) => {
      this.employeeReg = data;
    });
  }
  selectEmpForOffer(id) {
    this.offerEmpId = id;
    this.employeeReg.forEach(element => {
      if (element.id == id) {
        this.selectedOfferEmpName = element.fname + ' ' + element.lname;
      }
    })
  }
  selectEmpList(id, ind) {
    this.empId = id;
    this.employeeReg.forEach(element => {
      if (element.id == id) {
        this.addService[ind].employeename = element.fname + ' ' + element.lname;
        this.addService[ind].selectedEmpid = id;
      }
    })
  }

  getAllServices() {
    this.servicesService.getAllServicesList().subscribe((data: any) => {
      this.servicesList = data;
    });
  }
  selectServiceList(id, ind) {
    this.servId = id;
    this.servicesList.forEach(element => {
      if (element.id == id) {
        this.addService[ind].servicesname = element.name;
        this.addService[ind].selectedServid = id;
        this.addService[ind].price = element.price;
        this.addService[ind].serpoint = element.point;
        this.addService[ind].time = element.time;
        for (let i = 0; i < this.addService.length; i++) {
          this.addService[i].index = i + 1;
        }
        this.addPoinInList();
      }

    })
  }
  addPoinInList() {

    this.totalPoint = 0;
    // this.totalPrice = 0;
    this.totalTime = 0;
    this.vipbonus = 0;
    this.addService.forEach(element => {
      if (element.price != undefined) {
        this.totalPrice = this.totalPrice + element.price;
      }
      if (element.serpoint != undefined) {
        this.totalPoint = this.totalPoint + element.serpoint;

      }
      if (element.time != undefined) {
        this.totalTime = this.totalTime + element.time;
      }
    });
    if (this.selectedOffer && this.addService.length == 0) {
      this.totalPrice = 0;
      this.totalPrice = this.offerPrice;
    }
  }

  removeItem(i) {
    this.addService.splice(i, 1);
    this.addPoinInList();
  }

  saveCustomerDetail() {
    this.customerService.saveCustomerList(this.customerModel).subscribe((data: any) => {
      this.customerList = data;
      this.apiService.showNotification('top', 'right', 'Customer Added Successfully.', 'success');
      this.getCustomerDetails();
      location.reload();
    })
  }

  getCustomerDetails() {
    this.customerService.getAllCustomerList().subscribe((data: any) => {
      this.customerList = data;
      this.customer = data;
      for (let i = 0; i < this.customer.length; i++) {
        this.customer[i].index = i + 1;
      }
    });
  }
  searchCustomerList(val) {
    if (this.search == '') {
      this.customer = this.customerList;
    } else {
      this.transform(this.customerList, val);
    }

  }
  transform(customer: Customer[], searchValue: string) {

    this.customer = [];
    customer.forEach(element => {
      if (element.contact.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
        this.customer.push(element);
      }
      else if (element.whatsapp.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
        this.customer.push(element);
      }
      else if (element.fname.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
        this.customer.push(element);
      }
      else if (element.lname.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
        this.customer.push(element);
      }
    })
  }
  backToCustomer() {
    this.custAppointment = false;
    this.selectCustomer = false;
  }
  getCustomerPoints() {
    this.customerService.getCustAllPoint(this.selectedCustId).subscribe((data: any) => {
      this.totalCustPoint = data;
      this.tCustPoint = 0;
      this.totalCustPoint.forEach(element => {
        if (element.totalcustpoint != undefined) {
          this.tCustPoint = element.totalcustpoint;
        }
      });
    });
  }
  viewMembershipDetails() {
    let data = {
      id: this.selectedCustId
    }
    this.customerService.getActivatedMembershipDetail(data).subscribe((data: any) => {
      this.activeMembership = data;

      for (let i = 0; i < this.activeMembership.length; i++) {
        this.activeMembership[i].index = i + 1;
      }
    })
  }
  seletedCustomerDetails(data) {

    this.membersActive = data.ismembership
    this.selectedCustId = data.id;
    this.customerModel = data;
    this.appointmentModel = data;
    this.custAppointment = true;
    this.selectCustomer = true;
    this.getCustomerPoints();
    this.getTimeIntervalJson();
    this.appointmentModel.redeempoints = 0;
    this.viewMembershipDetails();
  }
  bookingTimeSelcted(id) {
    this.bookingTimeInterval.forEach(element => {
      if (element.id == id) {
        this.timeSl = element.time
      }
    });
    // this.appointmentModel.timeSlot = this.timeSl;
  }
  saveAppointmentDetails() {
    this.appointmentModel.lessPoints = 0;
    this.appointmentModel.totalpoint = this.totalPoint;
    this.appointmentModel.tCustPoint = this.tCustPoint;
    this.appointmentModel.lessPoints = this.tCustPoint - this.appointmentModel.redeempoints;
    this.appointmentModel.lessPoints = this.appointmentModel.lessPoints + this.appointmentModel.totalpoint;
    this.appointmentModel.selectedService = this.addService;
    this.appointmentModel.emp = this.employeename;
    this.appointmentModel.totalprice = this.totalPrice;
    this.appointmentModel.totalpoint = this.totalPoint;
    this.appointmentModel.totaltime = this.totalTime;
    this.appointmentModel.isactive = true;
    this.appointmentModel.custid = this.appointmentModel.id;
    this.appointmentModel.timeSlot = this.timeSl;
    
    if (this.appointmentModel.redeempoints > this.appointmentModel.tCustPoint) {
      this.apiService.showNotification('top', 'right', 'You can not redeem point more than total point.', 'danger');
    }
    else if (this.selectedOffer) {
      this.pur_off.totalprice = this.totalPrice;
      this.pur_off.empId = this.offerEmpId;
      this.appointmentModel.offerId = this.offerId;
      this.customerService.saveAppointmentList(this.appointmentModel).subscribe((data: any) => {
        this.pur_off.appointmentId = data.insertId;

        this.customerService.savePurchasedOrder(this.pur_off).subscribe((res: any) => {

          if (res == 'success') {
            this.router.navigate(['dashboard']);
            location.reload();
            this.apiService.showNotification('top', 'right', 'Appointment Successfully Booked.', 'success');
          } else {
            this.apiService.showNotification('top', 'right', 'Error in booking appointment.', 'danger');
          }

        });

      })
    }
    else {
      this.customerService.saveAppointmentList(this.appointmentModel).subscribe((data: any) => {
        this.appointment = data;
        this.router.navigate(['dashboard']);
        location.reload();
        this.apiService.showNotification('top', 'right', 'Appointment Successfully Booked.', 'success');
      })
    }


  }
  getOfferDetails() {

    this.offerService.getAllOfferList().subscribe((data: any) => {
      this.offerList = data;
    });
  }
  selectOfferList(id) {
    this.offerId = id;
    this.offerList.forEach(element => {
      if (element.id == id) {
        this.selectedOffer = element.offername;
        this.selctedPer = element.percentage
        this.pur_off.offerId = id;
        this.pur_off.empId = this.empId;
        this.pur_off.custid = this.appointmentModel.id;
        this.pur_off.offerprice = element.offerprice;
        this.onlyViewOfferDetails();

      }
    })
  }
  onlyViewOfferDetails() {
    this.offerService.getAllOfferDataList(this.offerId).subscribe((data: any) => {
      this.offerData = data;
      this.offerData.forEach(element => {
        this.offerPrice = element.offerprice;
      });
      this.totalPrice = this.totalPrice + this.offerPrice;
      for (let i = 0; i < this.offerData.length; i++) {
        this.offerData[i].index = i + 1;
      }
    });
  }

  generateInvoicePDF(customer, service) {
    console.log(customer, service)
    let docDefinition = {
      pageSize: 'A5',
      footer: function (currentPage, pageCount) {
        return { text: "Page " + currentPage.toString() + ' of ' + pageCount, alignment: 'center', fontSize: 10, margin: [0, 20, 0, 0] }
      },
      info: {
        title: 'Angrez the salon'
      },
      content: [
        {
          columns: [
            {
              image: 'webimg',
              width: 140,
              height: 60,
              alignment: 'left',
              margin: [0, 0, 0, 10],
              color: 'black',
            },
            [
              {
                text: 'Invoice:   Billing',
                bold: true,
                style: 'companydetail'
              },
              {
                text: 'Address:   14-Commerce Complex',
                style: 'companydetail'
              },
              {
                text: 'City: Anand,  State: Gujarat',
                style: 'companydetail'
              },
              {
                text: 'Contact No: +91 942-731-8581',
                style: 'companydetail'
              },

            ]

          ],

        },
        {
          text: ' ',
          margin: [0, 10, 0, 0]
        },
        {
          text: 'Bill to,',
          alignment: 'left',
          margin: [0, 10, 0, 10]
        },
        {
          columns: [
            [
              { text: ('Customer Name:  ' + customer.fname + '  ' + customer.lname), bold: true, style: 'customerdetail' },
              { text: 'Gender:  ' + customer.gender, style: 'customerdetail' },
              { text: 'Email:  ' + customer.email, style: 'customerdetail' },
              { text: 'Contact Number:  ' + customer.contact, style: 'customerdetail' },
            ],
            [,
              {
                text: `Invoice:  ${((Math.random() * 1000).toFixed(0))}`,
                alignment: 'right',
                style: 'customerdetail'
              },
              {
                text: `Date:  ${new Date().toLocaleString()}`,
                alignment: 'right',
                style: 'customerdetail'
              },
            ]
          ]
        },
        {
          text: ' ',
          margin: [0, 10, 0, 0]
        },
        {
          layout: 'headerLineOnly',
          table: {
            headerRows: 1,
            widths: ['auto', '*', '*', 'auto', 'auto'],
            body: [
              [{ text: 'ITEMS', style: 'tablehead' }, { text: 'SERVICE', style: 'tablehead' }, { text: 'EMPLOYEE', style: 'tablehead' }, { text: 'TIME', style: 'tablehead' }, { text: 'PRICE', style: 'tablehead' }],
              ...service.map(p => ([{ text: p.index, style: 'tablecell' }, { text: p.servicesname, style: 'tablecell' }, { text: p.employeename, style: 'tablecell' }, { text: p.time + " min", style: 'tablecell' }, { text: "₹" + p.price, style: 'tablecell' }])),
            ]
          }
        },
        {
          columns: [
            [
              { text: 'Terms & Conditions', fontSize: 10, margin: [0, 50, 0, 0] },
              { text: '*  Order can be return in max 10 days.', fontSize: 10, margin: [0, 10, 0, 0] },
              { text: '*  This is system generated invoice.', fontSize: 10 },
              // { text: '*  Warrenty of the product will be subject to the \t manufacturer terms and conditions.',fontSize: 10},

            ],
            [
              { text: 'TOTAL', alignment: 'right', fontSize: 10, margin: [0, 50, 0, 0] },
              { text: "₹" + service.reduce((sum, p) => sum + p.price, 0), alignment: 'right', fontSize: 28 }
            ]
          ]
        },
      ],

      images: {
        webimg: 'https://res.cloudinary.com/dfojt5f1l/image/upload/v1654778945/media/keryar/output-onlinepngtools_vysa26.png',
      },
      styles:
      {
        customerdetail: {
          margin: [0, 0, 0, 5],
          fontSize: 10
        },
        companydetail: {
          alignment: 'left',
          margin: [30, 0, 0, 5],
          fontSize: 10
        },
        tablehead: {
          bold: true,
          fontSize: 10,
          alignment: 'center',
        },
        tablecell: {
          margin: [0, 0, 0, 5],
          fontSize: 10,
          alignment: 'center',
        }
      }
    };
    pdfMake.createPdf(docDefinition).open();
    pdfMake.createPdf(docDefinition).download('Angrez_Bill_' + `${new Date().toLocaleString()}` + '.pdf');
    // if (action === 'download') {

    // } else if (action === 'print') {
    //   pdfMake.createPdf(docDefinition).print();
    // } else {
    //   pdfMake.createPdf(docDefinition).open();
    // }
  }
  viewCustomerDetails(data) {
    this.totalCustomerPoint = 0;
    this.customerModel = data;
    this.customerService.getViewAppointment(data).subscribe((data1: any) => {
      this.appointment = data1;
      this.appointment.forEach(element => {
        if (element.totalpoint != undefined) {
          this.totalCustomerPoint = this.totalCustomerPoint + element.totalpoint;
        }
      });
    });
  }
  updateCustomerDetails() {
    this.customerModel.vip;

    this.customerService.updateCustomerList(this.customerModel).subscribe((req) => {
      this.getCustomerDetails();
      this.apiService.showNotification('top', 'right', 'Customer Details Successfully Updated.', 'success');
    })
  }
  updateVipTag() {
    let data = {
      id: this.customerModel.id,
      vip: this.customerModel.vip
    }
    this.customerService.updateCustomerList(data).subscribe((req) => {
      this.getCustomerDetails();
      this.apiService.showNotification('top', 'right', 'Customer Details Successfully Updated.', 'success');
    })
  }
  removeCustomerList(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete! If you delete Customer then all the customer data will be delete.",
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
        this.customerService.removeCustomerDetails(id).subscribe((req) => {
          this.apiService.showNotification('top', 'right', 'Customer removed Successfully.', 'success');


        })
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Your Customer has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
        this.getCustomerDetails();
      }
    })

  }
  onlyViewCustomerDetails(id) {
    this.selectCustomer = true;
    this.custAppointment = false;
    this.viewCustomerAllData = true;
    this.customerService.getAllCustomerDataList(id).subscribe((data: any) => {
      this.customerData = data;
      for (let i = 0; i < this.customerData.length; i++) {
        this.customerData[i].index = i + 1;
      }
    });
  }
  backToList() {
    this.selectCustomer = false;
    this.custAppointment = false;
    this.viewCustomerAllData = false;
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


}
