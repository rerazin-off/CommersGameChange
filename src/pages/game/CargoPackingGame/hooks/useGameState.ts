import { useMemo, useState } from "react";
import { GameState, Option } from "../types/game";

import { cargos } from "../data/cargos";
import { cargoTypeOptions, packageOptions, fillerOptions } from "../data/options";

type WrongMap = {
  type: boolean;
  package: boolean;
  filler: boolean;
};

type ExtendedGameState = GameState & {
  hadMistake: boolean;
  wrong: WrongMap;
};

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

function findOptionById(id: string): Option | null {
  return (
    cargoTypeOptions.find((o) => o.id === id) ||
    packageOptions.find((o) => o.id === id) ||
    fillerOptions.find((o) => o.id === id) ||
    null
  );
}

const emptyWrong: WrongMap = { type: false, package: false, filler: false };

export const useGameState = () => {
  const [state, setState] = useState<ExtendedGameState>(() => ({
    cargos: shuffle(cargos),
    currentCargoIndex: 0,
    successCount: 0,
    isFinished: false,
    selection: {
      type: null,
      package: null,
      filler: null,
    },
    hadMistake: false,
    wrong: emptyWrong,
  }));

  const currentCargo = useMemo(() => {
    return state.cargos[state.currentCargoIndex] ?? null;
  }, [state.cargos, state.currentCargoIndex]);

  const setType = (optionId: string) => {
    const option = findOptionById(optionId);
    if (!option || option.category !== "cargoType") return;

    setState((prev) => ({
      ...prev,
      selection: { ...prev.selection, type: option },
      wrong: emptyWrong,
    }));
  };

  const setPackage = (optionId: string) => {
    const option = findOptionById(optionId);
    if (!option || option.category !== "package") return;

    setState((prev) => ({
      ...prev,
      selection: { ...prev.selection, package: option },
      wrong: emptyWrong,
    }));
  };

  const setFiller = (optionId: string) => {
    const option = findOptionById(optionId);
    if (!option || option.category !== "filler") return;

    setState((prev) => ({
      ...prev,
      selection: { ...prev.selection, filler: option },
      wrong: emptyWrong,
    }));
  };

  const submitCargo = (): {
    success: boolean;
    awardedPoint: boolean;
    incomplete: boolean;
    wrong: WrongMap;
  } => {
    if (!currentCargo) {
      return {
        success: false,
        awardedPoint: false,
        incomplete: true,
        wrong: emptyWrong,
      };
    }

    const { type, package: pkg, filler } = state.selection;

    if (!type || !pkg || !filler) {
      return {
        success: false,
        awardedPoint: false,
        incomplete: true,
        wrong: emptyWrong,
      };
    }

    const wrong: WrongMap = {
      type: type.id !== currentCargo.correct.type,
      package: pkg.id !== currentCargo.correct.package,
      filler: filler.id !== currentCargo.correct.filler,
    };

    const isCorrect = !wrong.type && !wrong.package && !wrong.filler;

    if (!isCorrect) {
      setState((prev) => ({
        ...prev,
        hadMistake: true,
        wrong,
      }));

      return { success: false, awardedPoint: false, incomplete: false, wrong };
    }

    const awardedPoint = !state.hadMistake;

    setState((prev) => {
      const nextIndex = prev.currentCargoIndex + 1;
      const isFinished = nextIndex >= prev.cargos.length;

      return {
        ...prev,
        currentCargoIndex: nextIndex,
        successCount: awardedPoint ? prev.successCount + 1 : prev.successCount,
        isFinished,
        selection: { type: null, package: null, filler: null },
        hadMistake: false,
        wrong: emptyWrong,
      };
    });

    return { success: true, awardedPoint, incomplete: false, wrong: emptyWrong };
  };

  const resetGame = () => {
    setState({
      cargos: shuffle(cargos),
      currentCargoIndex: 0,
      successCount: 0,
      isFinished: false,
      selection: { type: null, package: null, filler: null },
      hadMistake: false,
      wrong: emptyWrong,
    });
  };

  return {
    state,
    currentCargo,
    setType,
    setPackage,
    setFiller,
    submitCargo,
    resetGame,
  };
};
