const assert = require('assert')
const expect = require('chai').expect

describe('Basic Mocha Testing', () => {
    it('Should throw an error', () => {
        expect(3+4).to.equal(7)
    })
})

describe('Testing objets', function(){
    it('should test an object', function(){
        let objA = {name:"George", age: 19}
        // objA.should.have.property("name")
        expect(objA).to.have.property("name").equal("George")
    })

    it('should test that two objects are equal', function(){
        let objA = {name:"George", age: 19}
        let objB = {name: "George", age:19}

        expect(objA).to.deep.equal(objB)
    })

    it('should test for null', function(){
        let result = null;
        expect(result).to.not.exist
    })
})