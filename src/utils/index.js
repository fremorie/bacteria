export const parameters = {
  Y_em: 0.55,
  Y_xsof: 0.2,
  Y_xa: 0.55,
  Y_os: 0.35, // 1.5,
  Y_oa: 0.125, // 0.5,
  Y_as: 0.9,
  K_ia: 0.1, //1.25,
  K_s: 0.0305,
  K_0: 0.1,
  K_ap: 0.5,
  K_is: 1.5,
  K_sa: 0.0125,
  K_La: 100,
  K_p: 350,
  p_Amax: 0.225,
  q_Smax: 0.632,
  q_Amax: 0.11,
  q_m: 0.0111,
  DOT_star: 1,
  H: 140,
};

export const initial_state = {
  // bacteria count (relative, grams)
  X: 1,
  // glucose count (grams)
  S: 5,
  // acetate
  A: 0,
  // dissolved oxygen tension
  DOTa: 1,
};

export const MAX_STATE = {
  X: 20,
  S: 20,
  A: 0.4,
  DOTa: 1,
};

export const MAX_DOTS = {
  X: 100,
  S: 1000,
};

export const formatBacteria = (X) => {
  if (X < 0.1) {
    return 0;
  }
  return Math.ceil((X / MAX_STATE.X) * MAX_DOTS.X);
};

export const formatGlucose = (S) => {
  return Math.round((S / MAX_STATE.S) * MAX_DOTS.S);
};

const COLORS = {
  A: [
    [0, 0, 0],
    [0, 255, 0],
  ],
  DOTa: [
    [0, 0, 0],
    [0, 0, 255],
  ],
};

const formatAcetateColor = (A) => {
  const alpha = Math.min(A / MAX_STATE.A, 1);
  const color = COLORS.A[0].map(
    (rgb, index) => rgb * (1 - alpha) + alpha * COLORS.A[1][index]
  );

  return color;
};

const formatOxygenColor = (DOTa) => {
  const alpha = DOTa / MAX_STATE.DOTa;
  //const color = alpha * COLORS.DOTa[0] + (1 - alpha) * COLORS.DOTa[1]
  const color = COLORS.DOTa[0].map(
    (rgb, index) => rgb * (1 - alpha) + alpha * COLORS.DOTa[1][index]
  );

  return color;
};

const sumColors = (colorA, colorB) => {
  return colorA.map((a, index) => Math.floor(a + colorB[index]));
};

export const feed = (state) => {
  const feedInc = 1;

  return {
    ...state,
    S: state.S + feedInc,
  };
};

export const prepareCanvasData = (state) => {
  return {
    bacteriaCount: formatBacteria(state.X),
    glucoseCount: formatGlucose(state.S),
    color: sumColors(
      formatOxygenColor(state.DOTa),
      formatAcetateColor(state.A)
    ),
  };
};

export const MAX_SPEED = {
  X: [0.1, 0.2, 0.4, 0.8, 1.6],
  A: [0.025, 0.5, 0.1, 0.2, 0.4],
  S: [0.1, 0.2, 0.4, 0.8, 1.6],
  DOTa: [0.01, 0.02, 0.04, 0.08, 0.16],
};

export function derivatives(state, parameters) {
  let q_s =
    ((parameters.q_Smax * parameters.K_ia) / (parameters.K_ia + state.A)) *
      state.S / (state.S + parameters.K_s);
  let q_sof = parameters.p_Amax * q_s / (q_s + parameters.K_ap);
  let q_sox = (q_s - q_sof) * state.DOTa / (state.DOTa + parameters.K_0);
  let q_sA =
    parameters.q_Amax *
    parameters.K_is / (parameters.K_is + q_s) *
    state.A / (state.A + parameters.K_sa);

  let mu =
    (q_sox - parameters.q_m) * parameters.Y_em +
    q_sof * parameters.Y_xsof +
    q_sA * parameters.Y_xa;
  let q_o = (q_sox - parameters.q_m) * parameters.Y_os + q_sA * parameters.Y_oa;
  let p_A = q_sof * parameters.Y_as;
  let q_A = p_A - q_sA;

  let DOTadt = parameters.K_La * (parameters.DOT_star - state.DOTa) -
      q_o * state.X * parameters.H

  if (state.DOTa > 0.99 && DOTadt > 0) {
    DOTadt = 0;
  }

  return {
    X: mu * state.X,
    S: -q_s * state.X,
    A: +q_A * state.X,
    DOTa: DOTadt,
  };
}

function clip(state) {
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

export function solve(n, dt, state, parameters) {
  let s = { ...state };
  for (let i = 0; i < n; ++i) {
    let ds = derivatives(s, parameters);

    s.X += dt * ds.X;
    s.S += dt * ds.S;
    s.A += dt * ds.A;
    s.DOTa += dt * ds.DOTa;

    s = clip(s);
  }

  return [s, derivatives(s, parameters)];
}
