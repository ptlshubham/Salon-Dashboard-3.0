import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import Swal from 'sweetalert2';
import { Servicescustm } from './servicescustm.model';
import { ServicescustmService } from './servicescustm.service';

@Component({
  selector: 'app-servicescustm',
  templateUrl: './servicescustm.component.html',
  styleUrls: ['./servicescustm.component.css']
})
export class ServicescustmComponent implements OnInit {
  public servicescustmModel: Servicescustm = new Servicescustm;
  public servicescustmList: Servicescustm[];
  public servicescustm:Servicescustm[];
  submitButton: Boolean = false;
  search: string = '';
  constructor(
    private servicescustmService: ServicescustmService,
    private apiService: ApiService
  ) {
    this.getAllServicescustm();
  }

  ngOnInit(): void {
  }
  
  getAllServicescustm() {
    this.servicescustmService.getAllServicescustmList().subscribe((data: any) => {
      this.servicescustmList = data;
      this.servicescustm=data;
      for (let i = 0; i < this.servicescustmList.length; i++) {
        this.servicescustmList[i].index = i + 1;
      }
    });
  }
  searchServicescustmList(val) {
    if (this.search == '') {
      console.log(val)
      this.servicescustm = this.servicescustmList;
    } else {
      console.log(val)
      this.transform(this.servicescustmList, val);
    }

  }
  transform(servicescustm: Servicescustm[], searchValue: string) {
    this.servicescustm = [];
    servicescustm.forEach(element => {
      if (element.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
        this.servicescustm.push(element);
      }
     })
     console.log(this.servicescustm)
  }

}
