/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-02
 ------------------------------------------------- */

/**
 * @see https://github.com/lint-staged/lint-staged
 * @type {import("lint-staged").Configuration}
 */
export default {
  '*.{js,mjs,cjs,ts,mts,cts}': ['eslint --fix'],
  '*.{md,json,yml,yaml}': ['prettier --write'],
};
