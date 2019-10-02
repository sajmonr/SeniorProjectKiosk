export class Meeting{
  title: string;
  startTime: Date;
  endTime: Date;
  owner: string;

  constructor(json?: Meeting){
    this.title = json.title;
    this.startTime = new Date(json.startTime);
    this.endTime = new Date(json.endTime);
    this.owner = json.owner;
  }

}
