import styled, { css } from 'styled-components';

interface IFoodPlateProps {
  available: boolean;
}

export const Container = styled.div<IFoodPlateProps>`
  border-radius: 8px;
  background: #f0f0f5;
  border-radius: 8px 8px 0px 0px;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .header {
    max-height: 190px;
    transition: 0.3s opacity;
    text-align: center;
    overflow: hidden;
    background: #fff;

    ${props =>
      !props.available &&
      css`
        opacity: 0.3;
      `};

    img {
      pointer-events: none;
      user-select: none;
      width: 100%;
      height: 190px;
      min-height: 190px;
      object-fit: cover;
      object-position: center;
    }
  }

  .body {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h2 {
      color: #3d3d4d;
    }

    > div {
      p {
        color: #3d3d4d;
        margin-top: 16px;
      }
      .price {
        font-style: normal;
        font-size: 24px;
        line-height: 34px;
        color: #39b100;

        b {
          font-weight: 600;
        }
      }
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-height: 80px;
    padding: 20px 30px;
    background: #e4e4eb;
    border-radius: 0px 0px 8px 8px;

    @media (max-width: 599px) {
      max-height: initial;
    }

    > div {
      @media (max-width: 599px) {
        justify-content: center;
        padding-bottom: 25px;
      }

      .icon-container {
        display: flex;

        button {
          background: #fff;
          padding: 10px;
          border-radius: 8px;
          display: flex;
          border: none;
          transition: 0.1s;

          svg {
            color: #3d3d4d;
          }

          & + button {
            margin-left: 6px;
          }
        }
      }

      .availability-container {
        display: flex;
        align-items: center;

        p {
          color: #3d3d4d;
          font-size: 14px;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 88px;
          height: 32px;
          margin-left: 12px;

          & input {
            opacity: 0;
            width: 0;
            height: 0;
          }

          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #c72828;
            -webkit-transition: 0.4s;
            transition: 0.4s;
            border-radius: 16px;

            &:before {
              position: absolute;
              content: '';
              height: 20px;
              width: 40px;
              left: 8px;
              bottom: 6px;
              background-color: white;
              -webkit-transition: 0.4s;
              transition: 0.4s;
              border-radius: 10px;
            }
          }

          input:checked + .slider {
            background-color: #39b100;
          }

          input:focus + .slider {
            box-shadow: 0 0 1px #2196f3;
          }

          input:checked + .slider:before {
            -webkit-transform: translateX(32px);
            -ms-transform: translateX(32px);
            transform: translateX(32px);
          }
        }
      }
    }
  }
`;
