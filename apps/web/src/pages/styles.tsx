import { Paper } from '@mantine/core';
import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 98vw;
  height: 95vh;
  position: relative;
`;

export const LogoContainer = styled.div`
  position: absolute;
  z-index: -1;
  top: 10%;
  left: 10%;
  opacity: 0.3;

  img {
    height: 80vh;
  }
`;

export const Column = styled.div`
  margin-top: 5px;
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

export const TaskColumn = styled.div`
  margin-top: 5px;
  width: 70vw;
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

export const TaskButtonTextWrapper = styled.div`
  display: flex;
  width: 100vw;
  justify-content: space-between;
`;

export const AssignedContainer = styled(Paper)`
  background-color: #D9D9D9;
  padding: 0px 25px;
`;
