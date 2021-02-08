import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Router} from '@angular/router';
import { first } from 'rxjs/operators';
import { ApiGradeService } from '../api-grade.service';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {

  gradeForm: FormGroup;

  public arrayResultList = [
    {
      id: 1,
      name: '',
      hourlyIntensity: ''
    }];

  constructor(private fb: FormBuilder, private dataService: ApiGradeService,private router: Router) {
    this.gradeForm = this.fb.group({
      name: [''],
      hourlyIntensity: [''],
    })
  }

  ngOnInit(): void {
  }

  postdata(gradeFormPostdata) {
    this.dataService.gradeRegistration(gradeFormPostdata.value.name, gradeFormPostdata.value.hourlyIntensity)
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate(['grades']);
      },
      error => {
      });
  }

  editData(gradeFormPostdata) {
    let data = {
      id: gradeFormPostdata.value.id,
      name: gradeFormPostdata.value.name,
      hourlyIntensity: gradeFormPostdata.value.hourlyIntensity
    }
    this.dataService.gradeEdit(data).subscribe(result => {
      console.log(result)
    })
  }

  deleteData(gradeFormPostdata) {
    this.dataService.gradeDelete(gradeFormPostdata.value.id)
  }

  listData(gradeFormPostdata) {
    this.dataService.gradeList().subscribe(resultList => {
      resultList = this.arrayResultList
      console.log(resultList)
    })
  }

  queryDataByGrade(gradeFormPostdata) {
    this.dataService.gradeSelected(gradeFormPostdata.value.id)
  }

  
  get id(){
    return this.gradeForm.get('id');
  }

  get email() {
    return this.gradeForm.get('email');
  }

  get password() {
    return this.gradeForm.get('password');
  }


}
