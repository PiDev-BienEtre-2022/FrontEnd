import { User } from "./user";

export class Evaluation {
    id: string;
    date_goals : string;
    date_eval : string;
    nb_goals_domain : string;
    nb_goals_other : string;
    min_per_domain : string;
    score : string;
    comment : string;
    validated : string;
    finalValidate : string;
    status : string;
    username : string;
    user : User;
}