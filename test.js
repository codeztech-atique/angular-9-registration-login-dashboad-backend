const supertest = require('supertest')
const server = require('./index.js')


test("GET / route should give status code 200", done => {
   supertest(server).get("/")
    .expect(200)
    .then((response) => {
      // Check data
      expect(response.body.message).toBe("App is working fine!");
      done();
    });
});

test('POST / route should give status code 201 and create the todo user', done => {
  supertest(server).post('/todo/create')
  .set('Accept', 'application/json')
  .send(
      { 
          name: 'Copernicus',
          mobile: '9803223232'
      }
   )
  .expect(201)
  .then((response) => {
    // Check data
    expect(response.body.message).toBe("Success");
    done();
  });
   done();
}, 8000);

test('GET / fetch all the user details', done => {
  supertest(server).get('/todo/get-all')
  .expect(200)
  .then((response) => {
    // Check data
    expect(response.body.message).toBe("Success");
    done();
  });
  done();
});

test('GET / Success - fetch single todo user details', done => {
  supertest(server).get('/+XOFa8XZ9j')
  .expect(200)
  .then((response) => {
    // Check data
    expect(response.body.message).toBe("Success");
    done();
  });
});    

test('GET / Todo User Not Found - 404', done => {
  supertest(server).get('/P3cf564w7u1')
  .expect(404)
  .then((response) => {
    expect(response.body.message).toBe("Error");
    expect(response.body.error).toBe("Empty Store");  
    done();
  });
});  

test('DELETE / Success - single todo user details', done => {
  supertest(server).delete('/BcWtrDFOgV')
  .expect(200)
  .then((response) => {
    // Check data
    expect(response.body.message).toBe("Successfully Deleted !!!");
    done();
  });
}); 

test('DELETE / Todo User Not Found - 404', done => {
  supertest(server).delete('/1qgfn0HneV')
  .expect(404)
  .then((response) => {
    // Check data
    expect(response.body.message).toBe("No data found with the respective id !!!");
    done();
  });
});
