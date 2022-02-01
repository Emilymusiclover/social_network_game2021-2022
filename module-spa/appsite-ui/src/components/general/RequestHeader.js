// return authorization header with basic auth credentials
export function authHeader() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user == null) return {};

    const userEmail = user.userEmail;
    const password = user.userPassword;
    return {'Authorization': 'Basic ' + btoa(`${userEmail}:${password}`)};
}