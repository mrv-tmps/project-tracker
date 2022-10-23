import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(180deg, rgba(203, 231, 255, 0.59375) 25.52%, #FFFFFF 100%);
`;

export const Column = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-self: center;
  gap: 10px;
  transition: all 0.5s ease-in-out;

  @media only screen and (max-width: 500px) {
    width: 300px;
  }
  @media only screen and (max-width: 300px) {
    width: 200px;
  }
`;
