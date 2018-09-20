import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BodyComponent } from './body/body.component';
import { QuickLaunchPanelComponent } from './quick-launch-panel/quick-launch-panel.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './body/content/dashboard/dashboard.component';
import { ChatPanelComponent } from './body/chat-panel/chat-panel.component';
import { ContentComponent } from './body/content/content.component';
import { ClassComponent } from './body/content/class/class.component';
import { StudentComponent } from './body/content/student/student.component';
import { TeacherComponent } from './body/content/teacher/teacher.component';
import { SubjectComponent } from './body/content/subject/subject.component';
import { StudentAddComponent } from './body/content/student-add/student-add.component';
import { StudentBulkAddComponent } from './body/content/student-bulk-add/student-bulk-add.component';
import { StudentInformationComponent } from './body/content/student-information/student-information.component';
import { StudentPromotionComponent } from './body/content/student-promotion/student-promotion.component';
import { ParentComponent } from './body/content/parent/parent.component';
import { LibrarianComponent } from './body/content/librarian/librarian.component';
import { AccountantComponent } from './body/content/accountant/accountant.component';
import { ClassManageComponent } from './body/content/class-manage/class-manage.component';
import { ClassManageSectionComponent } from './body/content/class-manage-section/class-manage-section.component';
import { ClassAcademicSyllabusComponent } from './body/content/class-academic-syllabus/class-academic-syllabus.component';
import { DailyAttendanceComponent } from './body/content/daily-attendance/daily-attendance.component';
import { DailyAttendanceReportComponent } from './body/content/daily-attendance-report/daily-attendance-report.component';
import { ExamlistComponent } from './body/content/examlist/examlist.component';
import { ExamGradesComponent } from './body/content/exam-grades/exam-grades.component';
import { ExamManageMarksComponent } from './body/content/exam-manage-marks/exam-manage-marks.component';
import { ExamSendMarksBySmsComponent } from './body/content/exam-send-marks-by-sms/exam-send-marks-by-sms.component';
import { ExamTabulationSheetComponent } from './body/content/exam-tabulation-sheet/exam-tabulation-sheet.component';
import { ExamQuestionPaperComponent } from './body/content/exam-question-paper/exam-question-paper.component';
//services
import { TeacherService } from './body/content/teacher/teacher.service';
import { ExamlistService } from "./body/content/examlist/examlist.service";
import { StudentAddService } from "./body/content/student-add/student-add.service";
import { StudentService } from "./body/content/student/student.service";
import { ParentService } from "./body/content/parent/parent.service";
import { ExamTypeComponent } from './body/content/exam-type/exam-type.component';
import { ExamTypeService } from './body/content/exam-type/exam-type.service';
import { ClassManageService } from './body/content/class-manage/class-manage.service';
import { SubjectService } from './body/content/subject/subject.service';


const routes = [
  {
    path: '',
    component: DashboardComponent
    // children: [
    //   { path: '',redirectTo:'home',pathMatch:'full' },
    //   { path: 'home', component: HomeComponent },
    //   { path: 'menu', component: MenuComponent },
    //   { path: 'contact', component: ContactComponent },
    //   { path: 'about', component: AboutComponent }]
  },
  {
    path: 'class',
    component: ClassComponent
  },
  {
    path: 'student',
    component: StudentComponent
  },
  {
    path: 'subject',
    component: SubjectComponent
  },
  {
    path: 'teacher',
    component: TeacherComponent
  }, {
    path: 'studentAdd',
    component: StudentAddComponent
  }, {
    path: 'studentBulkAdd',
    component: StudentBulkAddComponent
  }, {
    path: 'studentInformation',
    component: StudentInformationComponent
  }, {
    path: 'studentPromotion',
    component: StudentPromotionComponent
  }, {
    path: 'parent',
    component: ParentComponent
  }, {
    path: 'librarian',
    component: LibrarianComponent
  }, {
    path: 'accountant',
    component: AccountantComponent
  }, {
    path: 'manageClass',
    component: ClassManageComponent
  }, {
    path: 'manageSection',
    component: ClassManageSectionComponent
  }, {
    path: 'academicSyllabus',
    component: ClassAcademicSyllabusComponent
  }, {
    path: 'dailyAttendance',
    component: DailyAttendanceComponent
  }, {
    path: 'attendanceReport',
    component: DailyAttendanceReportComponent
  }, {
    path: 'examList',
    component: ExamlistComponent
  }, {
    path: 'examType',
    component: ExamTypeComponent
  }, {
    path: 'examGrades',
    component: ExamGradesComponent
  }, {
    path: 'manageMarks',
    component: ExamManageMarksComponent
  }, {
    path: 'sendmarksbysms',
    component: ExamSendMarksBySmsComponent
  }, {
    path: 'tabulationSheet',
    component: ExamTabulationSheetComponent
  }, {
    path: 'questionPaper',
    component: ExamQuestionPaperComponent
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },

]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BodyComponent,
    QuickLaunchPanelComponent,
    FooterComponent,
    DashboardComponent,
    ChatPanelComponent,
    ContentComponent,
    ClassComponent,
    StudentComponent,
    TeacherComponent,
    SubjectComponent,
    StudentAddComponent,
    StudentBulkAddComponent,
    StudentInformationComponent,
    StudentPromotionComponent,
    ParentComponent,
    LibrarianComponent,
    AccountantComponent, ClassManageComponent, ClassManageSectionComponent, ClassAcademicSyllabusComponent, DailyAttendanceComponent, DailyAttendanceReportComponent, ExamlistComponent, ExamGradesComponent, ExamManageMarksComponent, ExamSendMarksBySmsComponent, ExamTabulationSheetComponent, ExamQuestionPaperComponent, ExamTypeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [TeacherService,
    ExamlistService,
    StudentAddService,
    StudentService,
    ParentService,
    ExamTypeService,
    ClassManageService,    
    SubjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
