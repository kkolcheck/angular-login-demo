import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
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
    ).format('hhmm');
    return parseInt(now);
  }

  postUserLogin(payload: any): Observable<any> {
    const url = `${environment.goBackendBaseUrl}/user/login`;
    return this.http.post(url, payload);
  }
}
