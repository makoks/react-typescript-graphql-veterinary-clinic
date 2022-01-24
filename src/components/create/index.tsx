import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import {
  Space,
  Button,
  Alert,
  Form,
  Input,
  InputNumber,
  Radio,
  Select
} from 'antd';
import { RollbackOutlined } from '@ant-design/icons';

import OWNERS_LIST from '../../graphql/queries/ownersList';
import UPDATE_ANIMAL from '../../graphql/migrations/updateAnimal';

import { Gender } from '../../__generated__/globalTypes';
import { Owners } from '../../graphql/queries/__generated__/Owners';
import {
  UpdateAnimal,
  UpdateAnimalVariables
} from '../../graphql/migrations/__generated__/UpdateAnimal';

function Create(): JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const [form] = Form.useForm();

  const {
    loading: ownersLoading,
    error: ownersError,
    data: ownersData
  } = useQuery<Owners>(OWNERS_LIST);

  const [createAnimal, {
    loading: createLoading,
    error: createError
  }] = useMutation<UpdateAnimal, UpdateAnimalVariables>(UPDATE_ANIMAL, {
    onCompleted(data) {
      if (!data.updateAnimal.success) {
        setErrorMessage(data.updateAnimal.message);
        return;
      }
      setSuccessMessage(data.updateAnimal.message);
      form.resetFields();
    }
  });

  const onFinish = (values: UpdateAnimalVariables) => {
    setErrorMessage('');
    setSuccessMessage('');
    createAnimal({ variables: values });
  };

  return (
    <Space
      direction="vertical"
      size="large"
      style={{width: '100%', maxWidth: 600, textAlign: 'start'}}
    >
      <Button icon={<RollbackOutlined />} type="text" href="/">
        Back to list
      </Button>

      {(ownersError || createError || errorMessage) && (
        <Alert
          message="Error"
          description={errorMessage || 'Something went wrong...'}
          type="error"
          showIcon
        />
      )}

      {successMessage && (
        <Alert
          message="Success"
          description={successMessage}
          type="success"
          showIcon
        />
      )}

      <Form onFinish={onFinish} layout="vertical" wrapperCol={{span: 24}} form={form}>
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
          name="ownerId"
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
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={createLoading}
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
}

export default Create;
