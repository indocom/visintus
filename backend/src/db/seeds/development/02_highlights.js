const faker = require('faker');
const Highlight = require('../../../app/models/highlight');

for (var i = 0; i < 5; ++i) {
  var newHighlight = new Highlight({
    image_url:
      faker.image.unsplash.imageUrl() + '?random=' + faker.random.number(),
    description: faker.lorem.sentences(),
    hyperlink: faker.internet.url()
  });

  newHighlight.save().catch(error => console.log(error));
}
