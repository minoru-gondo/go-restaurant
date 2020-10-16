import React from 'react';
import { FiPlusSquare } from 'react-icons/fi';
import { Container } from './styles';
import Logo from '../../assets/logo.svg';
import { Grid } from "@material-ui/core";

interface IHeaderProps {
  openModal: () => void;
}

const Header: React.FC<IHeaderProps> = ({ openModal }) => (
  <Container>
    <Grid container justify="space-between">
      <Grid container xs={12} sm={6} item={true} justify="flex-start" alignItems="center" className="header-item">
        <img src={Logo} alt="GoRestaurant" />
      </Grid>
      <Grid container xs={12} sm={6} item={true} justify="flex-end" alignItems="center"  className="header-item">
        <button
          type="button"
          onClick={() => {
            openModal()
          }}>
          <div className="text">Novo Prato</div>
          <div className="icon">
            <FiPlusSquare size={24} />
          </div>
        </button>
      </Grid>
    </Grid>
  </Container>
);

export default Header;
