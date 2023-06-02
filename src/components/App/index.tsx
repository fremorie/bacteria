import React from "react";
import axios from "axios";

import Reactor from "#components/Reactor";
import Stats from "#components/Stats";
import FeedButton from "#components/FeedButton";
import * as S from "./styles";

const App = () => {
  React.useEffect(() => {
    const parameters = {
      Y_em: 0.55,
      Y_xsof: 0.173,
      Y_xa: 0.4604,
      Y_os: 1.4,
      Y_oa: 0.4425,
      Y_as: 0.8283,
      K_ia: 1.0062,
      K_s: 0.0305,
      K_0: 0.0001,
      K_ap: 0.4,
      K_is: 1.5,
      K_sa: 0.0076,
      K_La: 600,
      K_p: 350,
      p_Amax: 0.1977,
      q_Smax: 0.632,
      q_Amax: 10.1,
      q_m: 0.0111,
      DOT_star: 1,
      H: 140,
    };

    const initial_state = {
      X: 1,
      S: 5,
      A: 0,
      DOTa: 1,
    };

    function f(state: any, parameters: any) {
      let q_s =
        (((parameters.q_Smax * parameters.K_ia) / (parameters.K_ia + state.A)) *
          state.S) /
        (state.S + parameters.K_s);
      let q_sof = (parameters.p_Amax * q_s) / (q_s + parameters.K_ap);
      let q_sox = ((q_s - q_sof) * state.DOTa) / (state.DOTa + parameters.K_0);
      let q_sA =
        (((parameters.q_Amax * parameters.K_is) / (parameters.K_is + q_s)) *
          state.A) /
        (state.A + parameters.K_sa);

      let mu =
        (q_sox - parameters.q_m) * parameters.Y_em +
        q_sof * parameters.Y_xsof +
        q_sA * parameters.Y_xa;
      let q_o =
        (q_sox - parameters.q_m) * parameters.Y_os + q_sA * parameters.Y_oa;
      let p_A = q_sof * parameters.Y_as;
      let q_A = p_A - q_sA;

      return {
        X: mu * state.X,
        S: -q_s * state.X,
        A: +q_A * state.X,
        DOTa:
          parameters.K_La * (parameters.DOT_star - state.DOTa) -
          q_o * state.X * parameters.H,
      };
    }

    function clip(state: any) {
      state.X = state.X < 0 ? 0 : state.X;
      state.S = state.S < 0 ? 0 : state.S;
      state.A = state.A < 0 ? 0 : state.A;

      if (state.DOTa > 1) {
        state.DOTa = 1;
      }
      if (state.DOTa < 0) {
        state.DOTa = 0;
      }

      return state;
    }

    function solve(n: any, dt: any, initial_state: any, parameters: any) {
      let state = { ...initial_state };
      for (let i = 0; i < n; ++i) {
        let ds = f(state, parameters);

        state.X += dt * ds.X;
        state.S += dt * ds.S;
        state.A += dt * ds.A;
        state.DOTa += dt * ds.DOTa;

        state = clip(state);
      }

      return state;
    }

    console.log("start");
    solve(1000000, 1.0e-6, initial_state, parameters);
    console.log("end");
  });

  return (
    <S.Page>
      <S.Container>
        <Stats bacteriaSpeed={100} acetateSpeed={80} glucoseSpeed={-50} />
        <Reactor />
        <S.GlobalStyle />
      </S.Container>
      <S.ButtonContainer>
        <FeedButton onClick={() => console.log("FEED!")} />
      </S.ButtonContainer>
    </S.Page>
  );
};

export default App;
