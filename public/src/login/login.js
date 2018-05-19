import { Behavior } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { AuthenticationService } from '../_services/authentication.service'

export class Login {
    @bindable username = "";
    @bindable pass = "";
    constructor() {
        this.authenticationService = new AuthenticationService;
        
    }

    attached() {
    }

    click(){
        this.authenticationService.login(this.username, this.pass)

    }


}

