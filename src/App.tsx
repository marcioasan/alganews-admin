//13.10. Instalando a biblioteca de gráficos
import { Col, Divider, Row, Space, Typography } from 'antd';
import CompanyMetrics from './app/features/CompanyMetrics';
import LatestPosts from './app/features/LatestPosts';

const { Title, Paragraph } = Typography;

function App() {
  return (
    /* 13.19. Espaçamento entre Rows (componente Space */
    <Space direction='vertical' size={'middle'}>
      <Row>
        <Col span={24}>
          <Title level={2}>Olá, José Sousa</Title>
          <Paragraph>Este é o resumo da empresa nos últimos doze meses</Paragraph>
        </Col>
        <Col span={24}>
          <CompanyMetrics />
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={24}>
          <Title level={3}>Últimos posts</Title>
        </Col>
        <Col span={24}>
          <LatestPosts />
        </Col>
      </Row>
    </Space>
  );
}

export default App;
