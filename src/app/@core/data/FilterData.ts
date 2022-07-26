import { Observable } from "rxjs";
import { Filter } from "../../entities/filter";

export abstract class FilterData {
    abstract getData(): Observable<Filter[]>
    abstract addData(data : Filter): Observable<any>
    abstract editData(data : Filter): Observable<any>
    abstract delete(id : number): Observable<any>
    abstract process(id : number): Observable<any>
    abstract getDataByUserId(userId: number) : Observable<Filter>
  }
  