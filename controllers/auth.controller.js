function AuthCotroller(){
    let roles;
    function setRoles(role){
        roles = role;
    }
    function isAuthorized(neededRole){
        return roles.indexOf(neededRole) >= 0;
    }

    function isAuthorizedAsync(neededRole, cb){
        setTimeout(function(){
            cb(roles.indexOf(neededRole) >= 0)
        }, 5)
    }

    function isAuthorizedPromise(neededRole){
        return new Promise(function(resolve){
            setTimeout(resolve(roles.indexOf(neededRole) >= 0), 50)
        })
    }

    return {isAuthorized, isAuthorizedAsync, setRoles,isAuthorizedPromise }
}

module.exports = AuthCotroller()