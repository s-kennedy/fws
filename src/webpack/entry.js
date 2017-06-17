import Instafeed from 'instafeed.js'
import Masonry from 'masonry-layout'

const feed = new Instafeed({
    get: 'user',
    userId: '5518351442',
    accessToken: '5518351442.9259fc8.e9388e5e1cfa4ad69441a018bf7d122e',
    template: '<div class="grid-item"><a href={{link}}><img src="{{image}}"  /></a></div>',
    resolution: 'standard_resolution',
    sortBy: 'most-liked',
    limit: 16,
    filter: (img) => (
      img.type === 'image' &&
      (img.images.standard_resolution.height === img.images.standard_resolution.width)
    )
});

feed.run();
