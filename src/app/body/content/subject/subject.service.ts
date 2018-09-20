import { Injectable } from '@angular/core';
import { HttpService } from '../../../helper/httpService';

@Injectable()
export class SubjectService extends HttpService {

  getAll() {
    return this.get('subjects');
  }

}
