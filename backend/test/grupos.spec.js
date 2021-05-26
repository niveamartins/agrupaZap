let chai = require('chai');
let chaiHttp = require('chai-http');
let should = require('should');

const expect = chai.expect()

chai.use(chaiHttp);

const app = require("../server")

describe("Testes de bom funcionamento da API agrupaZap", function () {
  it("Deve conseguir cadastrar e receber ID_Entrada", function (done) {

    chai.request(app)
      .post("/api/grupo")
      .send({
        STR_NomeGrupo: "GrupoTeste",
        STR_DescricaoGrupo: "Grupo de Teste",
        TXT_InviteGrupo: "https://chat.whatsapp.com/",
        B_Privado: true,
        NR_Latitude: 0,
        NR_Longitude: 0,
      })
      .end(function (err, res) {
        if (err) done(err)
        should(res).exist
        should(res).have.property("status").and.equal(200);
        should(res.body).have.property("ID_Entrada"); 
        
        done();
    })
    
  });

  it("Deve conseguir cadastrar um grupo não privado", function (done) {

    chai.request(app)
      .post("/api/grupo")
      .send({
        STR_NomeGrupo: "GrupoTeste",
        STR_DescricaoGrupo: "Grupo de Teste",
        TXT_InviteGrupo: "https://chat.whatsapp.com/",
        B_Privado: false,
        NR_Latitude: 0,
        NR_Longitude: 0,
      })
      .end(function (err, res) {
        if (err) done(err)
        should(res).exist
        should(res).have.property("status").and.equal(200); 
        
        done();
    })
    
  });


  it("Deve listar todos os grupos próximos", function (done) {

    chai.request(app)
      .get("/api/grupos?Latitude=0&Longitude=0")
      .end(function (err, res) {
        if (err) done(err)
        should(res).exist
        should(res.body).be.Array(); 
        
        done();
    })
  });

  
});

describe("Testes das validações", function () {
    it("Deve retornar erro para o cadastro do link do WhatsApp", function (done) {

        chai.request(app)
          .post("/api/grupo")
          .send({
            STR_NomeGrupo: "GrupoTeste",
            STR_DescricaoGrupo: "Grupo de Teste",
            TXT_InviteGrupo: "https://whatsapp.com/",
            B_Privado: true,
            NR_Latitude: 0,
            NR_Longitude: 0,
          })
          .end(function (err, res) {
            if (err) done(err)
            should(res).exist
            should(res).have.property("status").and.equal(500);
            should(res.body).have.property("error_msg").and.equal("Não é um link de invite do WhatsApp.");
             
            done();
        })
        
      }); 
    
    it("Deve retornar erro de campo nulo", function (done) {

        chai.request(app)
          .post("/api/grupo")
          .send({
            STR_DescricaoGrupo: "Grupo de Teste",
            TXT_InviteGrupo: "https://chat.whatsapp.com/",
            B_Privado: true,
            NR_Latitude: 0,
            NR_Longitude: 0,
          })
          .end(function (err, res) {
            if (err) done(err)
            should(res).exist
            should(res).have.property("status").and.equal(500);
            should(res.body).have.property("error_msg").and.equal("Verifique os campos, não é possível cadastrar com campos vazios.")

            done();
        })
        
      });
      
      it("Deve retornar erro de chave de acesso incorreta", function (done) {

        chai.request(app)
          .get("/api/invite?ID_Grupo=5&ID_Entrada=111111")
          .end(function (err, res) {
            if (err) done(err)
            should(res).exist
            should(res).have.property("status").and.equal(500);
            should(res.body).have.property("error_msg").and.equal("O ID de entrada inserido não é o cadastrado.")

            done();
        })
        
      });
})
