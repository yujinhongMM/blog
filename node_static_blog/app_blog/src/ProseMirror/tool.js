function getStyle(getStyleArr, CSSStyleDeclaration) {
  return getStyleArr.reduce((res, key) => {
    const value = CSSStyleDeclaration[key];
    // if (key === 'text-align' && value === 'inherit') {value = null}
    value && (res += `${key}: ${value};`);
    return res;
  }, '');
}

/**
 * 设置节点style样式
 * @param node 节点
 * @param cssProperty 样式名
 * @param cssValue 样式值
 * @param rewrite 如果元素存在该样式，是否重写覆盖
 */
function setStyle(node, cssProperty, cssValue, rewrite = false) {
  if (!node.style[cssProperty] || node.style[cssProperty] === 'inherit' || rewrite) {
    node.style[cssProperty] = cssValue;
  }
}


function getRgbColor(color) {
  color = color.toLowerCase().replace(/\s/g, '');

  // HEX色值
  if (/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(color)) {
    if (color.length === 4) {
      color = color.split('').reduce((res, item) => {
        res += item == '#' ? item : item + item;
        return res;
      }, '');
    }
    // 处理六位的颜色值
    const rgb = [];
    for (let i = 1; i < 7; i += 2) {
      rgb.push(parseInt('0x' + color.slice(i, i + 2)));
    }
    color = `rgb(${rgb.join(',')})`;
  }

  return color;
}

// 判断接近黑色
function nearlyBlack(rgb) {
  rgb = getRgbColor(rgb);
  return !rgb.match(/\d+/g).splice(0, 3).some(val => val > 95);
}

function isWhiteColor(color, dom) {
  color = getRgbColor(color);

  if (/^rgba/.test(color)) {
    color = `rgb(${/\(([\d,.]*)\)/.exec(color)[1].split(',').slice(0, 3)
      .join(',')})`;
  }
  return [ 'rgb(255,255,255)', 'white' ].indexOf(color) !== -1;


}

function isTransparentColor(color) {
  color = color.toLowerCase().replace(/\s/g, '');
  if (/^rgba/.test(color)) {
    const alpha = Number(/\(([\d,.]*)\)/.exec(color)[1].split(',').pop());
    return alpha === 0;
  }
  return color === 'transparent';
}


module.exports = {
  getStyle,
  setStyle,
  isWhiteColor,
  getRgbColor,
  isTransparentColor,
  nearlyBlack,
};
