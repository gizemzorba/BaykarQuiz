import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Json} from '../models/json';

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  url: string = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {
  }

  getDatas(): Observable<Json[]> {
    return this.http.get<Json[]>(this.url).pipe(map(data => {
        return data;
      })
    );
  }
}
