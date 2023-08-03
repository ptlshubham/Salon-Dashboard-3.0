import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import Swal from 'sweetalert2';
import { Webbanners } from './banners.model';
import { BannersService } from './banners.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {

  isAddShow = true;
  image: any;
  positiion: any = []
  selectedPosition: any;
  imageError: string;
  isImageSaved: boolean = true;
  cardImageBase64: string;
  public WebbannersModel: Webbanners = new Webbanners;
  public webImage: Webbanners[] = [];
  constructor(
    private bannersServie: BannersService,
    private apiService: ApiService
  ) {
    this.positiion = [
      {
        name: 'Top'
      },
      // {
      //   name: 'Middle',
      // },
      // {
      //   name: 'End',
      // },
      // {
      //   name: 'Deal of the Day',
      // },
      // {
      //   name: 'Deal of the Day Center',
      // }
    ]
    this.getBanners();
  }

  ngOnInit(): void {
  }
  addNewImages() {
    this.isAddShow = false;
  }
  cancelAddImage() {
    this.isAddShow = true;
  }
  selectPosition(name) {
    this.positiion.forEach(element => {
      if (element.name == name) {
        this.selectedPosition = element.name;
      }
    })

  }
  select(event) {

    let max_height;
    let max_width;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      if (this.selectedPosition == 'Top') {
        max_height = 200;
        max_width = 1000;
      }
      else if (this.selectedPosition == 'Middle') {
        max_height = 400;
        max_width = 1200;
      }
      else if (this.selectedPosition == 'End') {
        max_height = 400;
        max_width = 1200;
      }
      else if (this.selectedPosition == 'Deal of the Day') {
        max_height = 800;
        max_width = 600;
      }
      else if (this.selectedPosition == 'Deal of the Day Center') {
        max_height = 570;
        max_width = 390;
      }


      if (event.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      // if (!_.includes(allowed_types, event.target.files[0].type)) {
      //     this.imageError = 'Only Images are allowed ( JPG | PNG )';
      //     return false;
      // }
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
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;

            const formdata = new FormData();
            formdata.append('file', file);


            this.bannersServie.uploadImage(formdata).subscribe((response) => {
              this.image = response;

              this.isImageSaved = true;


            })
            // this.previewImagePath = imgBase64Path;
          }
        };
      };

      reader.readAsDataURL(event.target.files[0]);
    }




  }
  saveBannersImage() {

    this.WebbannersModel.bannersimage = this.image;
    this.WebbannersModel.name = this.selectedPosition;
    this.WebbannersModel.status = true;
    this.bannersServie.saveWebBannersImage(this.WebbannersModel).subscribe(response => {
      this.apiService.showNotification('top', 'right', 'Banners Successfully Added.', 'success');
      this.getBanners();
      this.isAddShow = true;
    })
  }
  getBanners() {

    this.bannersServie.getWebBanners().subscribe((data: any) => {
      this.webImage = data;
       
      for (let i = 0; i < this.webImage.length; i++) {
        this.webImage[i].index = i + 1;
      }
    });

  }
  removeBannersImage(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete!",
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
        this.bannersServie.removeWebBanners(id).subscribe((req) => {
          this.apiService.showNotification('top', 'right', 'Banners Successfully Removed.', 'success');
          
        })
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Your banner has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
        this.getBanners();
      }
    })
  }

  activeBanners(ind) {
    this.webImage[ind].status = true;
    this.bannersServie.activeDeavctiveWebBanners(this.webImage[ind]).subscribe((req) => {
    })
  }
  deactiveBanners(ind) {
    this.webImage[ind].status = false;
    this.bannersServie.activeDeavctiveWebBanners(this.webImage[ind]).subscribe((req) => {

    })
  }



}
