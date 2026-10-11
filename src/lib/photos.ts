// Faceless food and kitchen photography (Pexels License), the same set the
// app uses in lib/core/constants/food_photos.dart. No stock people: the only
// faces in Kusin are a household's own photos.

export function pexels(id: number, width = 1200) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

export const PHOTO = {
  pepperSoup: 37648018,
  jollof: 17952748,
  pierogi: 29545365,
  zurek: 8878618,
  pomidorowa: 13790510,
  egusi: 35490114,
  friedRice: 13915043,
  suya: 28160385,
  plantain: 27556971,
  yam: 36756598,
  beefStew: 37081059,
  ogi: 37624176,
  tableSpread: 37100094,
  handsChopping: 6294405,
  greens: 38571502,
} as const;

export type PhotoKey = keyof typeof PHOTO;

export function photo(key: PhotoKey, width = 1200) {
  return pexels(PHOTO[key], width);
}
