import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LngLatLike } from '@maptiler/sdk';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public useLocation!: [number, number];

  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {

    return !!this.useLocation; //todo: con los simbolos !! con el primero digo que no esta la ubicación y con el segundo ! digo que si esta
  }

  constructor(
    private placesApi: PlacesApiClient,
    private mapService: MapService,
  ) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]>{

    return new Promise( (resolve, reject ) => {

      navigator.geolocation.getCurrentPosition(
        ( {coords } ) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve( this.useLocation )
        },
        ( err ) => {
          alert('No se pudo obtener la geolocalización')
          console.log(err);
          reject();
        }
      );
    });
  }


  getPlacesByQuery(query: string = ''){
    //todo: evaluar cuando el query es nulo

    if(query.length === 0){
      this.isLoadingPlaces = false;
      this.places = [];
      return;

    }

    if( !this.useLocation ) throw Error('No hay userLocation')

    this.isLoadingPlaces = true;

    this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.useLocation.join(',')
      }
    })
      .subscribe( resp => {

        console.log(resp.features)
        this.isLoadingPlaces =false;

        this.places = resp.features;

        this.mapService.createMarkersFromPlaces( this.places, this.useLocation );

      })
  }

  deletePlaces(){
    this.places = [];
  }
}
