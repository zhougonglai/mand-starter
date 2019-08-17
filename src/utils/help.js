/**
 * UUID
 */
export const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

/**
 * 数字显示
 * @param {Number} n 数字
 * @param {Number} decimals 小数点后几位
 */
export const round = (n, decimals = 0) =>
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

/**
 * 数字序列数组
 * @param {*} n 开始数字
 * @param {*} length 需要的序列长度
 * @param {*} to 结束数字
 */
export const numList = (n = 0, length = 10, to) => {
  const list = Object.keys(Array.from({ length }));
  return list.slice(n, to ? to : list.length);
};
