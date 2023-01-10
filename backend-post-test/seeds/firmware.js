exports.seed = async (knex) => {
  await knex('firmware').insert([
    {
      id: 1,
      createdDate: 'test',
      firmwareVersion: 'test',
      deviceType: 'test',
      status: 'test',
      description: 'test',
      vendorMetadata: 'test',
      firmwareFile: 'test'
    },
  ])
}