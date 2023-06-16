import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 20px;
  align-items: center;
`;

export const CentralContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const MainRow = styled(Row)`
  @media (max-width: 768px) {
    flex-direction: column;

    /* stats */
    & > :nth-child(1) {
      order: 2;
    }

    /* reactor */
    & > :nth-child(2) {
      order: 1;
    }

    /* legend */
    & > :nth-child(3) {
      order: 3;
    }
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
