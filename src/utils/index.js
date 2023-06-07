export const parameters = {
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

export const initial_state = {
  // bacteria count (relative, grams)
  X: 0.1,
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
  A: 10,
  DOTa: 1,
};

export const MAX_DOTS = {
  X: 1000,
  S: 100,
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
    (rgb, index) => rgb * alpha + (1 - alpha) * COLORS.A[1][index]
  );

  return color;
};

const formatOxygenColor = (DOTa) => {
  const alpha = DOTa / MAX_STATE.DOTa;
  //const color = alpha * COLORS.DOTa[0] + (1 - alpha) * COLORS.DOTa[1]
  const color = COLORS.DOTa[0].map(
    (rgb, index) => rgb * alpha + (1 - alpha) * COLORS.DOTa[1][index]
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

function f(state, parameters) {
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
  let q_o = (q_sox - parameters.q_m) * parameters.Y_os + q_sA * parameters.Y_oa;
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

export function solve(n, dt, initial_state, parameters) {
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
