import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Services } from 'app/services/services.model';
import { ServicesService } from 'app/services/services.service';
import Swal from 'sweetalert2';
import { Vendor } from './vendor.model';
import { VendorService } from './vendor.service';
import { Salary } from '../salary/salary.model';
import { SalaryService } from '../salary/salary.service';
import { CustomerService } from '../customer/customer.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  
  public vendorModel: Vendor = new Vendor;
  public vendorReg: Vendor[];
  public updateVendorModel: Vendor = new Vendor;
  public vendor:Vendor[];
  showVen: Boolean = true;
  showSalary: boolean = false;
  addVen: boolean = false;
  viewVendorAllData: boolean = false;
  activePageDataChunkAppo: any = [];
  pageSize = 10;
  search: string = '';
  constructor(
    private vendorService: VendorService,
    private apiService: ApiService
  ) {
    this.getAllVendor();
  }

  ngOnInit(): void {
  }
  addVendor() {
    this.addVen = true;
    this.showVen = false;
    this.showSalary = false;
  }
  closeVenForm() {
    this.addVen = false;
    this.showVen = true;
    this.showSalary = false;
  }
 
  transform(vendor: Vendor[], searchValue: string) {

    this.vendor = [];
    vendor.forEach(element => {
      if (element.fname.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
        this.vendor.push(element);
      }
     })
  }
   
  saveVendorDetail() {
    this.vendorModel.isactive = true;
    this.vendorService.saveVendorList(this.vendorModel).subscribe((data: any) => {
      this.vendorReg = data;
      
      this.getAllVendor();
      location.reload();
      this.apiService.showNotification('top', 'right', 'Vendor Added Successfully.', 'success');
    })
  }
  getAllVendor() {
    this.vendorService.getAllVendorList().subscribe((data: any) => {
      this.vendorReg = data;

      for (let i = 0; i < this.vendorReg.length; i++) {
        this.vendorReg[i].index = i + 1;
      }
    });
  }
  viewVenDetails(data) {

    // this.showVen = true;
    this.updateVendorModel = data;
  }
  
  removeVendor(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete! If you delete Vendor then all the vendor data will be delete.",
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
        this.vendorService.removeVendorList(id).subscribe((req) => {
          this.apiService.showNotification('top', 'right', 'Vendor removed Successfully.', 'success');

        })
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Your Vendor has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
        this.getAllVendor();
      }
    })

  }


  updateVendorDetails() {

    this.vendorService.updateVenList(this.updateVendorModel).subscribe((req) => {
      this.getAllVendor();
      this.apiService.showNotification('top', 'right', 'Vendor Details Successfully Updated.', 'success');
    })
  }


  openVendor()
  {
    this.showVen = true;
    this.addVen = false;
    this.showSalary = false;
  }

}
