import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/api.service';
import { ProductService } from 'app/products/products.service';
import Swal from 'sweetalert2';
import { Order } from './order.model';
declare const $: any;
@Component({
  selector: 'app-orderslist',
  templateUrl: './orderslist.component.html',
  styleUrls: ['./orderslist.component.css']
})
export class OrderslistComponent implements OnInit {
  public orderList: Order[];
  pending: any = [];
  completed: any = [];
  plength: any = [];
  clength: any = [];
  productOrderList: any = [];
  pendingOpen: boolean = false;
  completeOpen: boolean = false;
  orderStatus: boolean=false;;
  orderAcceptId: any;
  
  constructor(
    private productService: ProductService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.getAllOrderList();
  }

  ngOnInit(): void {
  }
  getAllOrderList() {
    this.productService.getAllOrderList().subscribe((data: any) => {
      this.orderList = data;
      for (let i = 0; i < this.orderList.length; i++) {
        this.orderList[i].index = i + 1;
      }
      this.orderList.forEach(element => {
        if (element.isactive == true) {
          this.plength.push(element);
        }
      });
      this.orderList.forEach(element => {
        if (element.isactive == false) {
          this.clength.push(element);
        }
      });
    })
  }
  openPendingList() {
    this.pending = [];
    this.pendingOpen = true;
    this.completeOpen = false;
    this.orderList.forEach(element => {
      if (element.isactive == true) {
        this.pending.push(element);

      }
      for (let i = 0; i < this.pending.length; i++) {
        this.pending[i].index = i + 1;
      }
    });
  }
  openCompleteList() {
    this.completed = [];
    this.pendingOpen = false;
    this.completeOpen = true;
    this.orderList.forEach(element => {
      if (element.isactive == false) {
        this.completed.push(element);

      }
      for (let i = 0; i < this.completed.length; i++) {
        this.completed[i].index = i + 1;
      }
    });
  }
  openOrderList(id, val) {
    this.orderAcceptId = id;
    this.orderStatus = val;
    this.productService.getOrderServices(id).subscribe((data: any) => {
      this.productOrderList = data;
      for (let i = 0; i < this.productOrderList.length; i++) {
        this.productOrderList[i].index = i + 1;
      }
    });
  }
  acceptOrder() {

    let data = {
      id: this.orderAcceptId
    }
    this.productService.acceptUserOrder(data).subscribe((data: any) => {
      this.apiService.showNotification('top', 'right', 'Order Accepted Successfully Placed.', 'success');
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });

      // this.reloadCurrentRoute();
    })
  }
  reloadCurrentRoute() {

  }
  removeOrderList(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete! If you delete Order then all the Customer Selected Product will be delete.",
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
        this.productService.removeCustomerOrder(id).subscribe((req) => {
          this.apiService.showNotification('top', 'right', 'Customer Order removed Successfully.', 'success');

        })
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Customer Order has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
        this.getAllOrderList();
        this.openPendingList();
      }
    })

  }
  removeOrderDetails(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete! If you delete Product then Customer Selected Product will be delete.",
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
        this.productService.removeOrderDetails(id).subscribe((req) => {
          this.apiService.showNotification('top', 'right', 'Customer Selected Product removed Successfully.', 'success');

        })
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Customer Order has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
      }
    })
  }
}
