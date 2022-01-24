import { gql } from '@apollo/client';

const OWNERS_LIST = gql`
  query Owners {
    owners {
      id
      name
      phone
    }
  }
`;

export default OWNERS_LIST;
