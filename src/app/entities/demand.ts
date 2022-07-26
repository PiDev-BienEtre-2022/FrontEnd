export class Demand {
    id: number;
    dateCreation: Date;
    dateDemande: Date;
    noteEmp: String;
    urgency: string
    extra: boolean;
    reason: string;
    noteManager:string;
    systemApprove:string;
    managerApprove:string;
    user:User;
}

export class User {
    domain: string;
    email:  string;
    equipe: Equipe;
    id:number;
    username:  string;

}

export class Equipe {
    id: number;
    nom:string;
}
