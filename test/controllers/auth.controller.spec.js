const assert = require('assert');
const authController = require('../../controllers/auth.controller');

describe('AuthController', () => {
    beforeEach('Setting up roles', function(){
        console.log("Running Before each")
        authController.setRoles(['user'])
    })
    describe('isAuthorized', () => {
        it('should return false if not authorized', () => {
            // authController.setRoles(['user'])
            assert.equal(false, authController.isAuthorized("admin"))
        })

        it('should return true if authorized', () => {
            authController.setRoles(['user', 'admin'])
            assert.equal(authController.isAuthorized('admin'), true)
        })
    })

    describe('isAuthorizedAsync', function(){
        it('Should return false if not authorized', function(done){
            // authController.setRoles(['user'])
            authController.isAuthorizedAsync('admin', (isAuth) =>{
                assert.equal(isAuth, false)
                done();
            })
        })
    })
})