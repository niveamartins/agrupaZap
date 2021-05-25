const connection = require('../database/connection');

module.exports = {
    async lista(req,res) {
        const grupos = await connection('grupo').select('*');

        // Fazer aqui a parte do Raio de 1 km.

        return res.json(grupos);
    },

    async invitePrivado(req, res) {
    
      const { ID_Grupo, ID_Entrada } = req.query;
        
        const grupo = await connection("grupo")
        .where("SQ", ID_Grupo)
        .select('*')

      
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
            }
        } catch (error) {
            return res.status(500).send({
                error_msg:'Não foi possível cadastrar seu grupo no momento :('
            })
        }
        
        
        

        
    }



}