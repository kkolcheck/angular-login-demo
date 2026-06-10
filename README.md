# angular-login-demo

Angular login page that makes a POST call to validate user credentials before redirecting.

* run: npm start
* test: npm test

## Background
This was the front end half of a take-home project for an interview with OneCause. The login page posts the user's credentials to a Go service for validation. That service lives in [go-userauth-demo](https://github.com/kkolcheck/go-userauth-demo).

# Potential Enhancements
- [ ] (More) unit tests for app.component
- [x] Unit tests for login.component
- [ ] Unit tests for user.service
- [x] Improve appearance
- [ ] Add error validation messages for login form for each error type
- [ ] Show/hide text for password
- [ ] Set up nyc for code coverage
