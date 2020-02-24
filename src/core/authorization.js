/*************************************
 * Authorization
 */

// Exec authentication
const authentication = (user, pass) => {
    return fetch('http://api.codingkids.wmdd.ca/token', {
        method: 'post',
        body: JSON.stringify({
            email: user,
            password: pass
        }),
        headers: new Headers({
            'content-type': 'application/json'
        })
    }).then(response => response.json()).then(function (data) {
        localStorage.setItem("auth", JSON.stringify(data));
        return data;
    }).catch(function (error) {
        let data = {
            status: {
                errors: ["Internal Server Error"],
                id: 500
            },
            data: null
        };
        localStorage.setItem("auth", JSON.stringify(data));
        return data;
    });
}

// Get the authorization token
const getAuthorization = () => {
    return JSON.parse(localStorage.getItem("auth"));
}

// Logou out 
const logout = () => {
    localStorage.removeItem("auth");
}

export {
    authentication,
    getAuthorization,
    logout
};