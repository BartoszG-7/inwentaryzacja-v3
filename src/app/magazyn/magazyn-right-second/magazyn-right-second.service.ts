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
      'http://172.16.61.142:3000/data/get-device-list/' + typeId
    );
  }

  updateDevice(id: string, body: any): Observable<any> {
    return this.httpClient.patch<JSON>(
      'http://172.16.61.142:3000/device/' + id,
      body
    );
  }
}
