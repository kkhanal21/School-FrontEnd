import { Injectable } from '@angular/core';
import { HttpService } from '../../../helper/httpService';
import "rxjs/Rx";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

@Injectable()
export class ExamTypeService extends HttpService {

    _getAll(pageNo, limit) {
        return this.get('examtypes?page=' + pageNo + '&limit=' + limit);
    }

    _save(payload) {
        return this.post('examtypes', payload);
    }

    _update(id, payload) {
        return this.put('examtypes', id, payload);
    }

    _delete(id) {
        return this.delete('examtypes', id);
    }

}
