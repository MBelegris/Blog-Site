const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

let test_id;

const Post = require('../models/post-model');

describe('Testing the post CRUD', function () {

    it('should be invalid if title, content, author and datePosted are null', function (done) {
        let post = new Post({
            title: null,
            content: null,
            author: null,
            datePosted: null
        });

        post.validate(function (err) {
            expect(err.errors.title).to.exist;
            expect(err.errors.content).to.exist;
            expect(err.errors.author).to.exist;
            expect(err.errors.datePosted).to.exist;
            done();
        });
    });

    it('should be valid if title, content, author and datePosted are not null', function (done) {
        let post = new Post({
            title: "Book Test",
            content: "Content Test",
            author: "Test author",
            datePosted: "Test date"
        });

        post.validate(function () {
            expect(post.title).to.exist;
            expect(post.content).to.exist;
            expect(post.author).to.exist;
            expect(post.datePosted).to.exist;
            done();
        });
    });

    //Test post creation
    it('should be valid if it can create a post in the db', function (done){

        let post = new Post({
            title: "Book Test",
            content: "Content Test",
            author: "Test author",
            datePosted: "Test date"
        });

        chai.request('http://localhost:5000/api/post')
            .post('/')
            .set('content-type', 'application/json')
            .send(post)
            .then(function (res, err) {
                test_id = res.body.id;
                expect(res.status).to.equal(200);
                done();
            }).catch(function (err) {
            throw err;
        });
    });

    //test the get all posts function
    it('should be valid if it can get back all the posts from the db', function (done){
        chai.request('http://localhost:5000/api/posts')
            .get('/')
            .then(function (res,err) {
                expect(res).to.have.status(200);
                done();
            })
            .catch(function (err) {
                throw err;
            })
    });

    //test get post by id
    it('should be valid if it can get post by id', function (done) {
        chai.request(`http://localhost:5000/api/post/${test_id}`)
            .get('/')
            .then(function (res, err) {
                expect(res).to.have.status(200);
                done();
            }).catch(function (err) {
            throw err;
        })
    });

    //test update post
    it('should be valid if it can update post', function (done) {
        let post = new Post({
            title: "Book Tests",
            content: "Content Test",
            author: "Test author",
            datePosted: "Test date"
        });

        chai.request(`http://localhost:5000/api/post/${test_id}`)
            .put('/')
            .set('content-type', 'application/json')
            .send(post)
            .then(function (res, err) {
                expect(res).to.have.status(200);
                done();
            }).catch(function (err) {
            throw err;
        })
    });

    //test delete post by id
    it('should be valid if it can delete post by id', function (done) {
        chai.request(`http://localhost:5000/api/post/${test_id}`)
            .delete('/')
            .then(function (res, err) {
                expect(res).to.have.status(200);
                done();
            }).catch(function (err) {
            throw err;
        })
    });
});