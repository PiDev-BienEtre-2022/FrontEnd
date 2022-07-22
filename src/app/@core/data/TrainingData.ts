import { Observable } from "rxjs";
import { Training } from "../../entities/training";

export abstract class TrainingData {
    abstract getData(): Observable<Training[]>;
}
  