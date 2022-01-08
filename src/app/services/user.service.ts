import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User, UserAddResponse, UserGetResponse } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService{

    api:string = "https://gorest.co.in/public/v1/users";

    constructor(
        private http:HttpClient
    ){
    }
    
    getList(){
        return this.http.get<UserGetResponse>(this.api);
    }
    
    updateUser(user:User){
        return this.http.patch(this.api+"/"+user.id,user)
    }

    addUser(form:User){
        console.log(form)
        return this.http.post<UserAddResponse>(this.api,form);
    }
    

    deleteUser(id){
        return this.http.delete(this.api+"/"+id);
    }
}

