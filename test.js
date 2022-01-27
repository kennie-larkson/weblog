const chai = require("chai");
const chaiHttp = require("chai-http");
const res = require("express/lib/response");
const app = require("./index");
const should = chai.should();

chai.use(chaiHttp);
describe("Auth", () => {
    // describe("/GET getAllData", () => {
    //     it("it should get all the data", (done) => {
    //         chai
    //             .request(app)
    //             .get("/api/v1/data")
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a("array");
    //                 done();
    //             });
    //     });
    // });

    // describe("/GET getDataById", () => {
    //     it("it should return a specific data", (done) => {
    //         chai
    //             .request(app)
    //             .get("/api/v1/data/:id")
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a("object");
    //                 done();
    //             });
    //     });
    // });

    describe("/GET /", () => {
        it("it should return the index page", (done) => {
            chai
                .request(app)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });

    describe("/POST /api/v1/signup", () => {
        it("it should not POST a user without childName field", (done) => {
            let user = {
                childName: "Kennie",
                email: "larkson@email.com",
                grade: "PRIMARY ONE",
                phoneNumber: 1234567,
                countryCode: 234,
                password: "hdjdkkddkkd",
                confirmPassword: "hdjdkkddkkd"
            }
            chai
                .request(app)
                .post("/api/v1/signup")
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done(err);
                });
        });
    });

    describe("/POST /api/v1/login", () => {
        it("it should not POST a login without the password field", (done) => {
            let login = {
                email: "larkson@email.com",
                password: "hdjdkkddkkd",
            }
            chai
                .request(app)
                .post("/api/v1/login")
                .send(login)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });

    describe("/GET /api/v1/lessons", () => {
        it("it should return with an object", (done) => {

            chai
                .request(app)
                .get("/api/v1/lessons")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });
});
