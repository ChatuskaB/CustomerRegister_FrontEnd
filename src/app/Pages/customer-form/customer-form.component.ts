import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerRegisterService } from '../../Services/customer-register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})


export class CustomerFormComponent  implements OnInit{
  customeredit: any = null;
  customers: any[] = [];
  customer!: FormGroup;

  constructor(private CustomerService: CustomerRegisterService,private formbuild: FormBuilder) { }

    ngOnInit() {
      this.FormData()
      this.GetAllCustomerDetails();
    }

    FormData(){
      this.customer = this.formbuild.group({
        CustomerId: [0],
        CusName: ['', Validators.required],
        CusPhoneNumber: ['', Validators.required],
        CusAddress: ['', Validators.required],
        CusEmail: ['', Validators.required]

      });
  
    }

    Cancel(){
      this.customer.reset();
    }

    GetAllCustomerDetails(){
      this.CustomerService.CustomerDetails().subscribe(result=>{
        this.customers = Object.assign([],result);
      })
    }
  
    LoadCustomerData(){
      this.customer = this.formbuild.group({
        CustomerId: [this.customeredit.customerId],
        CusName: [this.customeredit.cusName],
        CusPhoneNumber: [this.customeredit.cusPhoneNumber],
        CusAddress: [this.customeredit.cusAddress],
        CusEmail: [this.customeredit.cusEmail]
      });
    }

    SaveFormData() {
      const formData = new FormData();
      Object.keys(this.customer.value).forEach(key => {
        formData.append(key, this.customer.value[key]);
      });

      if (this.customer.invalid) {
        Swal.fire('Error', 'Please fill all mandatory fields.', 'error');
        return;
      }
        this.CustomerService.SaveCustomerData(formData).subscribe(
        result => {
         Swal.fire('Success', 'Saved Successfully', 'success');
          this.GetAllCustomerDetails();
          this.customer.reset();
          this.FormData();
        },
        (error: HttpErrorResponse) => {
          Swal.fire('Error', 'An error occurred', 'error');
        }
      );
    }

  //Edit Selected Record
  EditCustomer(id: number) {
    this.CustomerService.GetCustomerById(id).subscribe(result => {
      this.customeredit = Object.assign([], result);
       this.LoadCustomerData();
    })
  }

  DeleteCustomer(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are You Sure To Delete This Record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.CustomerService.DeleteCustomerById(id).subscribe(
          result => {
            Swal.fire(
              'Deleted!',
              'Your record has been deleted.',
              'success'
            );
            this.GetAllCustomerDetails();
          },
           (error: HttpErrorResponse) => {
            Swal.fire('Error', 'An error occurred', 'error');
          }
        );
      }
    });
  }
}
