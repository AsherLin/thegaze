export default function (time) {
  const date = new Date(time * 1000);
  // 一般 timestamp 取得的是秒數，但要帶入的是毫秒，故乘 1000
  return date.toLocaleDateString();
}
