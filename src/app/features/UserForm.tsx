//14.18. Iniciando o formulário de usuário, 14.19. Componente de abas (Tabs)
import { Col, Form, Input, Row, Avatar, DatePicker, Divider, Select, Tabs, Upload } from 'antd';
import React, { useCallback, useState } from 'react';
import { FileService } from 'marcioasan-sdk';
import { UserOutlined } from '@ant-design/icons';
import ImageCrop from 'antd-img-crop';

const { TabPane } = Tabs;

export default function UserForm() {
  //14.23. Fazendo o upload do avatar
  const [avatar, setAvatar] = useState('');
  const handleAvatarUpload = useCallback(async (file: File) => {
    const avatarSource = await FileService.upload(file);
    setAvatar(avatarSource);
  }, []);

  return (
    <Form layout={'vertical'}>
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
        </Col>
        <Col lg={10}>
          <Form.Item label={'Nome'}>
            <Input placeholder={'E.g.: João Silva'} />
          </Form.Item>
          <Form.Item label={'Data de nascimento'}>
            <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} />
          </Form.Item>
        </Col>
        <Col lg={10}>
          <Form.Item label={'Bio'}>
            <Input.TextArea rows={5} />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Divider />
        </Col>
        <Col lg={12}>
          <Form.Item label={'Perfil'}>
            <Select placeholder={'Selecione um perfil'}>
              <Select.Option value={'EDITOR'}>Editor</Select.Option>
              <Select.Option value={'ASSISTANT'}>Assistente</Select.Option>
              <Select.Option value={'MANAGER'}>Gerente</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col lg={12}>
          <Form.Item label={'Email'}>
            <Input type='email' placeholder={'E.g.: contato@joao.silva'} />
          </Form.Item>
        </Col>
        <Col lg={24}>
          <Divider />
        </Col>
        <Col lg={24}>
          <Tabs defaultActiveKey={'personal'}>
            <TabPane key={'personal'} tab={'Dados pessoais'}>
              {/* 14.20. Dados pessoais */}
              <Row gutter={24}>
                <Col lg={8}>
                  <Form.Item label={'País'}>
                    <Input placeholder={'E.g.: Brasil'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'Estado'}>
                    <Input placeholder={'E.g.: Espírito Santo'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'Cidade'}>
                    <Input placeholder={'E.g.: Vitória'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'Telefone'}>
                    <Input placeholder={'(27) 99999-0000'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'CPF'}>
                    <Input placeholder={'111.222.333-44'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'Preço por palavra'}>
                    <Input placeholder={'0'} />
                  </Form.Item>
                </Col>

                {/* 14.21. Substituindo diretivas ngFor e vFor com Array fill map */}
                {/* {Array(3).fill(null).map((_, index) => { */}
                {[1, 2, 3].map((_, index) => {
                  return (
                    <React.Fragment key={index}>
                      <Col lg={6}>
                        <Form.Item label={'Habilidade'}>
                          <Input placeholder={'E.g.: JavaScript'} />
                        </Form.Item>
                      </Col>
                      <Col lg={2}>
                        <Form.Item label={'%'}>
                          <Input />
                        </Form.Item>
                      </Col>
                    </React.Fragment>
                  );
                })}
              </Row>
            </TabPane>
            <TabPane key={'bankAccount'} tab={'Dados bancários'}>
              {/* 14.22. Desafio - Dados bancários */}
              <Row gutter={24}>
                <Col lg={8}>
                  <Form.Item label={'Instituição'}>
                    <Input placeholder={'260'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'Agência'}>
                    <Input placeholder={'0001'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'Conta sem dígito'}>
                    <Input placeholder={'12345'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'Dígito'}>
                    <Input placeholder={'1'} />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <Form.Item label={'Tipo de conta'}>
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
      </Row>
    </Form>
  );
}
