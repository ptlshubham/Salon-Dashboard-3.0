import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Services } from 'app/services/services.model';
import { ServicesService } from 'app/services/services.service';
import Swal from 'sweetalert2';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';
import { Salary } from '../salary/salary.model';
import { SalaryService } from '../salary/salary.service';
import { CustomerService } from '../customer/customer.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { FormControl } from '@angular/forms';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public employeeModel: Employee = new Employee;
  public employeeReg: Employee[];
  public servicesList: Services[];
  public updateEmployeeModel: Employee = new Employee;
  public updateSalaryModel: Salary = new Salary;
  public salaryModel: Salary = new Salary;
  public employee: Employee[];
  public salaryList: Salary[];
  serviceData: any = [];
  showEmp: Boolean = true;
  showSalary: boolean = false;
  addEmp: boolean = false;
  viewEmployeeAllData: boolean = false;
  usedServices: any[];
  currempid: number;
  selectCustomer: boolean = false;
  totalPriceForDetails: any;
  totalPointForDetails: any;
  selectedCustId: any;
  custAppointment: boolean = false;
  activePageDataChunkAppo: any = [];
  pageSize = 10;
  fstname: string;
  lstname: string;
  cntct: string;
  search: string = '';

  servicesForMulti = new FormControl('');
  constructor(
    private employeeService: EmployeeService,
    private servicesService: ServicesService,
    private salaryService: SalaryService,
    private apiService: ApiService
  ) {
    this.getAllServices();
    this.getAllEmployee();
    this.getAllSalary();
  }

  ngOnInit(): void {
  }
  addEmployee() {
    this.addEmp = true;
    this.showEmp = false;
    this.showSalary = false;
  }
  closeEmpForm() {
    this.addEmp = false;
    this.showEmp = true;
    this.showSalary = false;
  }

  getAllServices() {
    this.servicesService.getAllServicesList().subscribe((data: any) => {
      this.servicesList = data;
      // this.servicesList.forEach(element => {
      //   let data = {
      //     itemName: element.name,
      //     id: element.id,
      //   }

      //   this.serviceData.push(data)
      // });
    });
  }
  getAllSalary() {

    this.currempid = this.selectedCustId;

    this.salaryService.getAllSalaryList(this.currempid).subscribe((data: any) => {
      this.salaryList = data;

      //this.activePageDataChunkAppo = this.salaryList.slice(0, this.pageSize);
      for (let i = 0; i < this.salaryList.length; i++) {
        this.salaryList[i].index = i + 1;
      }
    })
  }
  searchSalaryList(val) {
    if (this.search == '') {
      this.employee = this.employeeReg;
    } else {
      this.transform(this.employeeReg, val);
    }
  }
  transform(employee: Employee[], searchValue: string) {

    this.employee = [];
    employee.forEach(element => {
      if (element.fname.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
        this.employee.push(element);
      }
    })
  }
  saveSalaryDetail() {
    this.salaryModel.empid = this.employeeModel.id;

    this.salaryService.saveSalaryList(this.salaryModel).subscribe((data: any) => {
      this.salaryList = data;
      //location.reload();
      this.getAllSalary();
      this.apiService.showNotification('top', 'right', 'Salary Added Successfully.', 'success');
    })
  }
  updateSalaryDetails() {
    this.salaryService.updateSalaryList(this.updateSalaryModel).subscribe((req) => {
      this.apiService.showNotification('top', 'right', 'Salary Details Successfully Updated.', 'success');
      this.getAllSalary();
    })
  }
  // onItemSelect($event) {
  //   let data = {
  //     servicesName: $event.itemName,
  //     servicesId: $event.id,
  //   }
  //   this.selServiceData.push(data)
  // }

  // OnItemDeSelect(item: any) {

  //   for (let i = 0; i < this.selServiceData.length; i++) {
  //     if (this.selServiceData[i].servicesId == item.id) {
  //       this.selServiceData.splice(i, 1);
  //     }
  //   }
  // }
  // onSelectAll(items: any = []) {
  //   items.forEach(element => {
  //     let data1 = {
  //       servicesName: element.itemName,
  //       servicesId: element.id,
  //     };
  //     this.selServiceData.push(data1)
  //   });

  // }
  // onDeSelectAll(items: any) {
  //   this.selServiceData = [];
  // }
  saveEmployeeDetail() {
    this.employeeModel.service 
    debugger
    // this.employeeModel.service = this.selServiceData;
    this.employeeModel.isactive = true;
    this.employeeService.saveEmployeeList(this.employeeModel).subscribe((data: any) => {
      this.employeeReg = data;
      this.getAllEmployee();
      location.reload();
      this.apiService.showNotification('top', 'right', 'Employee Added Successfully.', 'success');
    })
  }
  getAllEmployee() {
    this.employeeService.getAllEmployeeList().subscribe((data: any) => {
      this.employeeReg = data;

      for (let i = 0; i < this.employeeReg.length; i++) {
        this.employeeReg[i].index = i + 1;
      }
    });
  }
  viewEmpDetails(data) {

    // this.showEmp = true;
    this.updateEmployeeModel = data;
    debugger
  }
  viewSalDetails(data) {

    // this.showEmp = true;
    this.updateSalaryModel = data;
  }

  generaterecipt(salarylistIndex) {
    this.currempid = this.employeeModel.id;
    salarylistIndex = salarylistIndex - 1;


    for (let i = 0; i < this.employeeReg.length; i++) {
      if (this.employeeReg[i].id == this.currempid) {
        this.fstname = this.employeeReg[i].fname;
        this.lstname = this.employeeReg[i].lname;
        this.cntct = this.employeeReg[i].contact;
      }
    }

    const documentDefinition = {
      content:
      {
        columns: [
          [{
            text: 'Salary : ' + this.salaryList[salarylistIndex].salary
          },
          {
            text: 'Paiddate : ' + this.salaryList[salarylistIndex].paiddate
          },
          {
            text: 'Empid : ' + this.salaryList[salarylistIndex].empid
          },
          {
            text: 'Name : ' + this.fstname
          },
          ]
        ]
      }
    };
    pdfMake.createPdf(documentDefinition).download();


  }


  removeEmployee(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete! If you delete Employee then all the employee data will be delete.",
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
        this.employeeService.removeEmployeeList(id).subscribe((req) => {
          this.apiService.showNotification('top', 'right', 'Employee removed Successfully.', 'success');

        })
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Your Employee has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
        this.getAllEmployee();
      }
    })

  }

  removeSalary(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete! If you delete Salary then all the salary data will be delete.",
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
        this.salaryService.removeSalaryList(id).subscribe((req) => {
          this.apiService.showNotification('top', 'right', 'Salary removed Successfully.', 'success');

        })
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Your Salary has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
        this.getAllSalary();
      }
    })
  }

  updateEmployeeDetails() {

    this.employeeService.updateEmpList(this.updateEmployeeModel).subscribe((req) => {
      this.getAllEmployee();
      this.apiService.showNotification('top', 'right', 'Employee Details Successfully Updated.', 'success');
    })
  }

  seletedCustomerDetails(data) {
    this.selectedCustId = data.id;
    this.employeeModel = data;
    this.custAppointment = true;
    this.selectCustomer = true;
  }
  openSalary(data) {

    this.showEmp = false;
    this.showSalary = true;
    this.addEmp = false;
    this.selectedCustId = data.id;
    this.employeeModel = data;
    this.getAllSalary();
  }

  openEmployee() {
    this.showEmp = true;
    this.addEmp = false;
    this.showSalary = false;
  }

}
