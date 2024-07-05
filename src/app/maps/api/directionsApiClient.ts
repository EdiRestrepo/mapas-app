import { HttpClient, HttpHandler, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Language } from "@maptiler/sdk";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DirectionsApiClient extends HttpClient {

  public baseUrl: string = 'https://api.maptiler.com/routes/driving';

  constructor(handler: HttpHandler){
    super(handler);
  }

  public override get<T>( url: string ){

    url = this.baseUrl + url;

    return super.get<T>(url, {
      params: {
        alternatives: false,
        geometries: 'geojson',
        language: 'es',
        overview: 'simplified',
        steps: false,
        key: environment.apiKey
      }
    });
  }
}
