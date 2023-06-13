import React from "react";

// @ts-ignore
import arrow from "../../static/arrow.svg";
import * as S from "./styles";

type Props = {
  // -5 to 5
  speed: number;
};

const ArrowIcon = ({ speed }: { speed: number }) => (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill={speed > 0 ? "green" : "red"}
  >
    <path d="M170,94v77.84a5,5,0,0,0,1.47,3.54L252.08,256l-80.61,80.61a5,5,0,0,0-1.46,3.54V418a5,5,0,0,0,8.54,3.53l162-162a5,5,0,0,0,0-7.08l-162-162A5,5,0,0,0,170,94Z" />
  </svg>
);

const Arrow = ({ speed }: Props) => {
  return (
    <S.Container>
      <S.DecreasingSpeed>
        {speed < 0 && (
          <S.ArrowsContainer $speed={speed}>
            {[...Array(Math.abs(speed)).keys()].map((tick) => (
              <S.SvgContainer $speed={speed} key={`decrease-${tick}`}>
                <ArrowIcon speed={speed} />
              </S.SvgContainer>
            ))}
          </S.ArrowsContainer>
        )}
      </S.DecreasingSpeed>
      <S.Separator />
      <S.IncreasingSpeed>
        {speed > 0 && (
          <S.ArrowsContainer $speed={speed}>
            {[...Array(Math.abs(speed)).keys()].map((tick) => (
              <S.SvgContainer $speed={speed} key={`increase-${tick}`}>
                <ArrowIcon speed={speed} />
              </S.SvgContainer>
            ))}
          </S.ArrowsContainer>
        )}
      </S.IncreasingSpeed>
    </S.Container>
  );
};

export default Arrow;
