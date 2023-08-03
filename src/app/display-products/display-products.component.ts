import { Component, OnInit } from '@angular/core';
import { ImagesModel } from 'app/products/images.model';
import { Products } from 'app/products/product.model';
import { ApiService } from 'app/api.service';
import { Cart } from './cart.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ProductService } from 'app/products/products.service';
import ls from 'localstorage-slim';

declare var $: any;
@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.css']
})
export class DisplayProductsComponent implements OnInit {
  public productsModel: Products = new Products;
  public products: Products[];
  //  public cartModel: Cart = new Cart;
  public cart: Cart[];
  selctpr:any;
  cid:any;
  selcart:any;
  public images: ImagesModel[];
  public frontimage: ImagesModel;
  selctIm:any;
  search: string = '';
  CartList: any;
  selectedName: any;
  CategoryList;

  constructor(
    private productService: ProductService,
    private apiService: ApiService,
    private router:Router
    ) { 
    this.getAllProducts();
    this.getAllCategory();
    // this.formdate;
    this.productsModel.quant=0;
  }

  quantity:number=0;
  
  ngOnInit(): void {
    this.getAllProducts();
    this.cid =    ls.get('UserId', { decrypt: true });  
    this.productsModel.quant=0;
    this.selectedName='Category Filters'
  }
  getAllImages(id) {
    this.productService.getAllImagesList(id).subscribe((data: any) => {
      this.images = data;
      this.frontimage = this.images[0]
      
    });
  }
  getAllCategory() {
    this.productService.getAllCategoryList().subscribe((data: any) => {
      this.CategoryList = data;
    });
  }
  selectedCategory(id) {
    this.CategoryList.forEach(element => {
      if (element.id == id) {
        this.selectedName = element.name;
      }
      this.productsModel.category = this.selectedName;
    })

  }

  getAllProducts() {
    this.productService.getActiveProductsList().subscribe((data: any) => {
      this.products = data;
      this.products.forEach((element:any)=>{
        element.quant=0;
      })
    });
  }
  incre(ind){
    
    if( this.products[ind].quant>=0){
      this.products[ind].quant ++;
    }
   
  }
  decre(ind){
    if(this.products[ind].quant>0){
      this.products[ind].quant --;
      
    }   
    
  }
  selectedProd(data,ind){ 
    this.selctpr=data;
    this.selctpr.index = ind;
    this.getAllImages(this.selctpr.id)
  }
  //   this.selcart=data;
  // }
  saveCart(data) {
     
    if(data.quant==0){
      data.quant=1;
    }
    this.selcart=data;
    this.cid=ls.get('UserId', { decrypt: true });
    this.selcart.uid=this.cid;
     
    // this.cid= this.productsModel.uid;
    this.productService.saveCartList(this.selcart).subscribe((data: any) => {
      this.cart = data;
      // this.getAllCart();
      this.reloadCurrentRoute();
      this.apiService.showNotification('top', 'right', 'Cart Added Successfully.', 'success');
    })
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/navbar-cart', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}


  selectedImg(data){ 
  }
 
  Search() {
    if (this.search == "") {
    } else {
      this.products = this.products.filter(res => {
        if (res.name.toLocaleLowerCase().match(this.search.toLocaleLowerCase())) {
          return res.name.toLocaleLowerCase().match(this.search.toLocaleLowerCase());
        }
        else {
          return res.category.toLocaleLowerCase().match(this.search.toLocaleLowerCase());
        }
      });
    }
  }
  getAllCart() {
    this.productService.getAllCartList().subscribe((data: any) => {
      this.CartList = data;

      for (let i = 0; i < this.CartList.length; i++) {
        this.CartList[i].index = i + 1;
      }
    });
  }
  removeCartList(id) {
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
        this.productService.removeCartDetails(id).subscribe((req) => {
          this.apiService.showNotification('top', 'right', 'Customer removed Successfully.', 'success');
        })
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Your product has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
        this.getAllCart();
      }
    })

  }

  // cartadd(from,align){
  //    if(this.quantity!=0){
  //     $.notify({
  //       icon: "ti-gift",
  //       message: "Item added sucessfully!!"
  //     },{
  //         type: 'success',
  //         timer: 4000,
  //         placement: {
  //             from: from,
  //             align: align
  //         },
  //         template: '<div data-notify="container" class="col-11 col-md-4 alert alert-{0} alert-with-icon" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss"><i class="nc-icon nc-simple-remove"></i></button><span data-notify="icon" class="nc-icon nc-bell-55"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
  //     });
  //    }
  //    else{
  //     $.notify({
  //       icon: "ti-gift",
  //       message: "Quantity Invalid!!"
  //     },{
  //         type: 'danger',
  //         timer: 4000,
  //         placement: {
  //             from: from,
  //             align: align
  //         },
  //         template: '<div data-notify="container" class="col-11 col-md-4 alert alert-{0} alert-with-icon" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss"><i class="nc-icon nc-simple-remove"></i></button><span data-notify="icon" class="nc-icon nc-bell-55"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
  //     });
  //    }
  // }
}
