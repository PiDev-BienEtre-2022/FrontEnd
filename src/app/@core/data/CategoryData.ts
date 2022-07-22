import { Observable } from "rxjs";
import { Category } from "../../entities/category";

export abstract class CategoryData {
    abstract getData(): Observable<Category[]>;
    abstract add(Category: Category) ;
    abstract delete(id : number);
    abstract getById(id : number);
    abstract edit(id : number , Category: Category);

    abstract getDataByDomain(id): Observable<Category[]>;

}
  