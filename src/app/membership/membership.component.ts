import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/api.service';
import { Employee } from 'app/employee/employee.model';
import { EmployeeService } from 'app/employee/employee.service';
import { Services } from 'app/services/services.model';
import { ServicesService } from 'app/services/services.service';
import { Appointment } from './membershipappointment.model';
import { Membership } from './membership.model';
import { MembershipService } from './membership.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Swal from 'sweetalert2';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {
  public membershipModel: Membership = new Membership;
  public appointmentModel: Appointment = new Appointment
  public appointment: Appointment[];
  public appointmentList: Appointment[];
  public membership: Membership[] = [];
  disc: number;
  public membershipList: Membership[];
  selectedEmp: any;
  empId: any;
  selectedServ: any;
  servId: any;
  public employeeReg: Employee[];
  public servicesList: Services[];
  serviceData: any = [];
  search: string = '';
  totalprice: any = 0;
  finalprice: number = 0;
  totalPoint: any = 0;
  quantity: number;
  totalMembershipPoint: any = 0;
  totalTime: any = 0;
  custAppointment: boolean = true;
  selectMembership: boolean = false;
  selectedCustId: any;
  totalCustPoint: any[];
  tCustPoint: any = 0;
  membershipData: any[];
  membershipname: string;
  membershipprice: number = 0;
  usedServices: any[];
  usedPrices: any[];
  totalRecords: string;
  totalModelRecords: string;
  page: Number = 1;
  modelPage: number = 1;
  totalPriceForDetails: any;
  totalPointForDetails: any;
  finalPriceForDetails: any;
  addService: any = [];
  valu: 0;
  isDashboard: boolean = false;
   percentage: number = 0;
  constructor(
    private servicesService: ServicesService,
    private employeeService: EmployeeService,
    private membershipService: MembershipService,
    private apiService: ApiService,
    private router: Router
  ) {

    this.getAllEmployee();
    this.getAllServices();
    this.getMembershipDetails();
    if (this.router.routerState.snapshot.url === '/dashboard') {
      this.isDashboard = true;
    }
  }

  ngOnInit(): void {
    this.addService = [{ sertime: null,quantity:0, serpoint: null, serprice: null, name1: this.valu, selectedServ: '', selectedEmp: '', selectedServid: null, selectedEmpid: null }]
    this.valu++;
    this.membershipModel.finalprice=0;
    this.membershipModel.membershipprice=0;
  }
  addServiceList() {
    this.valu++;
    this.addService.push({finalprice:0, sertime: null,quantity:0, serpoint: null, serprice: null, name1: this.valu, selectedServ: '', selectedEmp: '', selectedServid: null, selectedEmpid: null,serTotalPrice:0 });
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
  getAllServices() {
    this.servicesService.getAllServicesList().subscribe((data: any) => {
      this.servicesList = data;
    });
  }
  selectServiceList(id, ind) {
  
    this.servId = id;

    this.servicesList.forEach(element => {
      if (element.id == id) {
        this.addService[ind].selectedServ = element.name;
        debugger
        this.addService[ind].selectedServid = id;
        this.addService[ind].serprice = element.price;
        this.addService[ind].serpoint = element.point;
        this.addService[ind].sertime = element.time;
        if(this.membershipModel.id != undefined){
          this.UpdatePricesTotal(this.addService[ind],ind);
          
        }
        this.addPoinInList();
      }

    })
  }
  addPoinInList() {
    this.totalPoint = 0;
    this.totalprice = 0;
    this.totalTime = 0;
    this.addService.forEach(element => {
      if (element.serprice != undefined) {
        this.totalprice = this.totalprice + element.serprice;
        this.membershipModel.totalprice = this.totalprice;
      }
      if (element.serpoint != undefined) {
        this.totalPoint = this.totalPoint + element.serpoint;
      }
      if (element.sertime != undefined) {
        this.totalTime = this.totalTime + element.sertime;
      }
      this.disc = this.membershipModel.percentage;
      // this.membershipModel.membershipdiscount = this.membershipModel.percentage;
      this.quantity = this.membershipModel.quantity;
      debugger
      this.getMembershipVal();
      // this.finalmembershipprice();
    });
  }

  removeItem(i) {
    this.addService.splice(i, 1);
    this.addPoinInList();
  }

  saveMembershipDetail(data) {
    
    // this.membershipModel.totalprice = this.totalprice;
    // this.membershipModel.finalprice = this.finalprice;
    // this.membershipModel.membershipprice = this.membershipprice;
    var discount: number = +this.disc;
    this.membershipModel.percentage = discount;
    this.membershipModel.services=this.addService;
    this.membershipService.saveMembershipList(this.membershipModel).subscribe((data: any) => {
      this.membershipList = data;
      this.apiService.showNotification('top', 'right', 'Membership Added Successfully.', 'success');
      this.membershipModel.services=[];
      this.membershipModel={};
      this.getMembershipDetails();
    })
  }
finalmembershipprice() {
  this.finalprice = Number(this.quantity) * this.totalprice;
}

  getMembershipDetails() {

    this.membershipService.getAllMembershipList().subscribe((data: any) => {
      this.membershipList = data;
      this.membership = data;
      for (let i = 0; i < this.membership.length; i++) {
        this.membership[i].index = i + 1;
      }
    });
  }
  getMembershipVal() {
    this.membershipprice = this.totalprice - (this.totalprice * (this.disc / 100));
    this.membershipModel.membershipprice = this.membershipprice;
    debugger
  }
  searchMembershipList(val) {
    if (this.search == '') {
      this.membership = this.membershipList;
    } else {
      this.transform(this.membershipList, val);
    }
  }
  transform(membership: Membership[], searchValue: string) {

    this.membership = [];
    membership.forEach(element => {
      if (element.contact.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
        this.membership.push(element);
      }
      else if (element.fname.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
        this.membership.push(element);
      }
      else if (element.lname.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
        this.membership.push(element);
      }
    })
  }

  saveAppointmentDetails() {

    this.appointmentModel.lessPoints = 0;
    this.appointmentModel.totalpoint = this.totalPoint;
    this.appointmentModel.lessPoints = this.tCustPoint - this.appointmentModel.percentage;
    this.appointmentModel.lessPoints = this.appointmentModel.lessPoints + this.appointmentModel.totalpoint;
    this.appointmentModel.selectedService = this.addService;
    this.appointmentModel.membershipprice = this.membershipprice;
    this.appointmentModel.membershipname = this.membershipname;
    this.appointmentModel.totalpoint = this.totalPoint;
    this.appointmentModel.isactive = true;
    if (this.appointmentModel.percentage > this.appointmentModel.tCustPoint) {
      this.apiService.showNotification('top', 'right', 'You can not redeem point more than total point.', 'danger');
    }
    else {
      this.membershipService.saveAppointmentList(this.appointmentModel).subscribe((data: any) => {
        this.appointment = data;
        this.router.navigate(['dashboard']);
        location.reload();
        this.apiService.showNotification('top', 'right', 'Appointment Successfully Booked.', 'success');
      })
    }

  }
  generateInvoicePDF(action = 'open') {

    let docDefinition = {
      content: [
        {
          image: 'testImage'
        },

        {
          text: 'Angrez The Salon',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'INVOICE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: '#ef8157'
        }, {}, {}, {},
        {
          text: 'Membership Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.membershipModel.fname + '' + this.membershipModel.lname,
                bold: true
              },           
            ],
            [    
              {
                text: `Bill No : ${((Math.random() * 1000).toFixed(0))}`,
                alignment: 'right'
              }
            ]
          ]
        }, {}, {},
        {
          text: 'Service Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto'],
            body: [
              ['Service', 'Price', 'Amount'],

              
            ]
          }
        },
        {
          columns: [
         
            [{ text: 'Signature', alignment: 'right', italics: true }],
          ]
        },
        {
          ul: [
            'Order can be return in max 10 days.',
            'Warrenty of the product will be subject to the manufacturer terms and conditions.',
            'This is system generated invoice.',
          ],
        },
      ]
    };
    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }
  }
  viewMembershipDetails(data) {
    this.totalMembershipPoint = 0;
    this.membershipModel = data;
    this.membershipService.getMemberServicesUsingId(data.id).subscribe((data: any) => {
      this.addService=[];
      data.forEach((element:any,index:any)=>{
        let data={finalprice:0, sertime: null,quantity:element.quantity, serpoint: null, serprice: null, name1: this.valu, selectedServ: '', selectedEmp: '', selectedServid: null, selectedEmpid: null,serTotalPrice:0 };
        this.addService.push(data);
        this.selectServiceList(element.serviceid,index);
      });
      this.UpdatePricesTotalbyPercentage();
    });
  }
  updateMembershipDetails() {
    this.membershipService.updateMembershipList(this.membershipModel).subscribe((req) => {
      this.getMembershipDetails();
      this.apiService.showNotification('top', 'right', 'Membership Details Successfully Updated.', 'success');
    })
  }
  UpdatePricesTotal(data,ind){
    this.finalprice=0;
    this.addService[ind].finalprice = Number(data.quantity) * data.serprice;
    this.addService.forEach((element:any)=>{
      if(element.finalprice != undefined){
        this.finalprice = this.finalprice+element.finalprice;
        this.membershipModel.totalprice = this.finalprice;
        this.membershipModel.membershipprice=0;
      }
    })
  }
  UpdatePricesTotalbyPercentage(){
    this.membershipModel.membershipprice =this.membershipModel.totalprice-(this.membershipModel.totalprice*this.membershipModel.membershipdiscount)/100;
  }
  removeMembershipList(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete! If you delete Membership then all the membership data will be delete.",
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
        this.membershipService.removeMembershipDetails(id).subscribe((req) => {
          this.apiService.showNotification('top', 'right', 'Membership removed Successfully.', 'success');

        })
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Your Membership has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
        this.getMembershipDetails();
      }
    })

  }

  onlyViewMembershipDetails(id) {

    this.membershipService.getMemberServicesUsingId(id).subscribe((data: any) => {
      this.usedServices = data;
      
      for (let i = 0; i < this.usedServices.length; i++) {
        this.usedServices[i].index = i + 1;
      }
    });
  }

}