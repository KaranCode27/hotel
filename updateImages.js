import fs from 'fs';

const hotelsToImg = {
  'Taj Lake Palace': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Taj_Lake_Palace_Udaipur_%284824367357%29.jpg/1000px-Taj_Lake_Palace_Udaipur_%284824367357%29.jpg',
  'Trident Udaipur': 'https://images.unsplash.com/photo-1542314841-3eb2c5db4e96?auto=format&fit=crop&w=1000',
  'Hotel Udai Niwas': 'https://images.unsplash.com/photo-1590447158019-883d8d5f8bc7?auto=format&fit=crop&w=1000',
  'The Himalayan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Himalayan_resort.jpg/1000px-Himalayan_resort.jpg',
  'Solang Valley Resort': 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1000',
  'Hotel Mountain Face': 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000',
  'The Leela Kovalam': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Kovalam_Beach.jpg/1000px-Kovalam_Beach.jpg',
  'Taj Bekal Resort': 'https://images.unsplash.com/photo-1574643031206-88ab1972b944?auto=format&fit=crop&w=1000',
  'Coconut Grove': 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=1000',
  'Grand Dragon Ladakh': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Leh_Palace_%26_Namgyal_Tsemo_Gompa.jpg/1000px-Leh_Palace_%26_Namgyal_Tsemo_Gompa.jpg',
  'The Zen Ladakh': 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1000',
  'Zostel Ladakh': 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000',
  'Taj Exotica': 'https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=1000',
  'Grand Hyatt Goa': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Goa_Marriott_Resort_%26_Spa.jpg/1000px-Goa_Marriott_Resort_%26_Spa.jpg',
  'Calangute Residency': 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000',
  'Khyber Resort': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Khyber_Himalayan_Resort_%26_Spa_Gulmarg.jpg/800px-Khyber_Himalayan_Resort_%26_Spa_Gulmarg.jpg',
  'Vivanta Dal View': 'https://images.unsplash.com/photo-1566415082141-9a7da1d6bbd0?auto=format&fit=crop&w=1000',
  'Hotel Hilltop': 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=1000',
  'Oberoi Amarvilas': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Taj_Mahal.jpg/1000px-Taj_Mahal.jpg',
  'Taj Hotel Agra': 'https://images.unsplash.com/photo-1585506942812-e72e4d78b0d1?auto=format&fit=crop&w=1000',
  'Hotel Taj Resorts': 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1000'
};

function run() {
  let seederText = fs.readFileSync('./utils/seeder.js', 'utf8');
  
  for (const [name, imgUrl] of Object.entries(hotelsToImg)) {
    // using string logic since regex was problematic dynamically across multiline.
    // we find "name: 'HotelName'" and then replace the FIRST "images: ['...']" that follows it.
    
    let startIndex = seederText.indexOf("name: '" + name + "'");
    if (startIndex !== -1) {
       let imagesIndex = seederText.indexOf("images: [", startIndex);
       if (imagesIndex !== -1) {
          let closeBracket = seederText.indexOf("]", imagesIndex);
          let currentImagesStr = seederText.substring(imagesIndex, closeBracket + 1);
          let newImagesStr = "images: ['" + imgUrl + "']";
          seederText = seederText.replace(currentImagesStr, newImagesStr);
          console.log("Updated: " + name);
       }
    } else {
       console.log("Not found: " + name);
    }
  }

  fs.writeFileSync('./utils/seeder.js', seederText);
  console.log('Seeder file updated successfully!');
}

run();
