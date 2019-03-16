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

    return {isAuthorized, isAuthorizedAsync, setRoles}
}

module.exports = AuthCotroller()