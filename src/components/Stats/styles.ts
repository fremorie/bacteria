import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  border-radius: 25px;
  border: 2px solid black;
  padding: 16px;
  background-color: #a28cbc;
  transform: translateY(-50px);
`;

export const Speedometer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  border: 2px solid black;

  &:last-of-type {
    margin-bottom: 0;
  }

  &:first-of-type {
    margin-top: 0;
  }
`;

export const Label = styled.div`
  margin-top: 8px;
  font-weight: 400;
`;
