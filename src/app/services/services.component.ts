import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import Swal from 'sweetalert2';
import { Services } from './services.model';
import { ServicesService } from './services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  public servicesModel: Services = new Services;
  public servicesList: Services[];
  public services:Services[];
  submitButton: Boolean = false;
  search: string = '';
  constructor(
    private servicesService: ServicesService,
    private apiService: ApiService
  ) {
    this.getAllServices();
  }

  ngOnInit(): void {
  }
  saveServicesDetail() {
    this.servicesService.saveServiceList(this.servicesModel).subscribe((data: any) => {
      this.servicesList = data;
        this.getAllServices();
      this.apiService.showNotification('top', 'right', 'Services Added Successfully.', 'success');
    })
  }
  getAllServices() {
    this.servicesService.getAllServicesList().subscribe((data: any) => {
      this.servicesList = data;
      this.services=data;
      for (let i = 0; i < this.servicesList.length; i++) {
        this.servicesList[i].index = i + 1;
      }
    });
  }
  searchServicesList(val) {
    if (this.search == '') {
      console.log(val)
      this.services = this.servicesList;
    } else {
      console.log(val)
      this.transform(this.servicesList, val);
    }

  }
  transform(services: Services[], searchValue: string) {
    this.services = [];
    services.forEach(element => {
      if (element.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
        this.services.push(element);
      }
     })
     console.log(this.services)
  }

  viewServicesDetails(data) {
    this.servicesModel = data;
    this.submitButton = true;
  }
  cancelUpdateButton() {
    this.submitButton = false;
  }
  updateServicesDetail() {
    this.servicesModel
    this.servicesService.updateServicesList(this.servicesModel).subscribe((req) => {
      this.apiService.showNotification('top', 'right', 'Update Services Successfully.', 'success');
    })
  }
  removeServices(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete! If you delete Services then all the Service Price and list will be delete.",
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
        this.servicesService.removeServicesList(id).subscribe((req) => {
          this.apiService.showNotification('top', 'right', 'Service removed Successfully.', 'success');

        })
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Your Service has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
        this.getAllServices();
      }
    })


  }

}
