import { BOOKINGS_BASE_PATH } from '../../common/constants';
import {  AllMyBookingsResponse, BookingCreateRequestBody, CancelBookingResponse, MyBookingResponse } from '../../common/types';
import { Accept, ContentType } from '../constants';
import { Http } from '../http/http.service';

type Constructor={
    baseUrl: string,
    http: Http
}

export class Booking{
  private http: Http;
  private baseUrl: string;
  private basePath: string;

  constructor({ http, baseUrl }: Constructor) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.basePath= BOOKINGS_BASE_PATH;
  }
    
  public getMyBookings(token: string): Promise<AllMyBookingsResponse>{
    return this.http.load(
      this.getUrl(), 
      { accept: Accept.JSON, authorization: `Bearer ${token}` });
  }

  public createNewBooking(payload: BookingCreateRequestBody, token: string, id: string):
        Promise<MyBookingResponse>{
    return this.http.load(
      this.getUrl(id),
      {
        method:'POST',
        accept: Accept.JSON,
        contentType: ContentType.JSON,
        payload: this.http.stringifyPayload(payload),
        authorization: `Bearer ${token}`
      });
  }
  
  public cancelBookingById(token: string, id:string):
        Promise<CancelBookingResponse>{
    return this.http.load(
      this.getUrl(id),
      {
        method:'DELETE',
        accept: Accept.TEXT,
        authorization: `Bearer ${token}`
      });
  }
    
  private getUrl(path:string = ''):string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
}