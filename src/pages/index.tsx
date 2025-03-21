import React, { useState } from 'react';
import { getServerSideProps } from './api/getMushrooms';

type Mushroom = {
    _id: string;
  name: string;
  description: string;
  location: string;
  uses: string[];
  imageUrl: string;
}

type Props = {
    mushrooms: Mushroom[];
  };
  

const homepage = ({ mushrooms }: Props) => {

  return (
    <div>
      <h1>List of Mushrooms</h1>
      {mushrooms.map((mushroom) => (
        <li key={mushroom._id}>
          <h2>{mushroom.name}</h2>
          <p>{mushroom.description}</p>
          <p>Location: {mushroom.location}</p>
          <img src={mushroom.imageUrl} alt={mushroom.name} width={150} />
        </li>
      ))}
    </div>
  )
}

export default homepage

export { getServerSideProps };
