import React, {useState} from 'react';

import Book from './Book'
import Donation from './Donation'

import { 
  ContainerNewDonate,
  ScrollViewNewDonate,
} from './style'

export default function NewDonate() {


  return (
    <ScrollViewNewDonate>
      <ContainerNewDonate>
          <Book/>
      </ContainerNewDonate>
    </ScrollViewNewDonate>
  );
}
