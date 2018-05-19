import { HttpClient, json } from 'aurelia-fetch-client';
import { CustomInterceptor } from './http-interceptor';
import { Cookies } from 'aurelia-plugins-cookies';

let httpClient = new HttpClient();
let COOKIE_LIFE_TIME = 1000 * 60 * 500;
httpClient.configure(config => {
  config
    .useStandardConfiguration()
    // .withBaseUrl('/api')
    .withDefaults({
      credentials: 'same-origin',
      headers: {
        'X-Requested-With': 'Fetch'
      }
    })
    .withInterceptor(new CustomInterceptor());
});

export class AuthenticationService {
  constructor() {

  }

  isAuth() {
    if (!this.getUser()) {
      Cookies.remove('hash');
      Cookies.removeAll();
      return false;
    }
    return true;
  }

  login(username, password) {
    let comment = { username: username, password: password };

    httpClient
      .fetch('/login', {
        method: 'post',
        body: json(comment)
      })
      .then(response => response.json())
      .then(data => {
        console.log("zzzzzzzzzzzzzzzz", data);

        var temp = JSON.stringify(data);
        temp = encodeURIComponent(temp);
        temp = unescape(temp);
        var encodedUser = btoa(temp);
        // var encodedUser = "btoa";
        Cookies.put('user', encodedUser, {
          expires: new Date(Date.now() + COOKIE_LIFE_TIME)
        });
        location.assign('#/home');
      });

  }

  getUser() {
    var user = Cookies.get('user');
    if (user) {
      var temp = atob(user);
      var temp = escape(temp);
      var temp = decodeURIComponent(temp);
      var temp = JSON.parse(temp);
      console.log("getUser :", temp);
      return temp;
    }
    return null;
  }

  logout() {
    httpClient
      .fetch('/logout', {
        method: 'get'
      })
      .then(response => response.json())
      .then(data => {
        Cookies.remove('hash');
        Cookies.removeAll();
        location.assign('#/login');
      })
  }
}






