import { Observable } from "rxjs";
import { Evaluation } from "../../entities/evaluation";
import { Goal } from "../../entities/goal";
import { User } from "../../entities/user";


export abstract class EvaluationData {
    abstract getData(): Observable<Evaluation[]>;
    abstract getUsers(): Observable<User[]>;
    abstract getGoals(id : number): Observable<Goal[]>
    abstract add(Evaluation: Evaluation) ;

    abstract getNotValidated(): Observable<Evaluation[]>;
    abstract getInProgress(): Observable<Evaluation[]>;
    abstract getValidated(): Observable<Evaluation[]>;

    abstract delete(id : number);
    abstract getById(id : number);
    abstract edit(id : number , Evaluation: Evaluation);

    abstract currentEval(id : number) : Observable<Evaluation>;
    abstract MyEval(id : number): Observable<Evaluation[]>;
    abstract validate(id);


}
  