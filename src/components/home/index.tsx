import React from 'react';
import { useQuery } from '@apollo/client';

import { Button, Table } from 'antd';

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
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Kind',
      dataIndex: 'kind',
      key: 'kind',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
  ];

  return (
    <div>
      <Button type="primary">Add friend</Button>
      <Table columns={columns} dataSource={data.animals} />
    </div>
  );
}

export default Home;
