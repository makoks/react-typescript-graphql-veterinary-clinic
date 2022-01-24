import React from 'react';
import { useQuery } from '@apollo/client';

import { Space, Button, Form, Input, InputNumber, Radio, Select } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';

import OWNERS_LIST from '../../graphql/queries/ownersList';
import { Gender } from '../../__generated__/globalTypes';
import { Owners } from '../../graphql/queries/__generated__/Owners';

function Create(): JSX.Element {
  const {
    loading: ownersLoading,
    error: ownersError,
    data: ownersData
  } = useQuery<Owners>(OWNERS_LIST);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  if (ownersError) return <div>Something went wrong...</div>;

  return (
    <Space
      direction="vertical"
      size="large"
      style={{width: '100%', maxWidth: 600, textAlign: 'start'}}
    >
      <Button icon={<RollbackOutlined />} type="text" href="/">
        Back to list
      </Button>
      <Form onFinish={onFinish} layout="vertical" wrapperCol={{span: 24}}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input pet name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Kind" name="kind">
          <Input />
        </Form.Item>

        <Form.Item label="Age" name="age">
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item label="Gender" name="gender">
          <Radio.Group>
            <Radio.Button value={Gender.Male}>{Gender.Male}</Radio.Button>
            <Radio.Button value={Gender.Female}>{Gender.Female}</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Case Record" name="caseRecord">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Owner"
          name="owner"
          rules={[{ required: true, message: 'Please select owner!' }]}
        >
          <Select loading={ownersLoading}>
            {ownersData && ownersData.owners &&
              ownersData.owners.map(({ id, name, phone }) => (
                <Select.Option value={id} key={id}>
                  {`${name}, ${phone}`}
                </Select.Option>
              ))
            }
          </Select>
        </Form.Item>

        <Form.Item style={{textAlign: 'end'}}>
          <Button type="primary" htmlType="submit" size="large">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
}

export default Create;
