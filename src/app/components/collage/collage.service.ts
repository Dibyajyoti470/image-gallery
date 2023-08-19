import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Image } from '../../models/ImageModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CollageService {
  constructor(private http: HttpClient) {}

  fetchImages(url: string, page: number, limit: number): Observable<Image[]> {
    let queryParams = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<Image[]>(url, { params: queryParams });
  }

  createCollage(images: Image[], cols: number): Image[][] {
    let collage: Image[][] = [];

    while (images.length > 0) {
      const row = images.splice(0, cols);
      collage.push(row);
    }

    return collage;
  }
}
