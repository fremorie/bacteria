import React from "react";

import * as S from "./styles";

const Footer = () => {
  return (
    <S.Footer>
      Based on the macrokinetic growth model from
      <em>
        Anane E, Neubauer P, Bournazou MN. Modelling overflow metabolism in
        Escherichia coli by acetate cycling. Biochemical engineering journal.
        2017 Sep 15;125:23-30.
      </em>
      with modified parameters. / Basierend auf dem makrokinetischen
      Wachstumsmodell von
      <em>
        Anane E, Neubauer P, Bournazou MN. Modelling overflow metabolism in
        Escherichia coli by acetate cycling. Biochemical engineering journal.
        2017 Sep 15;125:23-30.
      </em>
      mit geänderten Parametern. Simulation is significantly accelerated in time
      (10 seconds = 1 hour). / Die Simulation wird zeitlich deutlich
      beschleunigt (10 Sekunden = 1 Stunde).
      <br />
      Created by{" "}
      <a href="https://fremorie.github.io/" target="_blank">
        Daria Borisiak.
      </a>
    </S.Footer>
  );
};

export default Footer;
