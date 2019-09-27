'use strict';


// 时间戳转换
// 参数1：date  [转换的日期]
// 参数2:  spare  [年月日数间隔符]
// 参数3：timeSpare [时分秒间隔符]
function filterTime(date, spare = '-') {
  // 补零
  function fix(i) {
    typeof i !== 'number' ? i = parseInt(i) : null;
    return i < 10 ? `0${i}` : i;
  }
  // 生成时间
  function time(t, spare = '-') {
    let [y, m, d] = [
      new Date(t).getFullYear(),
      new Date(t).getMonth() + 1,
      new Date(t).getDate(),
    ];
    return `${y}${spare}${fix(m)}${spare}${fix(d)}`;
  }
  // 获取长度
  let len = null;
  if (typeof date === 'number') {
    date = parseInt(date);
    len = date.toString().length;
  } else {
    len = date.length;
    len === 13 ? date = parseInt(date) : null;
  }
  if (len === 10) {
    return time(date * 1000, spare);
  } else if (len === 13) {
    return time(date, spare);
  } else {
    return time(date, spare);
  }
}


module.exports = filterTime;
