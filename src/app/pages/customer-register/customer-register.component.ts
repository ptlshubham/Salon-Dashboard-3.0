import { Component, OnInit, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { CustomerService } from "app/customer/customer.service";
import { Customer } from "app/customer/customer.model";
import { ApiService } from "app/api.service";

declare var $: any;
// moduleId: module.id,
@Component({

  selector: "customer-register-cmp",
  templateUrl: "./customer-register.component.html",
})
export class CustomerRegisterComponent implements OnInit {
  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  focus5;
  test: Date = new Date();
  private toggleButton;
  private sidebarVisible: boolean;
  private nativeElement: Node;
  public customerModel: Customer = new Customer();
  registerForm: boolean = false;
  otpBox: boolean = false;
  role: any = [];
  selectedRole: string = 'Customer';
  emailResp: any;
  otpResp: any;
  customerList: any;
  public timeLeft: number = 120;
  interval;

  constructor(
    private element: ElementRef,
    private customerService: CustomerService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  checkFullPageBackgroundImage() {
    var $page = $(".full-page");
    var image_src = $page.data("image");
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("customer-register-page");
    if (image_src !== undefined) {
      var image_container =
        '<div class="full-page-background" style="background-image: url(' +
        image_src +
        ') "/>';
      $page.append(image_container);
    }
  }

  ngOnInit() {
    this.checkFullPageBackgroundImage();

    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggle")[0];

    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      $(".card").removeClass("card-hidden");
    }, 700);
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("customer-register-page");
  }
  sidebarToggle() {
    var toggleButton = this.toggleButton;
    var body = document.getElementsByTagName("body")[0];
    var sidebar = document.getElementsByClassName("navbar-collapse")[0];
    if (this.sidebarVisible == false) {
      setTimeout(function () {
        toggleButton.classList.add("toggled");
      }, 500);
      body.classList.add("nav-open");
      this.sidebarVisible = true;
    } else {
      this.toggleButton.classList.remove("toggled");
      this.sidebarVisible = false;
      body.classList.remove("nav-open");
    }
  }
  verification() {
    this.registerForm = true;
    this.otpBox = true;
    this.customerModel.role = this.selectedRole;
    this.customerModel.isMembership = false;
    this.startTimer();
    this.customerService.emailVerify(this.customerModel).subscribe((data) => {
      if (data === "Error") {
        this.apiService.showNotification("top", "right", "Email not Sent Please Check Your Email and Resend.", "danger");
      } else {
        this.emailResp = data.insertId;
        this.apiService.showNotification("top", "right", "Email Sent Successfully on your Email Address.", "success");
      }
    });
  }
  cancelIt() {
    this.registerForm = false;
    this.otpBox = false;
  }
  saveCustomerDetail() {
    this.customerModel.id = this.emailResp;
    this.customerService.getOtpforRegister(this.customerModel).subscribe((data) => {
      if (data[0].otp === this.customerModel.otp) {
        this.customerService.saveUserCustomerList(this.customerModel).subscribe((data: any) => {
          this.customerList = data;
          this.apiService.showNotification("top", "right", "Employee Added Successfully.", "success");
          this.router.navigate(['pages/login']);
        });
      } else {
        this.apiService.showNotification("top", "right", "OTP doesnot matched.", "danger");
      }
      this.otpResp = data[0].userid;
      this.otpBox = true;
    });
  }
  resendOTP() {
    this.customerService.removeLastInsertedOTP(this.customerModel).subscribe((data: any) => {
        this.apiService.showNotification('top', 'right', 'OTP Resent Successfully.', 'success');
        this.timeLeft=120;
        this.startTimer();
        this.verification();

    })
}

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft == 0) {
        clearInterval(this.interval);
      } else {
        this.timeLeft--;

      }
    }, 1000)
  }
}

