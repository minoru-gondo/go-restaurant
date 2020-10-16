import styled from 'styled-components';

export const FoodsContainer = styled.div`
    width: 100%;
    padding: 0 40px 40px;
    margin-top: -40px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(auto, 340px));
    gap: 32px;
    justify-content: center;

    @media (max-width: 599px) {
      margin-top: 40px;
    }
`;
