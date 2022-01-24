import { gql } from '@apollo/client';

const UPDATE_ANIMAL = gql`
  mutation UpdateAnimal(
    $updateAnimalId: ID,
    $age: Int,
    $name: String,
    $kind: String,
    $gender: Gender,
    $caseRecord: String,
    $ownerId: ID
  ) {
    updateAnimal(
      id: $updateAnimalId,
      age: $age,
      name: $name,
      kind: $kind,
      gender: $gender,
      caseRecord: $caseRecord,
      ownerId: $ownerId
    ) {
      success
      message
    }
  }
`;

export default UPDATE_ANIMAL;
