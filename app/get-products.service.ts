import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Product } from './models/product';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GetProductsService {

  apiUrl = 'https://pacific-eyrie-39073.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

  // This method is making a http request to the api to get the products from the selected parameters.
  getProducts(productParameters: Product) {
    const params = new HttpParams({
      fromObject: {
        'DE_CATE': productParameters.DE_CATE,
        'DE_EQUI': productParameters.DE_EQUI,
        'DE_FAMI': productParameters.DE_FAMI
      }
    });
    return this.httpClient.get<Product[]>(this.apiUrl + '/products', {params});
  }

  // This method is making a http request to the api to get the available category options.
  getDistinctCategory(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.apiUrl + '/distinctcategory');
  }

  // This method is making a http request to the api to to get the available brands with the category
  // as parameter.
  getDistinctBrand(selectedCategory): Observable<string[]> {
    const params = new HttpParams({
      fromObject: {
        'selectedCategory': selectedCategory
      }
    });
    return this.httpClient.get<string[]>(this.apiUrl + '/distinctbrand', {params});
  }

  // This method is making a http request to the api to to get the available families with the category
  // and brand as parameters.
  getDistinctFamily(selectedCategory, selectedBrand): Observable<string[]> {
    const params = new HttpParams({
      fromObject: {
        'selectedCategory': selectedCategory,
        'selectedBrand': selectedBrand
      }
    });
    return this.httpClient.get<string[]>(this.apiUrl + '/distinctfamily', {params});
  }


}
