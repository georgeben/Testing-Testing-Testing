function AuthCotroller(){
    let roles;
    let user;

    function setUser(userInfo){
        user = userInfo
    }

    function setRoles(role){
        roles = role;
        user.roles = role
    }

    function isAuthorized(neededRole){
        if(user){
            return user.isAuthorized(neededRole)
        }
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

    function getIndex(req, res){
        if(req.user.isAuthorized("admin")){
            return res.render("index")
        }
        res.render("error")
    }

    return {isAuthorized, isAuthorizedAsync, setRoles,isAuthorizedPromise, getIndex, setUser}
}

module.exports = AuthCotroller()