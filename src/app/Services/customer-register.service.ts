import { Injectable } from '@angular/core';
import { config } from '../config';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerRegisterService {

  constructor(private http: HttpClient) { }

  SaveCustomerData(customer: any): Observable<any> {
    return this.http.post<any>(`${config.EndpointPath}/CreateCustomer`, customer).pipe(
      tap({
        next: (response) => {
          console.log('Save Customer Data success:', response);
        },
        error: (error) => {
          console.error('Save Customer Data error:', error);
        }
      })
    );
  }

  GetCustomerById(id: number): Observable<any> {
    return this.http.get<any>(`${config.EndpointPath}/GetCustomerByID`, { params: { id: id.toString() } }).pipe(
      tap({
        next: (response) => {
          console.log('Get Customer Details By Id success:', response);
        },
        error: (error) => {
          console.error('Get Customer Details By Id  error:', error);
        }
      })
    );
  }
  CustomerDetails(): Observable<any> {
    return this.http.get<any>(`${config.EndpointPath}/GetCustomers`).pipe(
      tap({
        next: (response) => {
          console.log('Get Customer Details success:', response);
        },
        error: (error) => {
          console.error('Get Customer Details error:', error);
        }
      })
    );
  }

    
  DeleteCustomerById(id: number): Observable<any> {
    return this.http.delete<any>(`${config.EndpointPath}/DeleteCustomerByID`, { params: { id: id.toString() } }).pipe(
      tap({
        next: (response) => {
          console.log('Delete Customer By Id success:', response);
        },
        error: (error) => {
          console.error('Delete Customer By Id error:', error);
        }
      })
    );
  }

}
