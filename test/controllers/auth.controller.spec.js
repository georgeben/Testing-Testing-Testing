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
        authController.setRoles(['user'])
    })
    describe('isAuthorized', () => {
        it('should return false if not authorized', () => {
            let isAuth = authController.isAuthorized("admin");
            expect(isAuth).to.be.false
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

    describe("getIndex", function(){
        it("should render the index page", function(){
            let req = {};
            let res = {
                render: sinon.spy()
            }

            authController.getIndex(req, res)
            expect(res.render.calledOnce).to.be.true
            expect(res.render.firstCall.args[0]).to.equal("index")
        })
    })
})