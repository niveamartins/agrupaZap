exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("grupo")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("grupo").insert([
        {
          STR_NomeGrupo: "Teste 1",
          STR_DescricaoGrupo: "Grupo de Teste 1",
          TXT_InviteGrupo: "https://chat.whatsapp.com/LNJsGsNGnHrAxSgCby",
          B_Privado: false,
          NR_Latitude: 51.001,
          NR_Longitude: 4.001,
        },
        {
          STR_NomeGrupo: "Teste 2",
          STR_DescricaoGrupo: "Grupo de Teste 2",
          ID_Entrada: 123456,
          TXT_InviteGrupo: "https://chat.whatsapp.com/LNJsNGnHrAxSgCby",
          B_Privado: true,
          NR_Latitude: 0,
          NR_Longitude: 0,
        },
      ]);
    });
};
