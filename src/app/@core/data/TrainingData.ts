import { Observable } from "rxjs";
import { Training } from "../../entities/training";

export abstract class TrainingData {
    abstract getData(): Observable<Training[]>;
    abstract verif(id_user, id_training);
    abstract allowd(id_user):  Observable<Training[]>
}
  