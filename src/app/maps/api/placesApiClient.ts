import { HttpClient, HttpHandler, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Language } from "@maptiler/sdk";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlacesApiClient extends HttpClient {

  public baseUrl: string = 'https://api.maptiler.com/geocoding';

  constructor(handler: HttpHandler){
    super(handler);
  }

  public override get<T>( url: string, options: {
    params?:HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
  } ){

    url = this.baseUrl + url;

    return super.get<T>(url, {
      params: {
        Language: 'es',
        limit: 5,
        key: environment.apiKey,
        ...options.params
      }
    });
  }
}
