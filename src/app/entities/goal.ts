import { Category } from "./category";
import { Evaluation } from "./evaluation";

export class Goal {
    id: string;
    titre: string;
    description :string;
    percentage :string;  
    status :string;
    domain :string;
    categoryName:string;
    category :Category;
    evaluation :Evaluation;
}