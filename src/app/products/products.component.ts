import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import Swal from 'sweetalert2';
import { Products } from './product.model';
import { ProductService } from './products.service';
import { Category } from './category.model';
import { Vendor } from 'app/vendor/vendor.model';
import { VendorService } from 'app/vendor/vendor.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public productsModel: Products = new Products;
  public productsReg: Products[];
  public vendorModel: Vendor = new Vendor;
  public vendorReg: Vendor[];
  public updateProductModel: Products = new Products;
  public updateVendorModel: Vendor = new Vendor;
  formdate: Date = new Date();
  p: any;
  showList: boolean = true;
  addProduct: boolean = true;
  openCategoryFlag: boolean = false;
  showCategoryList: boolean = false;
  public updateCategoryModel: Category = new Category;
  public categoryModel: Category = new Category;
  public category: Category[];
  isDashboard: boolean = false;
  public productList: Products[];
  search: string = '';
  name: any;
  submitButton: boolean = false;
  selectCustomer: boolean = false;
  custAppointment: boolean = false;
  viewCustomerAllData: boolean = false;
  Productdata: any[];
  val = 0;
  addingprdtimg: any = [];
  imageError: string;
  isImageSaved: boolean = true;
  cardImageBase64: string;
  image: any;
  multi: any = [];
  CategoryList;
  VendorList;
  addingcat: any[];
  modelValue: any;
  selectedName: any;
  selectvendor: any;
  selectedContact: any;

  constructor(
    private vendorService: VendorService,
    private productService: ProductService,
    private apiService: ApiService,
  ) {
    this.getAllProducts();
    this.formdate
    this.getAllCategory();
    this.getAllVendor();
  }

  ngOnInit(): void {

  }
  saveVendorDetail() {
    this.vendorModel.isactive = true;
    this.vendorService.saveVendorList(this.vendorModel).subscribe((data: any) => {
      this.VendorList = data;
      this.getAllVendor();
      // location.reload();
      this.apiService.showNotification('top', 'right', 'Vendor Added Successfully.', 'success');
    })
  }
  getAllVendor() {
    this.vendorService.getAllVendorList().subscribe((data: any) => {
      this.VendorList = data;
    });
  }
  viewVenDetails(data) {

    // this.showVen = true;
    this.updateVendorModel = data;
  }
  selectedCategory(id) {
    this.CategoryList.forEach(element => {
      if (element.id == id) {
        this.selectedName = element.name;
      }
      this.productsModel.category = this.selectedName;
    })

  }
  selectedVendor(id) {
    this.VendorList.forEach(element => {
      if (element.id == id) {
        this.selectedContact = element.contact;
        this.selectvendor = element.fname;
      }
      this.productsModel.vendorcontact = this.selectedContact;
    })

  }
  saveCategoryDetail() {
    this.productService.saveCategoryList(this.categoryModel).subscribe((data: any) => {
      this.category = data;
      this.getAllCategory();
      this.apiService.showNotification('top', 'right', 'Product Added Successfully.', 'success');
    })
  }

  addImageUploader() {
    this.val++;
    this.addingprdtimg.push({ name: this.val });
  }
  removeImageUploader(val) {
    this.addingprdtimg.splice(val, 1);
  }
  select(event) {

    let max_height;
    let max_width;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      max_height = 500;
      max_width = 500;

      if (event.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          console.log(img_height, img_width);
          if (img_height > max_height && img_width > max_width) {
            alert("image must be " + max_height + "*" + max_width);
            this.isImageSaved = false;
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';


            return false;
          }
          else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;

            const formdata = new FormData();
            formdata.append('file', file);

            this.productService.selectUploadImage(formdata).subscribe((response) => {
              this.image = response;
              console.log(response);
            })
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  onSelect(event) {
    let max_height;
    let max_width;

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      max_height = 500;
      max_width = 500;

      if (event.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          console.log(img_height, img_width);
          if (img_height > max_height && img_width > max_width) {
            alert("image must be " + max_height + "*" + max_width);
            this.isImageSaved = false;
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          }
          else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            const formdata = new FormData();
            formdata.append('file', file);
            // formdata.append('catid', this.imagesModel.catid);
            // formdata.append('subcatid', this.ImagesModel.categoryId);
            // formdata.append('grandchild', this.ImagesModel.subCategoryId);


            this.productService.selectMultiUploadImage(formdata).subscribe((response) => {
              this.multi.push(response);
              console.log(response);

            })
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  getAllProducts() {
    this.productService.getAllProductsList().subscribe((data: any) => {
      this.productsReg = data;


      for (let i = 0; i < this.productsReg.length; i++) {
        this.productsReg[i].index = i + 1;
      }
    });
  }
  getAllCategory() {
    this.productService.getAllCategoryList().subscribe((data: any) => {
      this.CategoryList = data;

      for (let i = 0; i < this.CategoryList.length; i++) {
        this.CategoryList[i].index = i + 1;
      }
    });
  }
  saveProductsDetail() {
    this.productsModel.image = this.image;
    this.productsModel.multi = this.multi;
    this.productService.saveProductsList(this.productsModel).subscribe((data: any) => {
      this.productsReg = data;
      this.getAllProducts();
      // location.reload();
      this.apiService.showNotification('top', 'right', 'Product Added Successfully.', 'success');
    })
  }

  removeProductList(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete! If you delete Product then all the Product data will be delete.",
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
        this.productService.removeProductDetails(id).subscribe((req) => {
          this.apiService.showNotification('top', 'right', 'Product removed Successfully.', 'success');


        })
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Your Product has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
        this.getAllProducts();
      }
    })

  }
  removeCategoryList(id) {
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
        this.productService.removeCategoryDetails(id).subscribe((req) => {
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
        this.getAllCategory();
      }
    })

  }
  viewProDetails(data: Products) {
    this.updateProductModel = data;
    this.selectedName = data.category;
    this.selectvendor = data.vendorname;
  }
  viewCategoryDetails(data: Category) {
    this.updateCategoryModel = data;
  }

  UpdateProductDetails() {
    this.updateProductModel.category = this.selectedName;
    this.updateProductModel.vendorname = this.selectvendor;
    this.productService.updateProductList(this.updateProductModel).subscribe((req) => {
      this.getAllProducts();
      this.apiService.showNotification('top', 'right', 'Product Details Successfully Updated.', 'success');

    })
  }
  updateCategoryDetails() {
    this.productService.updateCategoryList(this.updateCategoryModel).subscribe((req) => {
      this.getAllCategory();
      this.apiService.showNotification('top', 'right', 'Category Details Successfully Updated.', 'success');
    })
  }
  addcategory() {
    this.showList = false;
    this.addProduct = false;
    this.openCategoryFlag = true;
    this.showCategoryList = true;
    this.getAllCategory();
  }
  backToProduct() {
    this.showList = true;
    this.addProduct = true;
    this.openCategoryFlag = false;
    this.showCategoryList = false;
  }




  // Search(val) {
  //   if (this.search == '') {
  //     console.log(val)
  //     this.products = this.productList;
  //   } else {
  //     console.log(val)
  //     this.transform(this.productList, val);
  //   }

  // }
  // transform(products: Products[], searchValue: string) {
  //   this.products = [];
  //   products.forEach(element => {
  //     if (element.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
  //       this.products.push(element);
  //     }
  //    })
  //    console.log(this.products)
  // }
  Search() {
    if (this.search == "") {
      this.getAllProducts();
    } else {
      this.productsReg = this.productsReg.filter(res => {
        if (res.name.toLocaleLowerCase().match(this.search.toLocaleLowerCase())) {
          return res.name.toLocaleLowerCase().match(this.search.toLocaleLowerCase());
        }
        else {
          return res.category.toLocaleLowerCase().match(this.search.toLocaleLowerCase());
        }
      });
    }
  }


}
