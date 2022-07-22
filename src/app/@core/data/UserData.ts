import { Observable } from "rxjs";
import { User } from "../../entities/user";

export abstract class UserrData {
    abstract getData(): Observable<User[]>;
    abstract getById(id : number);

}
  