const connection = require('../database/connection');
const geo = require('geolocation-utils')


module.exports = {
    async lista(req,res) {
        const { Latitude, Longitude } = req.query;
        let grupos = await connection('grupo').select('*');

        grupos = grupos.filter(elemento => {
            let distancia = geo.headingDistanceTo({
                lat: Number(elemento.NR_Latitude),
                lon: Number(elemento.NR_Longitude)
            }, {
                lat: Number(Latitude),
                lon: Number(Longitude)
            })

            return distancia.distance < 1000
        })

        grupos.forEach(element => {
            if (element.B_Privado === true) {
                delete element.ID_Entrada
                delete element.TXT_InviteGrupo
            } else {
                delete element.ID_Entrada
            }
        });

        return res.json(grupos);
    },

    async invitePrivado(req, res) {
    
      const { ID_Grupo, ID_Entrada } = req.query;
        
        const grupo = await connection("grupo")
        .where("SQ", ID_Grupo)
        .select('*')

        if (grupo[0] === undefined) {
            return res.status(500).send({
                error_msg: "Não há grupo cadastrado com esse ID."
            }) 
        }

      
        if (grupo[0].ID_Entrada === ID_Entrada) {
            return res.json({
                TXT_InviteGrupo: grupo[0].TXT_InviteGrupo
            })
        } else {
            return res.status(500).send({
                error_msg: "O ID de entrada inserido não é o cadastrado."
            }) 
        }
    },

    async create(req, res) {
        const { STR_NomeGrupo, 
                STR_DescricaoGrupo, 
                TXT_InviteGrupo, 
                B_Privado, 
                NR_Latitude, 
                NR_Longitude } = req.body;

        if (STR_NomeGrupo === undefined || STR_DescricaoGrupo === undefined || TXT_InviteGrupo === undefined || B_Privado === undefined|| NR_Latitude === undefined || NR_Longitude === undefined) {
            return res.status(500).send({
                error_msg:'Verifique os campos, não é possível cadastrar com campos vazios.'
            })
        }

        if (!(TXT_InviteGrupo.includes("https://chat.whatsapp.com/"))) {
            return res.status(500).send({
                error_msg: 'Não é um link de invite do WhatsApp.'
            })
        }
        
        try {
            if (B_Privado === true) {
                var crypto = require("crypto");
                var ID_Entrada = crypto.randomBytes(5).toString('hex');
                
                await connection('grupo').insert({
                    STR_NomeGrupo, 
                    STR_DescricaoGrupo, 
                    TXT_InviteGrupo, 
                    B_Privado, 
                    NR_Latitude, 
                    NR_Longitude,
                    ID_Entrada
                }).returning("ID_Entrada").then(function (ID_Entrada) {
                    return res.json({ 
                        ID_Entrada: ID_Entrada[0] 
                    });
                  });
            } else {
                await connection('grupo').insert({
                    STR_NomeGrupo, 
                    STR_DescricaoGrupo, 
                    TXT_InviteGrupo, 
                    B_Privado, 
                    NR_Latitude, 
                    NR_Longitude
                })

                return res.status(200).send("Cadastrado com sucesso.")
            }
        } catch (error) {
            return res.status(500).send({
                error_msg:'Não foi possível cadastrar seu grupo no momento :('
            })
        }
        
        
        

        
    }



}