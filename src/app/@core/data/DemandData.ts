import { Observable } from "rxjs";
import { Demand } from "../../entities/demand";

export abstract class DemandData {
    abstract getData(): Observable<Demand[]>
    abstract addData(data : Demand,userId: number): Observable<any>
    abstract editData(data : Demand): Observable<any>
    abstract getDataByUserId(userId: number) : Observable<Demand[]>
  }
  