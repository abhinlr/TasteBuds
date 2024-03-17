import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  private siteObject = new BehaviorSubject<any>(null);
  public readonly $siteObject: Observable<any> = this.siteObject.asObservable();
  public loading = new BehaviorSubject<any>(false);

  constructor() { }
}
