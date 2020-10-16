import React from 'react';

import { render, fireEvent, act, wait } from '@testing-library/react';
import AxiosMock from 'axios-mock-adapter';
import api from '../../services/api';

import Dashboard from '../../pages/Dashboard';

const apiMock = new AxiosMock(api);

describe('Dashboard', () => {
  it('listar pratos', async () => {
    apiMock.onGet('foods').reply(200, [
      {
        id: 1,
        image: "https://img.cybercook.com.br/receitas/985/macarrao-ao-pesto-2-623x350.jpeg",
        name: "Macarrão ao molho pesto",
        price: "42,00",
        description: "Macarrão ao molho pesto, cheiro verde e queijo.",
        available: true
      },
      {
        id: 2,
        image: "https://www.receitasagora.com.br/wp-content/uploads/2020/05/receita-macarrao-vegano-scaled.jpg",
        name: "Macarrão vegano",
        price: "21,90",
        description: "Macarrão com couve-flor, brócolis e ervas finas.",
        available: true
      },
      {
        id: 3,
        image: "https://m.bonde.com.br/img/bondenews/2019/05/img_162.jpg",
        name: "Macarrão com camarão",
        price: "30,00",
        description: "Macarrão com camarão, molho branco e ervas finas.",
        available: true
      }
    ]);

    const { getByText, getByTestId } = render(<Dashboard />);

    await wait(() => expect(getByText('Macarrão ao molho pesto')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Macarrão ao molho pesto')).toBeTruthy();
    expect(getByText('Macarrão ao molho pesto, cheiro verde e queijo.')).toBeTruthy();

    expect(getByTestId('remove-food-1')).toBeTruthy();
    expect(getByTestId('edit-food-1')).toBeTruthy();

    expect(getByText('Macarrão vegano')).toBeTruthy();
    expect(getByText('Macarrão com couve-flor, brócolis e ervas finas.')).toBeTruthy();

    expect(getByTestId('remove-food-2')).toBeTruthy();
    expect(getByTestId('edit-food-2')).toBeTruthy();

    expect(getByText('Macarrão com camarão')).toBeTruthy();
    expect(getByText('Macarrão com camarão, molho branco e ervas finas.')).toBeTruthy();

    expect(getByTestId('remove-food-3')).toBeTruthy();
    expect(getByTestId('edit-food-3')).toBeTruthy();
  });

  it('adicionar prato', async () => {
    apiMock.onGet('foods').reply(200, []);

    const { getByText, getByTestId, getByPlaceholderText } = render(
      <Dashboard />,
    );

    act(() => {
      fireEvent.click(getByText('Novo Prato'));
    });

    const inputImage = getByPlaceholderText('Cole o link aqui');
    const inputName = getByPlaceholderText('Ex: Moda Italiana');
    const inputValue = getByPlaceholderText('Ex: 19.90');
    const inputDescription = getByPlaceholderText('Descrição');

    await act(async () => {
      fireEvent.change(inputImage, {
        target: { value: 'imagem 1' },
      });
      fireEvent.change(inputName, { target: { value: 'Macarrão bolonhesa' } });
      fireEvent.change(inputValue, { target: { value: '35.90' } });
      fireEvent.change(inputDescription, {
        target: {
          value: 'Macarrão bolonhesa com queijo'
        }
      });
    });

    expect(inputImage.value).toBe('imagem 1');
    expect(inputName.value).toBe('Macarrão bolonhesa');
    expect(inputValue.value).toBe('35.90');
    expect(inputDescription.value).toBe('Macarrão bolonhesa com queijo');

    apiMock.onPost('foods').reply(200, {
      id: 1,
      image: 'imagem 1',
      name: 'Macarrão bolonhesa',
      description: '35.90',
      price: 'Macarrão bolonhesa com queijo',
      available: true
    });

    await act(async () => {
      fireEvent.click(getByTestId('add-food-button'));
    });

    await wait(() => expect(getByText('Macarrão bolonhesa')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Macarrão bolonhesa')).toBeTruthy();
    expect(getByText('Macarrão bolonhesa com queijo')).toBeTruthy();

    expect(getByTestId('remove-food-1')).toBeTruthy();
    expect(getByTestId('edit-food-1')).toBeTruthy();
  });

  it('editar prato', async () => {
    apiMock.onGet('foods').reply(200, [
      {
        id: 1,
        image: 'imagem 1',
        name: 'Macarrão bolonhesa',
        description: '35.90',
        price: 'Macarrão bolonhesa com queijo',
        available: true
      },
    ]);

    const { getByText, getByTestId, getByPlaceholderText } = render(
      <Dashboard />,
    );

    await wait(() => expect(getByText('Macarrão bolonhesa')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Macarrão bolonhesa')).toBeTruthy();
    expect(getByText('Macarrão bolonhesa com queijo')).toBeTruthy();

    expect(getByTestId('remove-food-1')).toBeTruthy();
    expect(getByTestId('edit-food-1')).toBeTruthy();

    act(() => {
      fireEvent.click(getByTestId('edit-food-1'));
    });

    const inputImage = getByPlaceholderText('Cole o link aqui');
    const inputName = getByPlaceholderText('Ex: Moda Italiana');
    const inputValue = getByPlaceholderText('Ex: 19.90');
    const inputDescription = getByPlaceholderText('Descrição');

    await act(async () => {
      fireEvent.change(inputImage, {
        target: { value: 'imagem 2' },
      });
      fireEvent.change(inputName, { target: { value: 'Macarrão sem bolonhesa' } });
      fireEvent.change(inputValue, { target: { value: '25.90' } });
      fireEvent.change(inputDescription, {
        target: {
          value:
            'Macarrão sem bolonhesa mas ainda com queijo'
        },
      });
    });

    expect(inputImage.value).toBe('imagem 2');
    expect(inputName.value).toBe('Macarrão sem bolonhesa');
    expect(inputValue.value).toBe('25.90');
    expect(inputDescription.value).toBe(
      'Macarrão sem bolonhesa mas ainda com queijo',
    );

    apiMock.onPut('foods/1').reply(200, {
      id: 1,
      image: 'imagem 2' ,
      name: 'Macarrão sem bolonhesa',
      description:
        'Macarrão sem bolonhesa mas ainda com queijo',
      price: '25.90',
      available: true
    });

    await act(async () => {
      fireEvent.click(getByTestId('edit-food-button'));
    });

    await wait(() => expect(getByText('Macarrão sem bolonhesa')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Macarrão sem bolonhesa')).toBeTruthy();
    expect(getByText('Macarrão sem bolonhesa mas ainda com queijo')).toBeTruthy();

    expect(getByTestId('remove-food-1')).toBeTruthy();
    expect(getByTestId('edit-food-1')).toBeTruthy();
  });

  it('remover prato', async () => {
    apiMock.onGet('foods').reply(200, [
      {
        id: 1,
        image: 'imagem 1',
        name: 'Macarrão bolonhesa',
        description: '35.90',
        price: 'Macarrão bolonhesa com queijo',
        available: true
      },
    ]);

    apiMock.onDelete('foods/1').reply(204);

    const { getByText, getByTestId } = render(<Dashboard />);

    await wait(() => expect(getByText('Macarrão bolonhesa')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Macarrão bolonhesa')).toBeTruthy();
    expect(getByText('Macarrão bolonhesa com queijo')).toBeTruthy();

    expect(getByTestId('remove-food-1')).toBeTruthy();
    expect(getByTestId('edit-food-1')).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByTestId('remove-food-1'));
    });

    expect(getByTestId('foods-list')).toBeEmpty();
  });

  it('atualizar disponibilidade do prato', async () => {
    apiMock.onGet('foods').reply(200, [
      {
        id: 1,
        image: 'imagem 1',
        name: 'Macarrão bolonhesa',
        description: '35.90',
        price: 'Macarrão bolonhesa com queijo',
        available: true
      },
    ]);

    const { getByText, getByTestId } = render(<Dashboard />);

    await wait(() => expect(getByText('Macarrão bolonhesa')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Macarrão bolonhesa')).toBeTruthy();
    expect(getByText('Macarrão bolonhesa com queijo')).toBeTruthy();
    expect(getByText('Disponível')).toBeTruthy();

    expect(getByTestId('remove-food-1')).toBeTruthy();
    expect(getByTestId('edit-food-1')).toBeTruthy();

    apiMock.onPut('foods/1').reply(200, {
      id: 1,
      name: 'Macarrão bolonhesa',
      description:'Macarrão bolonhesa com queijo',
      price: '35.90',
      available: false,
      image: 'imagem 1',
    });

    await act(async () => {
      fireEvent.click(getByTestId('change-status-food-1'));
    });

    await wait(() => expect(getByText('Macarrão bolonhesa')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Macarrão bolonhesa')).toBeTruthy();
    expect(getByText('Macarrão bolonhesa com queijo')).toBeTruthy();
    expect(getByText('Indisponível')).toBeTruthy();

    expect(getByTestId('remove-food-1')).toBeTruthy();
    expect(getByTestId('edit-food-1')).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByTestId('change-status-food-1'));
    });

    await wait(() => expect(getByText('Macarrão bolonhesa')).toBeTruthy(), {
      timeout: 200,
    });

    expect(getByText('Macarrão bolonhesa')).toBeTruthy();
    expect(getByText('Macarrão bolonhesa com queijo')).toBeTruthy();
    expect(getByText('Disponível')).toBeTruthy();
    expect(getByTestId('remove-food-1')).toBeTruthy();
    expect(getByTestId('edit-food-1')).toBeTruthy();
  });
});
