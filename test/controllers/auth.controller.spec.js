const assert = require('assert');
const authController = require('../../controllers/auth.controller');
const expect = require('chai').expect;
const should = require('chai').should();
const chaiAsPromised = require('chai-as-promised')
const chai = require('chai')
const sinon = require('sinon')
chai.use(chaiAsPromised)

describe('AuthController', () => {
    beforeEach('Setting up roles', function(){
        console.log("Running Before each")
        // authController.setRoles(['user'])
    })
    describe('isAuthorized', () => {
        let user = {}
        beforeEach(function(){
            user = {
                roles: ["user"],
                isAuthorized: function(neededRole){
                    return this.roles.indexOf(neededRole) >= 0;
                }
            }
            sinon.spy(user, 'isAuthorized')
            authController.setUser(user)
        })
        it('should return false if not authorized', () => {
            let isAuth = authController.isAuthorized("admin");
            expect(isAuth).to.be.false
            expect(user.isAuthorized.calledOnce).to.be.true
        })

        it('should return true if authorized', () => {
            authController.setRoles(['user', 'admin'])
            expect(authController.isAuthorized("admin")).to.be.true
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

    describe("isAuthorizedPromise", function(){
        it("should return false if not authorized", function(){
           return authController.isAuthorizedPromise("admin").should.eventually.be.false
        })
    })

    describe.only("getIndex", function(){
        let user = {}
        beforeEach(function(){
            user = {
                roles: ["user"],
                isAuthorized: function(neededRole){
                    return this.roles.indexOf(neededRole) >= 0;
                }
            }
        })
        it("should render the index page", function(){
            sinon.stub(user, 'isAuthorized').returns(true)
            let req = {user: user};
            let res = {
                render: function(){}
            }

            let mock = sinon.mock(res)
            mock.expects("render").once().withExactArgs("index")

            authController.getIndex(req, res)
            mock.verify()
        })
    })
})