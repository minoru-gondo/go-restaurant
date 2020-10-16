import React, { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import { Container } from './styles';
import { Grid } from '@material-ui/core';

interface IFoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

interface IProps {
  food: IFoodPlate;
  handleDelete: (id: number) => {};
  handleUpdateAvailableFood: (id: number, available: boolean) => {};
  handleEditFood: (food: IFoodPlate) => void;
}

const Food: React.FC<IProps> = ({
  food,
  handleDelete,
  handleEditFood,
  handleUpdateAvailableFood,
}: IProps) => {
  const [isAvailable, setIsAvailable] = useState(food.available);

  async function toggleAvailable(id: number): Promise<void> {
    handleUpdateAvailableFood(id, !isAvailable);
    setIsAvailable(!isAvailable);
  }

  function setEditingFood(): void {
    handleEditFood(food);
  }

  return (
    <Container available={isAvailable}>
      <Grid xs={12} item={true} className="header">
        <img src={food.image} alt={food.name} />
      </Grid>
      <Grid container xs={12} item={true} direction="column" className="body">
        <h2>{food.name}</h2>
        <div>
          <p>{food.description}</p>
          <p className="price">
            R$ <b>{food.price}</b>
          </p>
        </div>
      </Grid>
      <Grid
        container
        xs={12}
        item={true}
        className="footer"
        justify="space-between"
      >
        <Grid
          container
          xs={12}
          sm={6}
          item={true}
          justify="flex-start"
          alignItems="center"
        >
          <div className="icon-container">
            <button
              type="button"
              className="icon"
              onClick={() => setEditingFood()}
              data-testid={`edit-food-${food.id}`}
            >
              <FiEdit3 size={20} />
            </button>

            <button
              type="button"
              className="icon"
              onClick={() => handleDelete(food.id)}
              data-testid={`remove-food-${food.id}`}
            >
              <FiTrash size={20} />
            </button>
          </div>
        </Grid>
        <Grid
          container
          xs={12}
          sm={6}
          item={true}
          justify="flex-end"
          alignItems="center"
        >
          <div className="availability-container">
            <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

            <label htmlFor={`available-switch-${food.id}`} className="switch">
              <input
                id={`available-switch-${food.id}`}
                type="checkbox"
                checked={isAvailable}
                onChange={() => toggleAvailable(food.id)}
                data-testid={`change-status-food-${food.id}`}
              />
              <span className="slider" />
            </label>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Food;
