import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Map, MapStyle, Marker, config, Popup } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements OnInit, AfterViewInit, OnDestroy {

  map: Map | undefined;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ){}



  ngOnInit(): void {
    config.apiKey = 'RqCNHjlpCz2WKQ5rf4FW';
    console.log( this.placesService.useLocation );
  }

  ngAfterViewInit(): void {
    if ( !this.placesService.useLocation ) throw Error('No hay placesService.userLocation');
    // let [longitude, latitude] = this.placesService.useLocation || [];

    this.map = new Map({

      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS,
      center: this.placesService.useLocation,
      zoom:14
      });

      const popup = new Popup()
        .setHTML(`
          <h6>Aquí estoy</h6>
          <span>Estoy en este lugar del mundo</span>
        `);

      new Marker({color: 'red'})
          .setLngLat( this.placesService.useLocation )
          .setPopup( popup )
          .addTo(this.map)

      this.mapService.setMap( this.map );


    }


  ngOnDestroy(): void {
    this.map?.remove();
  }


}
