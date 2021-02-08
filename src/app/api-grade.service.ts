import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiGradeService {

  baseUrlGrade: string = 'http://localhost/php/grade';

  constructor(private httpClient : HttpClient) { }

  public gradeRegistration(name, hourlyIntensity){
    return this.httpClient.post<any>(this.baseUrlGrade + 'register.php', {name, hourlyIntensity})
    .pipe(map(Users => {
      return Users;
    }));
  }
  
  public gradeEdit(grade: any) {
    return this.httpClient.post(this.baseUrlGrade + '/gradeEdit.php', JSON.stringify(grade));  
  }

  public gradeDelete(id: number) {
    return this.httpClient.get(this.baseUrlGrade + '/gradeDelete.php?id='+id);
  }

  public gradeList() {
    return this.httpClient.get(this.baseUrlGrade + '/gradeList.php');
  }

  public gradeSelected(id: number) {
    return this.httpClient.get(this.baseUrlGrade + '/gradeSelected.php?id='+id);
  }
}
