const connection = require('../database/connection');

module.exports = {
    async lista(req,res) {
        const grupos = await connection('grupo').select('*');

        // Fazer aqui a parte do Raio de 1 km.

        return res.json(grupos);
    },

    async invitePrivado(req, res) {
      const { ID_Grupo, ID_Entrada } = req.params;
        
      const grupo = await connection("grupo")
      .where("SQ", ID_Grupo)
      .select('*')

      
        if (grupo.ID_Entrada === ID_Entrada) {
            return res.json(grupo)
        } else {
            return res.json({
                error: "O ID de entrada inserido não é o cadastrado."
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
        
        const infos_cadastro = await connection('grupo').insert({
            STR_NomeGrupo, 
            STR_DescricaoGrupo, 
            TXT_InviteGrupo, 
            B_Privado, 
            NR_Latitude, 
            NR_Longitude
        });

        return res.json(infos_cadastro);
    }



}