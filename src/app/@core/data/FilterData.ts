import { Observable } from "rxjs";
import { Filter } from "../../entities/filter";

export abstract class FilterData {
    abstract getData(): Observable<Filter[]>
  }
  