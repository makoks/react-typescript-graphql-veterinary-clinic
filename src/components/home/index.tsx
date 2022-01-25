import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  DataTypeProvider,
  SortingState,
  IntegratedSorting,
  Column
} from '@devexpress/dx-react-grid';

import { Space, Button, Alert, Spin, Tooltip } from 'antd';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableBandHeader
} from '@devexpress/dx-react-grid-bootstrap4';
import { PlusOutlined } from '@ant-design/icons';

import ANIMALS_LIST from '../../graphql/queries/animalList';
import {
  Animals,
  Animals_animals
} from '../../graphql/queries/__generated__/Animals';

function Home(): JSX.Element {
  const { loading, error, data } = useQuery<Animals>(ANIMALS_LIST);

  const [columns] = useState<Column[]>([
    { title: 'Name', name: 'name' },
    { title: 'Kind', name: 'kind' },
    { title: 'Age', name: 'age' },
    { title: 'Gender', name: 'gender' },
    { title: 'Case Record', name: 'caseRecord' },
    {
      title: 'Name',
      name: 'ownerName',
      getCellValue: (row: Animals_animals) => row.owner.name,
    },
    {
      title: 'Phone',
      name: 'ownerPhone',
      getCellValue: (row: Animals_animals) => row.owner.phone,
    },
    {
      title: 'Email',
      name: 'ownerEmail',
      getCellValue: (row: Animals_animals) => row.owner.email,
    },
    {
      title: 'Address',
      name: 'ownerAddress',
      getCellValue: (row: Animals_animals) => row.owner.address,
    },
    { title: 'Actions', name: 'actions' },
  ]);

  const [columnBands] = useState<TableBandHeader.ColumnBands[]>([{
    title: 'Owner',
    children: [
      { columnName: 'ownerName' },
      { columnName: 'ownerPhone' },
      { columnName: 'ownerEmail' },
      { columnName: 'ownerAddress' },
    ],
  }]);

  const CaseRecordFormatter = ({ value }: {value: string}) => (
    <Tooltip placement="bottom" title={value}>
      {value.length > 20 ? `${value.slice(0, 19)}...` : value}
    </Tooltip>
  );

  return (
    <Space direction="vertical" size="large" style={{textAlign: 'start'}}>
      <div style={{textAlign: 'end'}}>
        <Button type="primary" href="/create" icon={<PlusOutlined />}>
          Add friend
        </Button>
      </div>

      {error && (
        <Alert
          message="Error"
          description="Something went wrong..."
          type="error"
          showIcon
        />
      )}

      {loading ? (
        <div style={{textAlign: 'center'}}>
          <Spin />
        </div>

      ) : !data || !data.animals ? (
        <div>There is no animals</div>

      ) : (
        <Grid columns={columns} rows={data.animals}>
          <SortingState
            defaultSorting={[{columnName: 'name', direction: 'asc'}]}
          />
          <IntegratedSorting />
          <DataTypeProvider
            formatterComponent={CaseRecordFormatter}
            for={['caseRecord']}
          />
          <Table />
          <TableHeaderRow showSortingControls />
          <TableBandHeader columnBands={columnBands} />
        </Grid>
      )}
    </Space>
  );
}

export default Home;
