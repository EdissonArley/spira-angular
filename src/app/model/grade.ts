export class Grade{
    public id: number;
    public name: string;
    public hourlyIntensity: number;

    constructor(id: number, name: string, hourlyIntensity: number){
        this.id = id;
        this.name = name;
        this.hourlyIntensity = hourlyIntensity;
    }
}