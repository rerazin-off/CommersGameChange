import type { MatchedItem, Product } from '../interfaces/interfaces';
import { categoriesAll } from '../data/products';

export const checkBakaleyaNeighborhood = (targetRefrigeratorIndex: number, productIndex: number,products: Product[], matchedItems: MatchedItem[]) : Boolean => {
    if (targetRefrigeratorIndex !== 3) return true;

    const product = products[productIndex];
    if (!product.bakaleyaGroup) return true;

    const itemsInRefrigerator = matchedItems.filter(
      item => item.refrigeratorIndex === targetRefrigeratorIndex
    );

    const bakaleyaItems = itemsInRefrigerator.filter(item =>
      products[item.productIndex].bakaleyaGroup
    );

    if (bakaleyaItems.length === 0) return true;

    const firstBakaleyaGroup = products[bakaleyaItems[0].productIndex].bakaleyaGroup;
    return firstBakaleyaGroup === product.bakaleyaGroup;
};

export const checkCanBePlaced=(refrigeratorIndex: number, product: Product, refrigeratorCategories: string[]):boolean => {
    if (refrigeratorIndex === 3) {
        return categoriesAll.includes(product.category);
    }
    return refrigeratorCategories.includes(product.category);
};
export const getItemRefrigerator = (refrigeratorIndex: number,matchedItems: MatchedItem[] ) => {
    return matchedItems.filter(item => item.refrigeratorIndex === refrigeratorIndex);
};
export const isRefrigeratorFilled = (
  matchedItems: MatchedItem[],
  refrigeratorIndex: number
): boolean => getItemRefrigerator(refrigeratorIndex,matchedItems).length >=4;



