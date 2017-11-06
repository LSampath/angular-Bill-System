export class User {
  isUserLoggedIn: boolean;
  username: string;
  password: string;
  name: string;

  constructor(username, password, name, loggedIn) {
    this.username = username;
    this.password = password;
    this.name = name;
    this.isUserLoggedIn = loggedIn;
  }

  setUserDetail(username, password, name, loggedIn) {
    this.isUserLoggedIn = loggedIn;
    this.username = username;
    this.name = name;
    this.password = password;
  }

  // getUsername() {
  //   return this.username;
  // }
  // getPassword() {
  //   return this.password;
  // }
  // getName() {
  //   return this.name;
  // }
  // isUserloggedIn() {
  //   return this.isUserLoggedIn;
  // }
  //
  // setUserloggedIn(loggedIn) {
  //   this.isUserLoggedIn = loggedIn;
  // }
}

