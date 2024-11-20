import { expect } from 'chai';
import request from 'supertest';
import app from '../../src/index';



describe('testing books api ', () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoicHJpeWFuc2h1MDYyQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczMjA4MzI4N30.L0RtQLLupLpPGvD08jXm0ihIw7OoPlLpJ6QKZi4pb2k";
    it("Check book created or not ",(done)=>{
        request(app)
        .post(`/api/v1/books/createBook`)
        .set('Authorization', `Bearer ${token}`)
        .send(
            {   
            bookName:"Marketing Management, 16e",
            author:"devthad modal",
            price:"100",
            description:"this the best best thinks book",
            adminId:"1",
            discountPrice:"200",
            quantity:"1",
            imgUrl:"https://m.media-amazon.com/images/G/31/img21/Books/Nov2024/Higher-Ed._SS300_QL85_FMpng_.png",
            }
        )
        .expect(202)
        .end((error,res)=>{

          if(error) {
            console.log(error)
            return done(error)
          } 
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
            console.log(res.body)
            expect(res.body).to.have.property('message').eql('get All Book Succesfully')
            done()
        })

     })

});

