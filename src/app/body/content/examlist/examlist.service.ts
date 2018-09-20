import { Injectable } from '@angular/core';
import { HttpService } from "../../../helper/httpService";

@Injectable()
export class ExamlistService extends HttpService {

    deleteExamList(id) {
        return this.delete('exams', id);
    }


}
