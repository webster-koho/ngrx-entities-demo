import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CategoryData } from './categories.data';

export interface Category {
  id: string;
  label: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }

  getCategories() {
    const response = new Subject<Category[]>();

    setTimeout(() => {
      response.next(CategoryData);
      response.complete();
    }, 1500);

    return response;
  }
}
