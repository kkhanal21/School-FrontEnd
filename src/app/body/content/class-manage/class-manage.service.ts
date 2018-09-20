import { Injectable } from '@angular/core';
import { HttpService } from '../../../helper/httpService';

@Injectable()
export class ClassManageService extends HttpService {
  

  getAll(pageNo, limit) {
    return this.get('classes?page=' + pageNo + '&limit=' + limit);
  }

  saveClass(payload) {
    return this.post('classes', payload);
  }

  updateClass(id,payload) {
    return this.put('classes',id, payload);
  }

  deleteClass(id) {
    return this.delete('classes', id);
  }

}
