import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/index';



describe('testing books api ', () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImVtYWlsIjoiZXhhbXBsZUBlbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTczMjAxOTIwMH0.zVk23yQfmEhlDYz2dZFns2pba4VRB0onACIYsJlUhK0";

    it("Check book created or not ",(done)=>{
        request(app)
        .get(`/api/v1/books/createBook/${1}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(202)
        .end((error,res)=>{
          if(error)  return done(error)
            console.log(res.body)
            expect(res.body).to.have.property('message').eql('Book Succesfully created')
            done()
        })

     })

     it("Check book get or not ",(done)=>{
        request(app)
        .get('/api/v1/books/getAllBook')
        .expect(202)
        .end((error,res)=>{
          if(error)  return done(error)
            // console.log(res.body)
            expect(res.body).to.have.property('message').eql('get All Book Succesfully')
            done()
        })

     })

   


 

});

