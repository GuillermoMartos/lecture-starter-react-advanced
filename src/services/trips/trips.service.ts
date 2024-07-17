import { TRIPS_BASE_PATH } from '../../common/constants';
import {  AllTripsResponse, TripResponse } from '../../common/types';
import { Accept } from '../constants';
import { Http } from '../http/http.service';

type Constructor={
    baseUrl: string,
    http: Http
}

export class Trips{
  private http: Http;
  private baseUrl: string;
  private basePath: string;

  constructor({ http, baseUrl }: Constructor) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.basePath= TRIPS_BASE_PATH;
  }
    
  public getAllTrips(token: string): Promise<AllTripsResponse>{
    return this.http.load(
      this.getUrl(),
      { accept: Accept.JSON, authorization: `Bearer ${token}` });
  }

  public getTripById(id: string, token: string): Promise<TripResponse>{
    return this.http.load(
      this.getUrl(id),
      { accept: Accept.JSON, authorization: `Bearer ${token}` });
  }
    
  private getUrl(path:string = ''):string {
    return `${this.baseUrl}${this.basePath}${path}`;
  }
    
}