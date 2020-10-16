import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { useToast } from '../../contexts/toast';

interface IFoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<IFoodPlate[]>([]);
  const [editingFood, setEditingFood] = useState<IFoodPlate>({} as IFoodPlate);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      api.get<IFoodPlate[]>('/foods').then(res => {
        setFoods(res?.data);
      });
    }

    loadFoods();
  }, []);

  async function handleAddFood(
    food: Omit<IFoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    try {
      api.post('/foods', food).then(res => {
        setFoods([...foods, res.data]);
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(
    food: Omit<IFoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    let updatedFood = {
      ...food,
      id: editingFood.id,
      available: editingFood.available,
    };

    api.put(`/foods/${editingFood.id}`, updatedFood).then(res => {
      let foodsCopy = [...foods],
        foodAlteredIdx = foods.findIndex(f => f.id === editingFood.id);
      foodsCopy[foodAlteredIdx] = updatedFood;
      setFoods(foodsCopy);
      setEditingFood({} as IFoodPlate);
    });
  }

  async function handleDeleteFood(id: number): Promise<void> {
    try {
      api.delete(`/foods/${id}`).then(() => {
        setFoods(foods.filter(food => food.id !== id));
        showToast({
          type: 'success',
          message: `Prato removido com sucesso!`,
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateAvailableFood(
    id: number,
    available: boolean,
  ): Promise<void> {
    try {
      let foodAlteredIdx = foods.findIndex(f => f.id === id);
      let updatedFood = foods[foodAlteredIdx];
      if (updatedFood?.id) {
        updatedFood.available = available;
        api.put(`/foods/${id}`, updatedFood).then(() => {
          let foodsCopy = [...foods];
          if (foodAlteredIdx !== -1) {
            foodsCopy[foodAlteredIdx] = updatedFood;
          }
          setFoods(foodsCopy);
          showToast({
            type: 'success',
            message: `Prato ${
              !available ? 'in' : ''
            }disponibilizado com sucesso!`,
          });
        });
      }
    } catch (err) {
      showToast({
        type: 'error',
        message: 'Erro ao alterar disponibilidade do prato',
      });
    }
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: IFoodPlate): void {
    setEditingFood(food);
    toggleEditModal();
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
              handleUpdateAvailableFood={handleUpdateAvailableFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
