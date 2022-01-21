/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Gender } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: Animals
// ====================================================

export interface Animals_animals_owner {
  __typename: "Owner";
  name: string;
  phone: string;
  email: string | null;
  address: string | null;
  id: string;
}

export interface Animals_animals {
  __typename: "Animal";
  id: string;
  name: string;
  kind: string | null;
  age: number | null;
  gender: Gender | null;
  caseRecord: string | null;
  owner: Animals_animals_owner;
}

export interface Animals {
  animals: Animals_animals[] | null;
}
