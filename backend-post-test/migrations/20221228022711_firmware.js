exports.up = function (knex) {
    return knex.schema.createTable('firmware', (table) => {
        table.increments('id')
        table.string('createdDate')
        table.string('firmwareVersion')
        table.string('deviceType')
        table.string('status')
        table.string('description')
        table.string('vendorMetadata')
        table.string('firmwareFile')
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('firmware')
}
