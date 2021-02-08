import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, NgForm} from '@angular/forms';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  ngOnInit() {
  }

  constructor(private fb: FormBuilder, private dataService: ApiService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      cellphone: ['', Validators.required]
    });
  }

  postdata(registerFormPostdata) {
    this.dataService.userRegistration(registerFormPostdata.value.name, registerFormPostdata.value.email, registerFormPostdata.value.password, registerFormPostdata.value.cellphone)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['dashboard']);
        },
        error => {
        });
  }

  editData(registerFormPostdata) {
    let data = {
      id : registerFormPostdata.value.id,
      name : registerFormPostdata.value.name,
      password : registerFormPostdata.value.password,
      email : registerFormPostdata.value.email,
      cellphone: registerFormPostdata.value.cellphone,
      idGrade : registerFormPostdata.value.idGrade
    }
    this.dataService.userEdit(data).subscribe(result =>{
      console.log(result)
    })
  }

  deleteData(registerFormPostdata){
    this.dataService.userDelete(registerFormPostdata.value.id)
  }

  public arrayResultList = [
    {
        id: 1,
        name: '',
        password: '',
        email: '',
        cellphone: '',
        idRol: 1,
        idGrade: 1
    }];
    
  listData(registerFormPostdata){
   this.dataService.userList().subscribe(resultList =>{
     resultList = this.arrayResultList
    console.log(resultList)
  })
  }

  queryDataByUser(registerFormPostdata){
    this.dataService.userSelected(registerFormPostdata.value.id)
  }

  get id(){
    return this.registerForm.get('id');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get name() {
    return this.registerForm.get('name');
  }

  get cellphone() {
    return this.registerForm.get('cellphone');
  }

  get idRol() {
    return this.registerForm.get('idRol');
  }

  get idGrade() {
    return this.registerForm.get('idGrade');
  }
}
