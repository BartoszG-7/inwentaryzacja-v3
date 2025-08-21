import {
  Component,
  ElementRef,
  Inject,
  Injectable,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Treebar } from '../../treebar/treebar';
import { TreebarSharedService } from '../../home/treebar.share.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MagazynRightSecondService {
  constructor(private httpClient: HttpClient) {}

  getDevices(typeId: string | undefined): Observable<any> {
    return this.httpClient.get<JSON>(
      'http://localhost:3000/data/get-device-list/' + typeId
    );
  }
}
