import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  generateToken(): number {
    // set timezone to ensure consistency between generation and validation
    const now: string = dayjs(
      new Date().toLocaleString('en-US', {timeZone: 'America/New_York'})
    ).format('HHmm');
    return parseInt(now);
  }

  // Could create a class for the payload to ensure payload is in the correct format
  postUserLogin(payload: any): Observable<any> {
    const url = `${environment.goBackendBaseUrl}/user/login`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = { headers };
    return this.http.post(url, payload, options);
  }
}
