import { Injectable } from '@angular/core';
import { HttpService } from "../../../helper/httpService";

@Injectable()
export class StudentService extends HttpService {

    _getAll(pageNo, limit) {
        return this.get('students?page=' + pageNo + '&limit=' + limit);
    }

    _save(payload) {
        return this.post('students', payload);
    }

    _update(id, payload) {
        return this.put('students', id, payload);
    }

    _delete(id) {
        return this.delete('students', id);
    }
}
