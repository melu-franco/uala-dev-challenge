// Import SVG files as strings
import analyze from '../../assets/icons/analyze.svg?raw';
import calendar from '../../assets/icons/calendar.svg?raw';
import cardAlt from '../../assets/icons/card-alt.svg?raw';
import categories from '../../assets/icons/categories.svg?raw';
import categoryStores from '../../assets/icons/category-stores.svg?raw';
import chevron from '../../assets/icons/chevron.svg?raw';
import close from '../../assets/icons/close.svg?raw';
import commission from '../../assets/icons/commission.svg?raw';
import download from '../../assets/icons/download.svg?raw';
import filter from '../../assets/icons/filter.svg?raw';
import menu from '../../assets/icons/menu.svg?raw';
import searchEmpty from '../../assets/icons/search-empty.svg?raw';

export const icons = {
  analyze,
  calendar,
  'card-alt': cardAlt,
  categories,
  'category-stores': categoryStores,
  chevron,
  close,
  commission,
  download,
  filter,
  menu,
  'search-empty': searchEmpty,
} as const;

export type IconName = keyof typeof icons;
