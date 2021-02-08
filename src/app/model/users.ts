export class Users {
  public Id: number;
  public name: string;
  public password: string;
  public email: string;
  public cellphone: string;
  public idRol: string;
  public idGrade: string;

  constructor(Id: number, name: string, password: string, email: string, cellphone: string,
              idRol: string, idGrade: string) {
    this.Id = Id;
    this.name = name;
    this.password = password;
    this.email = email;
    this.cellphone = cellphone;
    this.idRol = idRol;
    this.idGrade = idGrade;
  }
}
