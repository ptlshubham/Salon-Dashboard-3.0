import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Customer } from 'app/customer/customer.model';
import { CustomerService } from 'app/customer/customer.service';
import { Membership } from '../membership.model';
import { MembershipService } from '../membership.service';
import { Purchased } from './purchased.model';

@Component({
  selector: 'app-purchsed-membership',
  templateUrl: './purchsed-membership.component.html',
  styleUrls: ['./purchsed-membership.component.css']
})
export class PurchsedMembershipComponent implements OnInit {
  public customerModel: Customer = new Customer;
  public purchasedModel: Purchased = new Purchased;
  public purchsedMembership: Purchased[];
  public customerList: Customer[];
  
  public customer: Customer[];
  public membershipList: Membership[];
  public membership: Membership[];
  searchCustomer: any = {};
  selectedMembership: any;
  membershipId: any;
  mdiscount: any;
  mtprice: any;
  mmprice: any;
  usedServices: any[];
  purchsedServices:any[];
  constructor(
    private customerService: CustomerService,
    private membershipService: MembershipService,
    private apiService: ApiService
  ) {
    this.getCustomerDetails();
    this.getPurchasedMemberList();
    this.getMembershipDetails();
  }

  ngOnInit(): void {
  }
  getCustomerDetails() {
    this.customerService.getAllCustomerList().subscribe((data: any) => {
      this.customer = data;
      for (let i = 0; i < this.customer.length; i++) {
        this.customer[i].index = i + 1;
      }
    });
  }
  getCustomer(data) {
    this.customer.forEach(element => {
      if (data == element.contact)
        this.searchCustomer= element;
    });
    // this.customerList = this.searchCustomer;

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

  selectMemberList(id) {
    this.membershipId = id;
    this.membershipList.forEach(element => {
      if (element.id == id) {
        this.selectedMembership = element.membershipname;
        this.mdiscount = element.membershipdiscount;
        this.mmprice = element.membershipprice;
        this.mtprice = element.totalprice;
        this.membershipService.getMemberServicesUsingId(element.id).subscribe((data: any) => {
          this.usedServices = data;
          
          for (let i = 0; i < this.usedServices.length; i++) {
            this.usedServices[i].index = i + 1;
          }
        });
      }
    })
  }
  savePurchaseMembershipDetail() {
    this.purchasedModel.cid = this.searchCustomer.id;
    this.purchasedModel.memid = this.membershipId;
    this.purchasedModel.tprice = this.mtprice;
    this.purchasedModel.discount = this.mdiscount;
    this.purchasedModel.dprice = this.mmprice;
    this.purchasedModel.isactive = true;
    this.purchasedModel.services = this.usedServices;
    this.membershipService.savePurchaseServiceList(this.purchasedModel).subscribe((data: any) => {
      this.membershipList = data;
      this.apiService.showNotification('top', 'right', 'New Membership Activated Successfully.', 'success');
      this.getPurchasedMemberList();
    })
  }
  getPurchasedMemberList() {
    this.purchsedMembership=[];
    this.membershipService.getAllMemberPurchased().subscribe((data: any) => {
      this.purchsedMembership = data;
      debugger
      for (let i = 0; i < this.purchsedMembership.length; i++) {
        this.purchsedMembership[i].index = i + 1;
      }
    })
  }
  viewMembershipDetails(data){
    debugger
    this.membershipService.getPurchasedDetail(data).subscribe((data: any) => {
      this.purchsedServices = data;
      for (let i = 0; i < this.purchsedServices.length; i++) {
        this.purchsedServices[i].index = i + 1;
      }
    })
  }
  backToMembership(){}

}
