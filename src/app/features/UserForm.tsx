//14.18. Iniciando o formulário de usuário, 14.19. Componente de abas (Tabs)
import {
  Col,
  Form,
  Input,
  Row,
  Avatar,
  DatePicker,
  Divider,
  Select,
  Tabs,
  Upload,
  Button,
  notification,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { FileService, User, UserService } from 'marcioasan-sdk';
import { UserOutlined } from '@ant-design/icons';
import ImageCrop from 'antd-img-crop';

import CustomError from 'marcioasan-sdk/dist/CustomError';

const { TabPane } = Tabs;

export default function UserForm() {
  //14.23. Fazendo o upload do avatar
  const [avatar, setAvatar] = useState('');
  const [activeTab, setActiveTab] = useState<'personal' | 'bankAccount'>('personal');

  //14.32. Controlando o estado do formulário - 3'30"
  const [form] = Form.useForm<User.Input>();

  const handleAvatarUpload = useCallback(async (file: File) => {
    const avatarSource = await FileService.upload(file);
    setAvatar(avatarSource);
    //14.32. Controlando o estado do formulário - 5'
    form.setFieldsValue({
      avatarUrl: avatarSource,
    });
  }, []);

  //14.32. Controlando o estado do formulário - 7'30"
  useEffect(() => {
    form.setFieldsValue({
      avatarUrl: avatar || undefined,
    });
  }, [avatar]);

  return (
    <Form
      form={form}
      layout={'vertical'}
      //14.29. Identificando erros em abas com Array reduce - 7', 14.30. Otimizando o algoritmo de busca de erros
      onFinishFailed={(fields) => {
        let bankAccountErrors = 0;
        let personalDataErrors = 0;

        fields.errorFields.forEach(({ name }) => {
          if (name.includes('bankAccount')) bankAccountErrors++;
          if (
            name.includes('location') ||
            name.includes('skills') ||
            name.includes('phone') ||
            name.includes('taxpayerId') ||
            name.includes('pricePerWord')
          )
            personalDataErrors++;
        });
        if (bankAccountErrors > personalDataErrors) {
          setActiveTab('bankAccount');
          //window.alert(`existem ${bankAccountErrors} erros na aba dados bancários`);
        }

        if (personalDataErrors > bankAccountErrors) {
          setActiveTab('personal');
          //window.alert(`existem ${personalDataErrors} erros na aba dados pessoais`);
        }
      }}
      //14.33. Tentando cadastrar o usuário na API - 2'
      onFinish={async (user: User.Input) => {
        try {
          await UserService.insertNewUser(user);
          notification.success({
            message: 'Sucesso',
            description: 'usuário criado com sucesso',
          });
        } catch (error) {
          if (error instanceof CustomError) {
            if (error.data?.objects) {
              form.setFields(
                error.data.objects.map((error) => {
                  return {
                    name: error.name?.split('.') as string[],
                    errors: [error.userMessage],
                  };
                })
              );
            }
          } else {
            notification.error({
              message: 'Houve um erro',
            });
          }
        }
      }}
    >
      <Row gutter={24} align={'middle'}>
        <Col lg={4}>
          {/* 14.24. Recortando e redimensionando imagens no front-end */}
          <ImageCrop rotate shape={'round'} grid aspect={1}>
            <Upload
              maxCount={1}
              onRemove={() => {
                setAvatar('');
              }}
              /* 14.25. Corrigindo uns bugs no upload - 1'40" */
              beforeUpload={(file) => {
                handleAvatarUpload(file);
                return false;
              }}
            >
              <Avatar
                style={{ cursor: 'pointer' }}
                icon={<UserOutlined />}
                src={avatar}
                size={128}
              />
            </Upload>
          </ImageCrop>
          {/* 14.32. Controlando o estado do formulário - 2'*/}
          <Form.Item name={'avatarUrl'} hidden>
            {/* 14.33. Tentando cadastrar o usuário na API - 30" incluir essa tag para sumir com warning do console --> Warning: [antd: Form.Item] `name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.*/}
            <Input hidden />
          </Form.Item>
        </Col>
        <Col lg={10}>
          <Form.Item
            label={'Nome'}
            name={'name'}
            rules={[
              {
                required: true,
                message: 'O campo é obrigatório',
              },
            ]}
          >
            <Input placeholder={'E.g.: João Silva'} />
          </Form.Item>
          <Form.Item
            label={'Data de nascimento'}
            name={'birthdate'}
            rules={[
              {
                required: true,
                message: 'O campo é obrigatório',
              },
            ]}
          >
            <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} />
          </Form.Item>
        </Col>
        <Col lg={10}>
          <Form.Item
            label={'Bio'}
            name={'bio'}
            rules={[
              {
                required: true,
                message: 'O campo é obrigatório',
              },
            ]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Divider />
        </Col>
        <Col lg={12}>
          <Form.Item
            label={'Perfil'}
            name={'role'}
            rules={[
              {
                required: true,
                message: 'O campo é obrigatório',
              },
            ]}
          >
            <Select placeholder={'Selecione um perfil'}>
              <Select.Option value={'EDITOR'}>Editor</Select.Option>
              <Select.Option value={'ASSISTANT'}>Assistente</Select.Option>
              <Select.Option value={'MANAGER'}>Gerente</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col lg={12}>
          <Form.Item
            label={'Email'}
            name={'email'}
            rules={[
              {
                required: true,
                message: 'O campo é obrigatório',
              },
            ]}
          >
            <Input type='email' placeholder={'E.g.: contato@joao.silva'} />
          </Form.Item>
        </Col>
        <Col lg={24}>
          <Divider />
        </Col>
        <Col lg={24}>
          <Tabs
            defaultActiveKey={'personal'}
            activeKey={activeTab}
            /* 14.31. Controlando as abas por meio de estado - 2'30" */
            onChange={(tab) => setActiveTab(tab as 'personal' | 'bankAccount')}
          >
            <TabPane key={'personal'} tab={'Dados pessoais'}>
              {/* 14.20. Dados pessoais */}
              <Row gutter={24}>
                <Col lg={8}>
                  <Form.Item
                    label={'País'}
                    name={['location', 'country']}
                    rules={[
                      {
                        required: true,
                        message: 'O campo é obrigatório',
                      },
                    ]}
                  >
                    <Input placeholder={'E.g.: Brasil'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'Estado'}
                    name={['location', 'state']}
                    rules={[
                      {
                        required: true,
                        message: 'O campo é obrigatório',
                      },
                    ]}
                  >
                    <Input placeholder={'E.g.: Espírito Santo'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'Cidade'}
                    name={['location', 'city']}
                    rules={[
                      {
                        required: true,
                        message: 'O campo é obrigatório',
                      },
                    ]}
                  >
                    <Input placeholder={'E.g.: Vitória'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'Telefone'}
                    name={'phone'}
                    rules={[
                      {
                        required: true,
                        message: 'O campo é obrigatório',
                      },
                    ]}
                  >
                    <Input placeholder={'(27) 99999-0000'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'CPF'}
                    name={'taxpayerId'}
                    rules={[
                      {
                        required: true,
                        message: 'O campo é obrigatório',
                      },
                    ]}
                  >
                    <Input placeholder={'111.222.333-44'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'Preço por palavra'}
                    name={'pricePerWord'}
                    rules={[
                      {
                        required: true,
                        message: 'O campo é obrigatório',
                      },
                    ]}
                  >
                    <Input placeholder={'0'} />
                  </Form.Item>
                </Col>

                {/* 14.21. Substituindo diretivas ngFor e vFor com Array fill map */}
                {/* {Array(3).fill(null).map((_, index) => { */}
                {[1, 2, 3].map((_, index) => {
                  return (
                    <React.Fragment key={index}>
                      <Col lg={6}>
                        {/* 14.26. Montando o objeto do formulário - 6'20" */}
                        <Form.Item
                          label={'Habilidade'}
                          name={['skills', index, 'name']}
                          rules={[
                            {
                              required: true,
                              message: 'O campo é obrigatório',
                            },
                          ]}
                        >
                          <Input placeholder={'E.g.: JavaScript'} />
                        </Form.Item>
                      </Col>
                      <Col lg={2}>
                        <Form.Item
                          label={'%'}
                          name={['skills', index, 'percentage']}
                          rules={[
                            {
                              required: true,
                              message: '',
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </React.Fragment>
                  );
                })}
              </Row>
            </TabPane>
            {/* 14.27. Forçando a renderização de uma aba */}
            <TabPane key={'bankAccount'} tab={'Dados bancários'} forceRender>
              {/* 14.22. Desafio - Dados bancários */}
              <Row gutter={24}>
                <Col lg={8}>
                  <Form.Item
                    label={'Instituição'}
                    name={['bankAccount', 'bankCode']}
                    rules={[
                      {
                        required: true,
                        message: 'O campo é obrigatório',
                      },
                    ]}
                  >
                    <Input placeholder={'260'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'Agência'}
                    name={['bankAccount', 'agency']}
                    rules={[
                      {
                        required: true,
                        message: 'O campo é obrigatório',
                      },
                    ]}
                  >
                    <Input placeholder={'0001'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'Conta sem dígito'}
                    name={['bankAccount', 'number']}
                    rules={[
                      {
                        required: true,
                        message: 'O campo é obrigatório',
                      },
                    ]}
                  >
                    <Input placeholder={'12345'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'Dígito'}
                    name={['bankAccount', 'digit']}
                    rules={[
                      {
                        required: true,
                        message: 'O campo é obrigatório',
                      },
                    ]}
                  >
                    <Input placeholder={'1'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item
                    label={'Tipo de conta'}
                    name={['bankAccount', 'type']}
                    rules={[
                      {
                        required: true,
                        message: 'O campo é obrigatório',
                      },
                    ]}
                  >
                    <Select placeholder={'Selecione o tipo de conta'}>
                      <Select.Option value={'SAVING'}>Conta poupança</Select.Option>
                      <Select.Option value={'CHECKING'}>Conta corrente</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Col>
        {/* 14.26. Montando o objeto do formulário */}
        <Col lg={24}>
          <Row justify={'end'}>
            <Button type={'primary'} htmlType={'submit'}>
              Cadastrar usuário
            </Button>
          </Row>
        </Col>
      </Row>
    </Form>
  );
}
