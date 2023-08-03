import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerAppointment } from './customerappointment.model';
import { ApiService } from 'app/api.service';
import { Services } from 'app/services/services.model';
import { ServicesService } from 'app/services/services.service';
import { Employee } from 'app/employee/employee.model';
import { EmployeeService } from 'app/employee/employee.service';
import { CustomerComponent } from 'app/customer/customer.component';
import { Customer } from 'app/customer/customer.model';
import { CustomerService } from 'app/customer/customer.service';
import ls from 'localstorage-slim';

@Component({
  selector: 'app-customerservice',
  templateUrl: './customerservice.component.html',
  styleUrls: ['./customerservice.component.css']
})
export class CustomerserviceComponent implements OnInit {

  custAppointment: boolean = true;
  public customerModel: Customer = new Customer;
  public appointmentModel: CustomerAppointment = new CustomerAppointment;
  public appointment: CustomerAppointment[];
  public servicesList: Services[];
  public customerComponent: CustomerComponent;

  totalPoint: any = 0;
  tCustPoint: any = 0;
  selectdate: any = 0;
  addService: any = [];
  totalCustPoint: any = [];
  selectedEmp: any;
  totalPrice: any = 0;
  totalTime: any = 0;
  selectedServ: any;
  valu: 0;
  servId: any;
  vip: boolean = false;
  empId: any;
  cid: any;
  customerData: any[];
  public employeeReg: Employee[];
  

  constructor(
    private router: Router,
    private apiService: ApiService,
    private servicesService: ServicesService,
    private employeeService: EmployeeService,
    private customerService: CustomerService

  ) {
    this.getAllServices();
    this.getAllEmployee();
    this.getCustomerById();
    this.getCustomerPoints();
  }

  ngOnInit(): void {
    this.cid = ls.get('UserId', { decrypt: true });
    this.addService = [{ sertime: null, serpoint: null, serprice: null, name1: this.valu, selectedServ: '', selectedEmp: '', selectedServid: null, selectedEmpid: null }]
    this.valu++;
    this.vip;
    
  }

  addServiceList() {

    this.valu++;
    this.addService.push({ sertime: null, serpoint: null, serprice: null, name1: this.valu, selectedServ: '', selectedEmp: '', selectedServid: null, selectedEmpid: null });
  }

  removeServiceList(valu) {
    this.addService.splice(valu, 1);
    this.addPoinInList();
  }

  backToDashboard() {
    this.router.navigate(['dashboard']);
  }

  selectEmpList(id, ind) {
    this.empId = id;
    this.employeeReg.forEach(element => {
      if (element.id == id) {
        this.addService[ind].selectedEmp = element.fname + ' ' + element.lname;
        this.addService[ind].selectedEmpid = id;
      }
    })
  }

  getCustomerById() {
  
    this.customerService.getCustomerDataById(   ls.get('UserId', { decrypt: true })).subscribe((data: any) => {
      this.customerData = data;
       
      for (let i = 0; i < this.customerData.length; i++) {
        this.customerData[i].index = i + 1;
      }
    });
  }

  getCustomerPoints() {
    this.customerService.getCustAllPoint(   ls.get('UserId', { decrypt: true })).subscribe((data: any) => {
      this.totalCustPoint = data;
      this.tCustPoint = 0;
      this.totalCustPoint.forEach(element => {
        if (element.totalcustpoint != undefined) {
          this.tCustPoint = element.totalcustpoint;
        }
      });
    });
  }


  getAllEmployee() {
    this.employeeService.getAllEmployeeList().subscribe((data: any) => {
      this.employeeReg = data;
    });
  }


  selectServiceList(id, ind) {
    this.servId = id;

    this.servicesList.forEach(element => {
      if (element.id == id) {
        this.addService[ind].selectedServ = element.name;
        this.addService[ind].selectedServid = id;
        this.addService[ind].serprice = element.price;
        this.addService[ind].serpoint = element.point;
        this.addService[ind].sertime = element.time;
        this.addPoinInList();
      }

    })
  }

  getAllServices() {
    this.servicesService.getAllServicesList().subscribe((data: any) => {
      this.servicesList = data;
    });
  }

  // generateInvoicePDF(action = 'open') {

