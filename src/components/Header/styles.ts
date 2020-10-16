import styled from 'styled-components';

export const Container = styled.div`
  background: #c72828;
  padding: 30px 0;

  > div {
    width: 100%;
    margin: 0 auto;
    height: 160px;
    padding: 10px 20px;

    .header-item {
      @media (max-width: 599px) {
        justify-content: center;
        padding-bottom: 40px;
      }

      button {
        font-weight: 600;
        border-radius: 8px;
        border: 0;
        background: #39b100;
        color: #fff;

        display: flex;
        flex-direction: row;
        align-items: center;

        .text {
          padding: 16px 24px;
        }

        .icon {
          display: flex;
          padding: 16px 16px;
          background: #41c900;
          border-radius: 0 8px 8px 0;
          margin: 0 auto;
        }
      }
    }

  }
`;
