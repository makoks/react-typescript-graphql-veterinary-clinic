import { gql } from '@apollo/client';

const ANIMALS_LIST = gql`
  query Animals {
    animals {
      id
      name
      kind
      age
      gender
      caseRecord
      owner {
        name
        phone
        email
        address
        id
      }
    }
  }
`;

export default ANIMALS_LIST;
