const chai = require('chai');
const testCase = require('mocha').describe;
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

const URL = 'https://jsonplaceholder.typicode.com'

describe("/GET", function() {
    testCase('/GET post with userId and title', function() {
        it('Correct userId and correct title', (done) => {
            let params = {
                userId: 1,
                title: 'qui est esse'
            }
            chai.request(URL)
                .get('/posts?userId=' + params.userId + '&title=' + params.title)
                .end((err, res) => {
                    let firstElem = res.body[0]
                    res.should.have.status(200);
                    res.body.should.be.a('array')
                    firstElem.should.have.property('userId').eql(params.userId)
                    firstElem.should.have.property('title').eql(params.title)

                    done()
                })
        })
        it('Correct userId and incorrect title', (done) => {
            let params = {
                userId: 1,
                title: 'incorrect title'
            }
            chai.request(URL)
                .get('/posts?userId=' + params.userId + '&title=' + params.title)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array')
                    done()
                })

        })
        it('Incorrect userId and correct title', (done) => {
            let params = {
                userId: 200,
                title: 'qui est esse'
            }
            chai.request(URL)
                .get('/posts?userId=' + params.userId + '&title=' + params.title)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array')
                    done()
                })

        })
        it('Incorrect userId and incorrect title', (done) => {
            let params = {
                userId: 200,
                title: 'test'
            }
            chai.request(URL)
                .get('/posts?userId=' + params.userId + '&title=' + params.title)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array')
                    done()
                })

        })
    })
    testCase('/GET post with userId', function() {
        it('Correct userId', (done) => {
            let params = {
                userId: 1
            }
            chai.request(URL)
                .get('/posts?userId=' + params.userId)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.forEach(element => {
                        element.should.have.property('userId').eql(params.userId)
                    });
                    done()
                })
        })
    })
});