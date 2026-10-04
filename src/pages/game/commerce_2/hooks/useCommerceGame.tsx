import { useState, useEffect } from 'react';
import type {
  DragSource,
  MatchedItem,
  Product,
  Refrigerator,
} from '../interfaces/interfaces';
import {
  checkCanBePlaced,
  checkBakaleyaNeighborhood,
  getItemRefrigerator,
  isRefrigeratorFilled as isFilled,
} from '../rules/rulesGame';

interface Params {
  productsAll: Product[];
  refrigeratorsAll: Refrigerator[];
}

export const useCommerceGame = ({ productsAll, refrigeratorsAll }: Params) => {
  const [openIsCard, setOpenIsCard] = useState(false);
  const [showIntroCard, setShowIntroCard] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVisibleButton, setIsVisibleButton] = useState(false);
  const [matchedItems, setMatchedItems] = useState<MatchedItem[]>([]);
  const [productsInPurpleZone, setProductsInPurpleZone] = useState<number[]>([]);

  useEffect(() => {
    const allFilled = refrigeratorsAll.every((_, index) =>
      isFilled(matchedItems, index)
    );
    setIsVisibleButton(allFilled);
  }, [matchedItems, refrigeratorsAll]);

  const showErrorMessage = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 3000);
  };

  const handleDropOnRefrigerator = (
    targetIndex: number,
    productIndex: number,
    source: DragSource,
    fromRefrigeratorIndex?: number
  ) => {
    const items = getItemRefrigerator(targetIndex,matchedItems);
    if (items.length >= 4) {
      showErrorMessage('Этот холодильник уже заполнен!');
      return;
    }

    const product = productsAll[productIndex];
    const refrigerator = refrigeratorsAll[targetIndex];

    if (!checkCanBePlaced(targetIndex, product, refrigerator.categories)) {
      showErrorMessage('Нарушен температурный режим!');
      return;
    }

    if (
      !checkBakaleyaNeighborhood(targetIndex, productIndex, productsAll, matchedItems)
    ) {
      showErrorMessage('Нарушено товарное соседство!');
      return;
    }

    const filtered = matchedItems.filter(
      (item) =>
        !(
          item.productIndex === productIndex &&
          source === 'refrigerator' &&
          item.refrigeratorIndex === fromRefrigeratorIndex
        )
    );

    setMatchedItems([
      ...filtered,
      { productIndex, refrigeratorIndex: targetIndex, isCorrect: true },
    ]);

    if (source === 'purple') {
      setProductsInPurpleZone((prev) => prev.filter((i) => i !== productIndex));
    }
  };

  const handleDropOnPurpleZone = (
    productIndex: number,
    source: DragSource,
    fromRefrigeratorIndex?: number
  ) => {
    if (source === 'refrigerator') {
      setMatchedItems((prev) =>
        prev.filter(
          (item) =>
            !(
              item.productIndex === productIndex &&
              item.refrigeratorIndex === fromRefrigeratorIndex
            )
        )
      );
    }

    setProductsInPurpleZone((prev) =>
      prev.includes(productIndex) ? prev : [...prev, productIndex]
    );
  };

  const isProductMatched = (productIndex: number) =>
    matchedItems.some((item) => item.productIndex === productIndex);

  const checkResults = () => {
    setAttempts((prev) => prev + 1);
    setOpenIsCard(true);
  };

  const handleCloseCard = () => setOpenIsCard(false);

  const resetGame = () => {
    setMatchedItems([]);
    setProductsInPurpleZone([]);
    setAttempts(0);
    setErrorMessage(null);
  };

  return {
    openIsCard,
    showIntroCard,
    setShowIntroCard,
    attempts,
    errorMessage,
    isVisibleButton,
    matchedItems,
    productsInPurpleZone,

    handleDropOnRefrigerator,
    handleDropOnPurpleZone,
    isProductMatched,
    getItemsInRefrigerator: (index: number) =>
      getItemRefrigerator(index,matchedItems),
    isRefrigeratorFilled: (index: number) => isFilled(matchedItems, index),
    checkResults,
    handleCloseCard,
    resetGame,
  };
};