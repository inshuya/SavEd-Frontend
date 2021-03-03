export function authHeader() {
    // return authorization header with jwt token
    if(typeof window !== 'undefined')
    {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
    }
    else
    {
        return {};
    }
}