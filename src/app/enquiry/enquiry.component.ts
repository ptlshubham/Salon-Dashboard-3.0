import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Enquiry } from './enquiry.model';
import { EnquiryService } from './enquiry.service';
declare const $: any;
@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {
  public enquiryModel: Enquiry = new Enquiry;
  public enquiryList: Enquiry[];
  constructor(
    private enquiryService: EnquiryService,
    private apiService: ApiService
  ) {
    this.getAllEnquiry();
  }

  ngOnInit(): void {
    $('#action_menu_btn').click(function () {
      $('.action_menu').toggle();
    });
  }

  getAllEnquiry() {
    this.enquiryService.getAllEnquiryList().subscribe((data: any) => {
      this.enquiryList = data;
      for (let i = 0; i < this.enquiryList.length; i++) {
        this.enquiryList[i].index = i + 1;
      }
    })
  }
  updateEnquiryStatus(id) {
    this.enquiryModel.id = id;
    this.enquiryModel.isactive = false;
    this.enquiryService.updateActiveStatusList(this.enquiryModel).subscribe((req) => {
      this.getAllEnquiry();
      this.apiService.showNotification('top', 'right', 'Enquiry accepted Successfully.', 'success');
    })
  }

}
