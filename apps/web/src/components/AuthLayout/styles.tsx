import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
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
