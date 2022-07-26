import { Observable } from "rxjs";
import { Goal } from "../../entities/goal";

export abstract class GoalData {
    abstract getData(idEval): Observable<Goal[]>;

    abstract getById(id : number);
    abstract add(Goal: Goal, idEval) ;
    abstract edit(Goal: Goal, idEval, idCat);
    abstract editPercentage(Goal: Goal, idEval, idCat);
    abstract stat(id : number);

    
}
  