const chai = require('chai');
const chaiHttp = require('chai-http');
const bcrypt = require('bcryptjs');

chai.use(chaiHttp);
const expect = chai.expect;

let test_id;

const User = require('../models/user-model');

describe('Testing the user CRUD', function () {

    it('should be invalid if name, username and pwd are null', function (done) {
        let user = new User({
            name: null,
            username: null,
            password: null
        });

        user.validate(function (err) {
            expect(err.errors.name).to.exist;
            expect(err.errors.username).to.exist;
            expect(err.errors.password).to.exist;
            done();
        });
    });

    it('should be valid if name, username and pwd are not null', function (done) {
        let user = new User({
            name: "bob",
            username: "bober",
            password: "pwd"
        });

        user.validate(function () {
            expect(user.name).to.exist;
            expect(user.username).to.exist;
            expect(user.password).to.exist;
            done();
        });
    });

    //Test user creation
    it('should be valid if it can create a user in the db', function (done){

        let name = "Test-name";
        let username = "test-user-username";
        let password= "Test-user-pwd";

        bcrypt.hash(password, 5, async  (error, password) => {
            let user = new User({
                name: name,
                username: username,
                password: password
            });
            chai.request('http://localhost:8000/api/user')
                .post('/')
                .set('content-type', 'application/json')
                .send(user)
                .then(function (res, err) {
                    test_id = res.body.id;
                    expect(res.status).to.equal(201);
                    done();
                }).catch(function (err) {
                throw err;
            });
        });
    });

    //test the get all users function
    it('should be valid if it can get back all the users from the db', function (done){
        chai.request('http://localhost:8000/api/users')
            .get('/')
            .then(function (res,err) {
                expect(res).to.have.status(200);
                done();
            })
            .catch(function (err) {
                throw err;
            })
    });

    //test get user by id
    it('should get user by id', function (done) {
        chai.request(`http://localhost:8000/api/user/${test_id}`)
            .get('/')
            .then(function (res, err) {
                expect(res).to.have.status(200);
                done();
            }).catch(function (err) {
                throw err;
            })
    });

    // test get user by username and password
    it('should get user by username and password', function (done) {
       chai.request(`http://localhost:8000/api/users/test-user-username/Test-user-pwd`)
           .get('/')
           .then(function (res, err) {
               expect(res).to.have.status(200);
               expect(res.body.success).to.equal(true);
               done();
           }).catch(function (err) {
           throw err;
       })
    });

    //test update user
    it('should be valid if it can update user', function (done) {
        let user = new User({
            name: "New-test User",
            username: "test-username",
            password: "Test-pwd"
        });


        chai.request(`http://localhost:8000/api/user/${test_id}`)
            .put('/')
            .set('content-type', 'application/json')
            .send(user)
            .then(function (res, err) {
                expect(res).to.have.status(200);
                done();
            }).catch(function (err) {
            throw err;
        })
    });

    //test delete user by id
    it('should be valid if it can delete user by id', function (done) {
        chai.request(`http://localhost:8000/api/user/${test_id}`)
            .delete('/')
            .then(function (res, err) {
                expect(res).to.have.status(200);
                done();
            }).catch(function (err) {
            throw err;
        })
    });
});