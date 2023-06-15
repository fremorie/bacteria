export const parameters = {
  Y_em: 0.7496017217636108,
  Y_xsof: 0.10028867423534393,
  Y_xa: 0.10036058723926544,
  Y_os: 0.500209391117096,
  Y_oa: 0.644625186920166,
  Y_as: 0.9869288802146912,
  K_ia: 2.8580613136291504,
  K_s: 0.04977104067802429,
  K_0: 0.058174245059490204,
  K_ap: 0.6365419030189514,
  K_is: 4.510515213012695,
  K_sa: 0.019065730273723602,
  K_La: 46.5931282043457,
  K_p: 350.4696960449219,
  p_Amax: 0.35682427883148193,
  q_Smax: 0.4063510298728943,
  q_Amax: 0.16196322441101074,
  q_m: 0.03609205782413483,
  DOT_star: 0.9903120398521423,
  H: 139.87298583984375,
};

export const initial_state = {
  // bacteria count (relative, grams)
  X: 5,
  // glucose count (grams)
  S: 0.25,
  // acetate
  A: 0,
  // dissolved oxygen tension
  DOTa: 1,
};

export const MAX_STATE = {
  X: 20,
  S: 20,
  A: 0.2,
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

export const COLORS = {
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
  const feedInc = 0.25;

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
  X: [0.00625, 0.0125, 0.025, 0.05, 0.1, 0.2, 0.4, 0.8, 1.6, 3.2, 6.4],
  A: [0.00625, 0.0125, 0.025, 0.05, 0.1, 0.2, 0.4, 0.8, 1.6, 3.2, 6.4],
  S: [0.00625, 0.0125, 0.025, 0.05, 0.1, 0.2, 0.4, 0.8, 1.6, 3.2, 6.4],
  DOTa: [0.00625, 0.0125, 0.025, 0.05, 0.1, 0.2, 0.4, 0.8, 1.6, 3.2, 6.4],
};

export function derivatives(state, parameters) {
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

  let DOTadt =
    parameters.K_La * (parameters.DOT_star - state.DOTa) -
    q_o * state.X * parameters.H;

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
