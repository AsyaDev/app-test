import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Airport } from './airports/airport';
import { Pilot } from './pilots/pilot';
import { Airplane } from './airplanes/airplane';
import { MessageService } from './message.service';
import { forkJoin} from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AirportsService {
  public selectedAirport: Airport;
  public selectedAirplane: Airplane;
  public selectedPilot: Pilot;
  // URLs to web api
  private airportsUrl = 'api/airports';  
  private airplanesUrl = 'api/planes';
  private pilotsUrl = 'api/pilots';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET data from the server */
  getAirports (): Observable<Airport[]> {
    return this.http.get<Airport[]>(this.airportsUrl)
      .pipe(
        tap(_ => this.log('fetched airports')),
        catchError(this.handleError<Airport[]>('getAirports', []))
      );
  }
  getPilots(): Observable<Pilot[]> {
    return this.http.get<Pilot[]>(this.pilotsUrl)
      .pipe(
        tap(_ => this.log('fetched pilots')),
        catchError(this.handleError<Pilot[]>('getPilots', []))
      );
  }
  getPlanes(): Observable<Airplane[]> {
    return this.http.get<Airplane[]>(this.airplanesUrl)
      .pipe(
        tap(_ => this.log('fetched planes')),
        catchError(this.handleError<Airplane[]>('getPlanes', []))
      );
  }
  getAirportByID(id: number): Observable<Airport>{
    const url = `${this.airportsUrl}/${id}`;
    return this.http.get<Airport>(url).pipe(
      tap(_ => this.log(`fetched airport id=${id}`)),
      catchError(this.handleError<Airport>(`getAirport id=${id}`))
    );
}

getPilotByID(id:number):Observable<Pilot>{  
  // const url = `${pilotsUrl}/?airports=<:${id}>`; 
  // let httpParams = new HttpParams();
  // array.forEach(id => {
  //   httpParams = httpParams.append('id', id);
  // });
  const url = `${this.pilotsUrl}/${id}`;
  return this.http.get<Pilot>(url).pipe(
      tap(_ => this.log(`fetched pilot id=${id}`)),
      catchError(this.handleError<Pilot>(`getPilot id=${id}`))
    );
}
getPlaneByID(id:number):Observable<Airplane>{  
  const url = `${this.airplanesUrl}/${id}`;
  return this.http.get<Airplane>(url).pipe(
      tap(_ => this.log(`fetched plane id=${id}`)),
      catchError(this.handleError<Airplane>(`getPlane id=${id}`))
    );
}
getAirportsNames(ids:[]){ 
  const reqArray = [];
  ids.forEach(id => {
    reqArray.push(this.getAirportByID(id))
  })      
  return forkJoin(...reqArray).pipe( 
    tap(data => console.log(data)));
}
getPlanesNames(ids:[]){ 
  const reqArray = [];
  ids.forEach(id => {
    reqArray.push(this.getPlaneByID(id))
  })      
  return forkJoin(...reqArray).pipe(  
    tap(data => console.log(data)));
}
getPilotsNames(ids:[]){ 
    const reqArray = [];
    ids.forEach(id => {
      reqArray.push(this.getPilotByID(id))
    })      
    return forkJoin(...reqArray).pipe(
      tap(data => console.log(data)));
}
updateAirport (airport: Airport): Observable<Airport> {
  return this.http.put(this.airportsUrl, airport, this.httpOptions).pipe(
    tap(_ => this.log(`updated airport id=${airport.id}`)),
    catchError(this.handleError<any>('updateAirport'))
  );
}
updateAirplane(plane: Airplane): Observable<Airplane> {
  return this.http.put(this.airplanesUrl, plane, this.httpOptions).pipe(
    tap(_ => this.log(`updated plane id=${plane.id}`)),
    catchError(this.handleError<any>('updateAirplane'))
  );
}
updatePilot(pilot: Pilot): Observable<Pilot> {
  return this.http.put(this.pilotsUrl, pilot, this.httpOptions).pipe(
    tap(_ => this.log(`updated pilot id=${pilot.id}`)),
    catchError(this.handleError<any>('updatePilot'))
  );
}
deleteAirport (airport: Airport | number): Observable<Airport> {
  const id = typeof airport === 'number' ? airport : airport.id;
  const url = `${this.airportsUrl}/${id}`;

  return this.http.delete<Airport>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted airport id=${id}`)),
    catchError(this.handleError<Airport>('deleteAirport'))
  );
}
deleteAirplane (plane: Airplane | number): Observable<Airplane> {
  const id = typeof plane === 'number' ? plane : plane.id;
  const url = `${this.airplanesUrl}/${id}`;

  return this.http.delete<Airplane>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted airplane id=${id}`)),
    catchError(this.handleError<Airplane>('deleteAirplane'))
  );
}
deletePilot (pilot: Pilot | number): Observable<Pilot> {
  const id = typeof pilot === 'number' ? pilot : pilot.id;
  const url = `${this.pilotsUrl}/${id}`;

  return this.http.delete<Pilot>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted pilot id=${id}`)),
    catchError(this.handleError<Pilot>('deletePilot'))
  );
}
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /** Log a AirportsServise message with the MessageService */
  private log(message: string) {
    this.messageService.add(`AirportsServise: ${message}`);
  }
}

