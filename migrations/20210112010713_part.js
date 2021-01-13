
exports.up = function(knex) {
  return knex.schema.createTable("participant", (t2)=> {
    t2.increments("id").notNullable().primary();
    t2.integer("MeetingId").references("id").inTable("meeting").onDelete("CASCADE");
    t2.string("Name").notNullable();
    t2.string("Email").notNullable();
    t2.enum("RSPV",['Yes','No','MayBe','NotAnswerd']);
  })

};

exports.down = function(knex) {
   return knex.schema.dropTableIfExists('participant');
};
