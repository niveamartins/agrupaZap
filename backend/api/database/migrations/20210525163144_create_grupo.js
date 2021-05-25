
exports.up = function(knex) {
    return knex.schema.createTable('grupo', function (table){
        table.increments('SQ').primary();
        table.string('ID_Entrada');
        table.string('STR_NomeGrupo', 25).notNullable();
        table.text('STR_DescricaoGrupo', 150).notNullable();
        table.text('TXT_InviteGrupo', 150).notNullable();
        table.boolean('B_Privado').notNullable();
        table.float('NR_Latitude', 14, 10).notNullable();
        table.float('NR_Longitude', 14, 10).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('grupo');
};
