import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor( private http: HttpClient) {
    // Hacer persistente la informacion(Que no se borre el hisotorial al momento de recargar)
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultadosStorage')!) || [];
  }

  private _historial : string[] = [];
  private apiKey     : string = 'YrL0wbecZ2AOBuleUGRBKrfspAU0Jx91';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    /*
    Validacion para que no impirma lo mismo es decir no se permiten valores
    repetidos. Es por eso que el query lo transformamos a minusculas
    para evitar incovenientes
    */
    if (!this._historial.includes(query)) {
      this._historial.unshift(query); 
      // Para que solo salgan 10 en el sidebar
      this._historial = this._historial.splice(0, 10);

      // Grabado en localStorage
      localStorage.setItem('historial', JSON.stringify( this._historial ));
    }

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', query);
    
    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params } )
    .subscribe( (resp) => {
      // console.log( resp.data ); // data es igual a la interfaz Gif
      this.resultados = resp.data;
      localStorage.setItem('resultadosStorage', JSON.stringify(this.resultados));
    })

  }
}
