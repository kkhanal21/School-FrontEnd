import { Injectable } from '@angular/core';
import { HttpService } from '../../../helper/httpService';


//this is simple class that extends the httpservice class.
//this class is used by the teacher component class.
@Injectable()
export class TeacherService extends HttpService {

}
