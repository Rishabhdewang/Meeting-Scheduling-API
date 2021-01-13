
exports.up = function(knex) {
  return knex.schema.createTable("meeting", (t1) => {
    t1.increments("id").primary();
    t1.string("Title").notNullable();
    t1.bigInteger("StartTime").notNullable();
    t1.bigInteger("EndTime").notNullable();
    t1.timestamp('CreatedAt').defaultTo(knex.fn.now());
  //   t1.timestamp('updatedAt').defaultTo(knex.fn.now());
})

  
};

exports.down = function(knex) {
    return  knex.schema.dropTableIfExists('meeting')
};
