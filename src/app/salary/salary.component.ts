import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Salary } from './salary.model';
import { SalaryService } from './salary.service';
import { Employee } from '../employee/employee.model';
import { EmployeeService } from '../employee/employee.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

declare const $: any;
@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {
  public salaryModel: Salary = new Salary;
  public salaryList: Salary[];
  public salaryReg: Salary[];
  public fname: string;
  public emid: number;
  public employeeReg: Employee[];
  constructor(
    private employeeService: EmployeeService,
    private salaryService: SalaryService,
    private apiService: ApiService
  ) {
    this.getAllSalary();
  }

  ngOnInit(): void {
    $('#action_menu_btn').click(function () {
      $('.action_menu').toggle();
    });
  }

  getAllSalary() {
    this.salaryService.getAllSalaryList(this.emid).subscribe((data: any) => {
      this.salaryList = data;
      for (let i = 0; i < this.salaryList.length; i++) {
        this.salaryList[i].index = i + 1;
      }
    })
  }
  updateSalaryStatus(id) {
    this.salaryModel.id = id;
    this.salaryModel.status = true;
    this.salaryService.updateActiveStatusList(this.salaryModel).subscribe((req) => {
      this.getAllSalary();
      this.apiService.showNotification('top', 'right', 'Salary paid Successfully.', 'success');
    })
  }

  getAllEmployee(idd) {
    
    this.employeeService.getAllEmployeeList().subscribe((data: any) => {
      this.employeeReg = data;
       

      for (let i = 0; i < this.employeeReg.length; i++) {
        if(idd == this.employeeReg[i].index)
        {
          this.fname = this.employeeReg[i].fname;
        }
      }
    });
  }

  generaterecipt(arrIndex)
  {
    arrIndex = arrIndex-1;
     
    let iidd = this.salaryList[arrIndex].empid;
    this.emid = this.salaryList[arrIndex].empid;
    this.getAllEmployee(this.emid);

    const documentDefinition = { content:
      {
      columns: [
        [{
          text: 'Salary : ' + this.salaryList[arrIndex].salary
        },
        {
          text: 'Paid Date : ' + this.salaryList[arrIndex].paiddate
        },
        {
          text: 'Employee : ' + this.salaryList[arrIndex].empid
        },
        {
          text: 'Employee : ' + this.fname
        }
      ] 
       ]
      } };
    pdfMake.createPdf(documentDefinition).download();

    
  }

}
