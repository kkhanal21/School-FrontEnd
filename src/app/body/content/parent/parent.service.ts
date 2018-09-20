import { Injectable } from '@angular/core';
import { HttpService } from "../../../helper/httpService";



//this is simple class that extends the httpservice class.
//this class is used by the teacher component class.
@Injectable()
export class ParentService extends HttpService {

    _getAll(pageNo, limit) {
        return this.get('parents?page=' + pageNo + '&limit=' + limit);
    }

    _save(payload) {
        return this.post('parents', payload);
    }

    _update(id, payload) {
        return this.put('parents', id, payload);
    }

    _delete(id) {
        return this.delete('parents', id);
    }

}
