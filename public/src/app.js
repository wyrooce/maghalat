
import { BindingEngine } from 'aurelia-binding';
import { Cookies } from 'aurelia-plugins-cookies';
import { Redirect } from 'aurelia-router';
import { AuthenticationService } from './_services/authentication.service'

let vm;



export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.addAuthorizeStep(AuthorizeStep);
    config.map([
      {
        route: ['', 'home'], name: 'home',
        settings: { auth: true } ,
        moduleId: './home/home', nav: true, title: 'Home'
      },
      {
        route: 'test', name: 'test',
        settings: { auth: true } ,
        moduleId: './home/home', nav: true, title: 'test'
      },
      {
        route: 'login', name: 'login',
        moduleId: './login/login', nav: true, title: 'login'
      }
    ]);



    this.router = router;
  }



  static inject = [BindingEngine];

  constructor(bindingEngine) {
    vm = this;
    this.authenticationService = new AuthenticationService;    
    this.bindingEngine = bindingEngine;
    this.current = '';
    console.log("2", Cookies.getAll());

  }


  attached() {
    this.current=this.authenticationService.isAuth();
    this.navigationSubs = this.bindingEngine
      .propertyObserver(this.router, 'isNavigating')
      .subscribe(this.isNavigationChanged);
    this.bindingEngine
      .propertyObserver(this.router, 'currentInstruction')
      .subscribe(this.isNavigationChanged);
  }

  detached() {
    this.navigationSubs.dispose();
  }

  logout(){
    this.authenticationService.logout();
  }

  isNavigationChanged(newValue, oldValue) {
    if (newValue.fragment) {
      // vm.current = newValue.fragment;
      // console.log("1", vm.current);

    }
  }
}

class AuthorizeStep {
  constructor()
  {
    this.authenticationService = new AuthenticationService;
  }
  
  run(navigationInstruction, next) {
    vm.current = this.authenticationService.isAuth();
    
    if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {
      var isLoggedIn = this.authenticationService.isAuth();
      if (!isLoggedIn) {
        return next.cancel(new Redirect('login'));
      }
    }

    return next();
  }
}