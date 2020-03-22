const faker = require('faker');
const slugify = require('slugify');
const Category = require('../../../app/models/category');

for (var i = 0; i < 5; ++i) {
  var name = faker.company.companyName();
  var slug = slugify(name, {
    replacement: '-',
    remove: /[&,+()$~%.'":*?<>{}]/g,
    lower: true
  });

  var banners = [];
  var plans = [];
  var representatives = [];

  for (var j = 0; j < 5; ++j) {
    banners.push({
      image_url:
        faker.image.unsplash.imageUrl() + '?random=' + faker.random.number()
    });

    plans.push({
      name: faker.lorem.words(),
      description: faker.lorem.paragraphs()
    });

    representatives.push({
      name: faker.name.firstName(),
      description: faker.lorem.sentence(),
      photo_url:
        faker.image.unsplash.imageUrl() + '?random=' + faker.random.number()
    });
  }

  var newCategory = new Category({
    name: name,
    slug: slug,
    logo_url:
      faker.image.unsplash.imageUrl() + '?random=' + faker.random.number(),
    description: faker.lorem.paragraph(),
    banners: banners,
    plans: plans,
    representatives: representatives
  });

  newCategory.save().catch(error => console.log(error));
}
