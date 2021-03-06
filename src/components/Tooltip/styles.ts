import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 100px;
    background: #ff9000;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;
    position: absolute;
    bottom: calc(100% + 8px);
    left: 0;
    transform: translateY(0%) translateX(-47%);
    color: #312e38;

    &::before {
      position: absolute;
      content: '';
      border-style: solid;
      border-color: #ff9000 transparent;
      border-width: 6px 6px 0 6px;
      bottom: 20px;
      top: 100%;
      left: 50%;
      transform: translateY(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
