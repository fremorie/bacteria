import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:first-of-type {
    margin-right: 8px;
  }
`;

export const ColorSample = styled.div<{ $from: string; $to: string }>`
  height: 20px;
  width: 150px;
  background: ${(props) =>
    `linear-gradient(90deg, ${props.$from} 0%, ${props.$to} 100%)`};
  border-radius: 4px;
`;

export const Label = styled.p`
  margin: 0;
  font-size: 12px;
`;

export const Labels = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
