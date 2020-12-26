import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export class Entity {

    protected entityName : string = "";

    constructor(private http : HttpClient) {
    }

    public select_entity =  () : Observable<any> =>{
        return this.http.get(environment.urlApi + `/${this.entityName}/select_entity`)
    }

    public select_entity_one =  (id : string) : Observable<any> =>{
        return this.http.get(environment.urlApi + `/${this.entityName}/select_entity_one/${id}`)
    }

    public insert_entity =  (body : any) : Observable<any> =>{
        return this.http.post(environment.urlApi + `/${this.entityName}/insert_entity`, body )
    }

    public update_entity =  (body : any) : Observable<any> =>{
        return this.http.post(environment.urlApi + `/${this.entityName}/update_entity`, body )
    }

    deactivate_entity = ( id : string ) : Observable<any> =>{
        return this.http.post(environment.urlApi + `/${this.entityName}/update_entity`, { id, deactivated_at : new Date} )

    }

}
