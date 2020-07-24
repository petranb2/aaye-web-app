class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(cb) {
    this.authenticated = true;
    cb();
  }

  async logout() {
    let loggedIn = await fetch(`http://localhost:3001/logout`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data.auth:' + data.auth);
        return data.auth;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    this.authenticated = loggedIn;
    console.log('logout:' + this.authenticated);
  }

  async isAuthenticated(cb) {
    let loggedIn = await fetch(`http://localhost:3001/checkAuth`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data.auth:' + data.auth);
        return data.auth;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    this.authenticated = loggedIn;
    console.log('isAuthenticated:' + this.authenticated);
    cb(this.authenticated);
  }
}

export default new Auth();
