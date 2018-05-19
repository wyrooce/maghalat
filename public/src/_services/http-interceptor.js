import { Router } from 'aurelia-router';
export class CustomInterceptor implements Interceptor {
  request(request) {
    console.log(`I am inside of the interceptor doing a new request to ${request.url}`);
    return request;
  }

  responseError(response) {
    console.error('Some error has occured! Run!')
    this.router = new Router;
    this.router.navigateToRoute(
      this.router.currentInstruction.config.name, // current route name
      { '0': params['0'] }, // route parameters object
      { trigger: false, replace: true } // options
    );
    return response;
  }
}