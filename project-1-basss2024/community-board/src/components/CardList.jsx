import React from 'react';
import Card from './Card';

const beaches = [
  {
    name: 'Siesta Key',
    description: 'Known for its quartz-white sand and turquoise waters.',
    image: 'c:\Users\shami\OneDrive\Pictures\Camera Roll\siestakey.jpg',
  },
  {
    name: 'Clearwater Beach',
    description: 'A lively beach with calm waters and nearby attractions.',
    image: 'c:\Users\shami\OneDrive\Pictures\Camera Roll\clearwater beach.jpg',
  },
  {
    name: 'Delray Beach'
    description: 'Famous for friendly atmosphere of a small town',
    image: 'c:\Users\shami\OneDrive\Pictures\Camera Roll\delraybeach.jpg',
  },
  // Add more beaches as needed
];

const CardList = () => {
  return (
    <div className="card-list">
      {beaches.map((beach, index) => (
        <Card
          key={index}
          name={beach.name}
          description={beach.description}
          image={beach.image}
        />
      ))}
    </div>
  );
};

export default CardList;
