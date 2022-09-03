const { default: mongoose } = require("mongoose");
const request = require("supertest");
const bcrypt = require("bcryptjs");
const { app, serverInstance } = require('../../server/index.js');

const {findUser, addUser} = require('../../server/dao/userDAO.js');
const User = require("../../server/models/user");
const { getCourseDetails, addReview } = require("../../server/dao/courseDAO.js");

beforeAll(async () => {
    await mongoose.connect(process.env.TEST_DB_URI);
    User.deleteMany({});
});

afterAll(done => {
    serverInstance.close();
    mongoose.disconnect();
    done();
    //app.close();
});

describe('Test for findUser function', () => {
    it('should not find the given user',  async () => {
        return findUser('test')
            .catch( error => {
                expect(error.elem).toBeNull();
                expect(error.message).toEqual("User not found");
            });
    });
});

describe('Test for addUser and findUser function', () => {
    const hashPassword = bcrypt.hashSync('test', 10);
    it('should create the given user', async () => {
        return addUser('test', 192001, 'test', hashPassword, 'testing')
            .then( result => {
                expect(result.status).toEqual(200);
                expect(result.message).toEqual("User successfully registered");
            });
    });

    it('should find the given user', async () => {
        return findUser('test')
            .then( result => {
                expect(result.elem).not.toBeNull();
                expect(result.message).toEqual("User found successfully");
            })
    });

    it('should not create the given user', async () => {
        return addUser('test', 192001, 'test', hashPassword, 'testing')
            .catch( error => {
                expect(error.status).toEqual(208);
                expect(error.message).toEqual("User already exists");
            })
    });
});

describe('Test for course feedback and related functions', () => {
    it('should give error message for an invalid course id', async () => {
        return getCourseDetails("cs330a")
            .catch( error => {
                expect(error.status).toEqual(400);
                expect(error.message).toEqual("Invalid course id");
            });
    });

    it('should add review for a valid course id', async () => {
        return addReview("cs330a", "It is a nice course to learn about", 9, "test")
            .then( result => {
                expect(result.status).toEqual(200);
            });
    });

    it('should update the given course rating', async () => {
        return updateCourseRating("cs330a", 8, )
    });
});