  //   let docDefinition = {
  //     content: [
  //       {
  //         text: 'Angrez The Salon',
  //         fontSize: 16,
  //         alignment: 'center',
  //         color: '#047886'
  //       },
  //       {
  //         text: 'INVOICE',
  //         fontSize: 20,
  //         bold: true,
  //         alignment: 'center',
  //         decoration: 'underline',
  //         color: '#ef8157'
  //       }, {}, {}, {},
  //       {
  //         text: 'Customer Details',
  //         style: 'sectionHeader'
  //       },
  //       {
  //         columns: [
  //           [
  //             {
  //               text: this.customerservice.fname + '' + this.customerModel.lname,
  //               bold: true
  //             },
  //             { text: 'Whats App Number:' + this.customerserviceModel.whatsapp },
  //             { text: 'Contact Number:' + this.customerserviceModel.contact },
  //           ],
  //           [
  //             // {
  //             //   text: 'delivery Date: ' + this.Orderview.deliverydate,
  //             //   alignment: 'right'
  //             // },
  //             {
  //               text: `Bill No : ${((Math.random() * 1000).toFixed(0))}`,
  //               alignment: 'right'
  //             }
  //           ]
  //         ]
  //       }, {}, {},
  //       {
  //         text: 'Service Details',
  //         style: 'sectionHeader'
  //       },
  //       {
  //         table: {
  //           headerRows: 1,
  //           widths: ['*', 'auto', 'auto'],
  //           body: [
  //             ['Service', 'Price', 'Amount'],

  //             // ([this.customerModel.itemName, this.customerModel.price, this.customerModel.point,]),
  //             // (this.Orderview.productPrice * this.Orderview.quantity).toFixed(2)
  //             // [{ text: 'Total Amount', colSpan: 3 }, {}, {}, {}]
  //           ]
  //         }
  //       },
  //       {
  //         columns: [
  //           // [{ qr: `${this.Orderview.username}`, fit: '50' }],
  //           [{ text: 'Signature', alignment: 'right', italics: true }],
  //         ]
  //       },
  //       {
  //         ul: [
  //           'Order can be return in max 10 days.',
  //           'Warrenty of the product will be subject to the manufacturer terms and conditions.',
  //           'This is system generated invoice.',
  //         ],
  //       },
  //     ]
  //   };
  //   if (action === 'download') {
  //     pdfMake.createPdf(docDefinition).download();
  //   } else if (action === 'print') {
  //     pdfMake.createPdf(docDefinition).print();
  //   } else {
  //     pdfMake.createPdf(docDefinition).open();
  //   }
  // }

  saveAppointmentDetails() {

    this.appointmentModel.lessPoints = 0;
    this.appointmentModel.totalpoint = this.totalPoint;
    this.appointmentModel.tCustPoint = this.tCustPoint;
    this.appointmentModel.lessPoints = this.tCustPoint - this.appointmentModel.redeempoints;
    this.tCustPoint = this.appointmentModel.lessPoints;
    this.appointmentModel.lessPoints = this.appointmentModel.lessPoints + this.appointmentModel.totalpoint;
    this.appointmentModel.selectedService = this.addService;
    this.appointmentModel.emp = this.selectedEmp;
    this.appointmentModel.totalprice = this.totalPrice;
    this.appointmentModel.totalpoint = this.totalPoint;
    this.appointmentModel.totaltime = this.totalTime;
    this.appointmentModel.isactive = true;
    this.appointmentModel.custid =    ls.get('UserId', { decrypt: true });

    if (this.appointmentModel.redeempoints > this.appointmentModel.tCustPoint) {
      this.apiService.showNotification('top', 'right', 'You can not redeem point more than total point.', 'danger');
    }
    else {
      this.customerService.saveAppointmentList(this.appointmentModel).subscribe((data: any) => {
        this.appointment = data;
        this.router.navigate(['dashboard']);
        this.apiService.showNotification('top', 'right', 'Appointment Successfully Booked.', 'success');
      })
    }


  }
  



  addPoinInList() {
    this.totalPoint = 0;
    this.totalPrice = 0;
    this.totalTime = 0;
    this.addService.forEach(element => {
      if (element.serprice != undefined) {
        this.totalPrice = this.totalPrice + element.serprice;
      }
      if (element.serpoint != undefined) {
        this.totalPoint = this.totalPoint + element.serpoint;
      }
      if (element.sertime != undefined) {
        this.totalTime = this.totalTime + element.sertime;
      }
    });
  }




}
