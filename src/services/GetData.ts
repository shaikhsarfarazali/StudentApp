
// using HttpClient service for http request
import { HttpClient } from '@angular/common/http';

// created service called GetData
import { Injectable } from "@angular/core";

// using rxjs for map function
import 'rxjs/add/operator/map';

@Injectable()
export class GetData{ 
    constructor(public http:HttpClient){

        /* Initializing http variable
        */
        this.http = http;
    }
    
    /* common function for get request
    */
    getDataFromApi(api,params=null,offset=null){
        let endpoint_url=api;

        /* checking if there is a 
        prameters or not
        */
        if(params!=null){
            endpoint_url+="?";

            /* appending parameters to url*/
            for (let key in params) {
                endpoint_url += key+"="+params[key];
                endpoint_url+="&";
            }
        endpoint_url = endpoint_url.substr(0,endpoint_url.length-1);
        }

        /* checking if there is a 
        offset or not
        */
        if(offset!=null){
            if(params==null){
                endpoint_url +='offset='+offset;
            }else{
                endpoint_url +='&offset='+offset;
            }
        }
        try {

            /* once url is generated with all the 
            necessary parameters*/
            let request =this.http.get(endpoint_url).map(res => res);

            /* returning server response
            */
            return request;
        } catch (error) {
            console.log('error from net',error);
        }
    } 
}
