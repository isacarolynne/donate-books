import React, {useState} from 'react';

import Book from './Book'
import Donation from './Donation'

import { 
  ContainerNewDonate,
  ScrollViewNewDonate,
} from './style'

export default function NewDonate() {

  function handleNewDonation(id) {
    console.log('aqui')
  }
  return (
    <ScrollViewNewDonate>
      <ContainerNewDonate>
          <Book
            handleNewDonation={handleNewDonation}
          />
      </ContainerNewDonate>
    </ScrollViewNewDonate>
  );
}
