import React from 'react';
import { useQuery } from '@apollo/client';

import { Button } from 'antd';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4';

import ANIMALS_LIST from '../../graphql/queries/animalList';
import { Animals } from '../../graphql/queries/__generated__/Animals';

function Home(): JSX.Element {
  const { loading, error, data } = useQuery<Animals>(ANIMALS_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data || !data.animals) return <p>There is no animals</p>;

  const columns = [
    {
      title: 'Name',
      name: 'name',
    },
    {
      title: 'Kind',
      name: 'kind',
    },
    {
      title: 'Age',
      name: 'age',
    },
    {
      title: 'Gender',
      name: 'gender',
    },
  ];

  return (
    <div style={{textAlign: 'start'}}>
      <Button type="primary" href="/create">Add friend</Button>
      <Grid columns={columns} rows={data.animals}>
        <Table />
        <TableHeaderRow />
      </Grid>
    </div>
  );
}

export default Home;
