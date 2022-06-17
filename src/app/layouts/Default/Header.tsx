//13.9. Descentralizando o Layout
import { Layout, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import logo from '../../../assets/logo.svg';

const { Header } = Layout;

export default function DefaultLayoutHeader() {
  return (
    /* 13.28. Adicionando a logo no header */
    <Header className='header'>
      <Row justify='space-between' style={{ height: '100%' }} align='middle'>
        <img src={logo} alt={'AlgaNews Admin'} />
        <Avatar />
      </Row>
    </Header>
  );
}
