import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/index';



describe('check user login and singup', () => {

  it('should sign up a new user', (done) => {
    request(app)
      .post('/api/v1/users/signup')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: "example@email.com",
        password: 'Priyanshu@123'
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body)
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('email').eql("example@email.com");
        done();
      });
  });
   

     it("Check user login or not ",(done)=>{

        request(app)
        .post('/api/v1/users/login')
        .send({
         email: "priyanshu062@gmail.com",
         password: 'Priyanshu@123'
        })
        .expect(201)
        .end((error,res)=>{
          if(error)  return done(error)
           console.log(res.body) 
           expect(res.body).to.have.property('data') 
           expect(res.body).to.have.property('message').eql('User successfully Login')
           done()
        })

     })


 

});

