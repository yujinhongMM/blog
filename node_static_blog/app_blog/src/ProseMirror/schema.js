/**
 * schema 骨架/文档约束
 * Prosemirror 需要你手动指定一个 document 需要遵守的 Schema (来规定哪些元素能包含哪些不能包含以及元素之间的关系)
 */
const model = require('prosemirror-model');
const { isWhiteColor, isTransparentColor } = require('./tool');
const { Schema } = model;
const isEmptyCharset = char => /^\s*$/g.test(char);

// 需要判空处理
const emptyHandle = dom => {
    const contentEmpty = isEmptyCharset(dom.textContent);
    if (contentEmpty) { return true; }
  
    // 对样式进行判空处理
    if (dom.style) {
      let marginTop = dom.style['margin-top'] || '';
      marginTop = /([-|+|\d|\\.]*)/g.exec(marginTop || '')[0] || 0;
      let marginBottom = dom.style['margin-bottom'] || '';
      marginBottom = /([-|+|\d|\\.]*)/g.exec(marginBottom || '')[0] || 0;
      const defaultMarginMinNum = -100;
      const isMarginNotAllow = Number(marginTop) < defaultMarginMinNum ||
      Number(marginBottom) < defaultMarginMinNum;
  
      const display = dom.style.display || '';
      const visibility = dom.style.visibility || '';
      const color = dom.style.color || '';
      const backgroundColor = dom.style.background || dom.style['background-color'] || '';
      if (isMarginNotAllow ||
         display === 'none' ||
         visibility === 'hidden' ||
         isTransparentColor(color) ||
         (isWhiteColor(backgroundColor) && isWhiteColor(color))
      ) {
        dom.innerHTML = '';
        return true;
      }
    }
};
  

/**
 * @description 判断重复类文本分割线 默认处理字符文本，例如......或↓↓↓
 * @date 2021-12- 28
 * @param {*} dom
 * @param {number} [len=3] 重复字数长度
 * @return {boolean}
 */
 function isRepeatText(dom, len = 3) {
    // 判断重复类文本分割线 默认处理字符文本，例如......或↓↓↓
    try {
      const content = dom.textContent.replace(/(^\s*)|(\s$)/g, '');
      const arr = content.split('');
      let count = 0;
      const char = arr[0];
      arr.forEach(item => (item === char && count++));
      // 如果重复字数小于4个忽略
      if (arr.length >= len && arr.length === count) {
        dom.innerHTML = '';
        return true;
      }
    } catch (error) {
      // console.log(error);
      return false;
    }
  }

/**
 * 判断是否是无效的H标签
 * @param dom
 */
 const InvalidateHeading = dom => {
    // 1. 判断H标签中的最长文本为 40
    const maxTextContent = 40;
    if (dom.textContent.length > maxTextContent) {
      return true;
    }
  
    // 2. 判断H标签中不能包含非文本标签
    const nodeList = dom.childNodes;
    const invalidArr = [ 'P', 'SECTION', 'DIV', 'IMG' ];
    for (let i = 0; i < nodeList.length; i++) {
      if (invalidArr.indexOf(nodeList[i].nodeName) > -1) {
        return true;
      }
    }
  
    // 判断重复类文本分割线 默认处理字符文本，例如......或↓↓↓
    if (isRepeatText(dom)) {
      // dom.innerHTML = '';
      return true;
    }
    return false;
};


/**
 * 获取节点的text-align 属性
 * @param {*} node
 */
 const getNodeTextAlign = node => {
    if (node.style || node.align) {
      let textAlign = node.style['text-align'] || node.align;
  
      if (!textAlign && node.style && node.style.display === 'flex' && node.style['justify-content'] === 'center') {
        textAlign = 'center';
      }
  
      if (textAlign && [ 'center', 'right', 'left' ].indexOf(textAlign.trim()) > -1) {
        return { align: textAlign.trim() };
      }
    }
    return null;
  };
  

/**
 * 获取 text-align （center、right）如果当前没有 则获取父级乃至以上最多5层
 * @param {*} dom
 * @return
 */
 const getTextAlign = dom => {
    if (dom.textContent.length > 20) {
      return;
    }
  
    let align = null;
    let node = dom;
    let maxCount = 8;
    while (!align && node && maxCount > 0) {
      align = getNodeTextAlign(node);
      node = node.parentNode;
      maxCount--;
    }
    return align;
  };

const nodes = {
    doc: {
        content: 'block+',
    },
    heading: {
        attrs: { level: { default: 1 }, align: { default: null } },
        content: 'inline*',
        group: 'block',
        defining: true,
        marks: 'link', // h标签不允许内部有strong标签；
        parseDOM: [
            { tag: 'h1', getAttrs: dom => {
                if (emptyHandle(dom) || InvalidateHeading(dom)) { return false; }
        
                const alignObj = getTextAlign(dom) || {};
                console.log('%c [ alignObj ]-120', 'font-size:13px; background:pink; color:#bf2c9f;', alignObj)
                return { ...alignObj, level: 1 };
            } },
            { tag: 'h2', getAttrs: dom => {
                if (emptyHandle(dom) || InvalidateHeading(dom)) { return false; }
        
                const alignObj = getTextAlign(dom) || {};
                return { ...alignObj, level: 2 };
            } },
            { tag: 'h3', getAttrs: dom => {
                if (emptyHandle(dom) || InvalidateHeading(dom)) { return false; }
        
                const alignObj = getTextAlign(dom) || {};
                return { ...alignObj, level: 3 };
            } },
            { tag: 'h4', getAttrs: dom => {
                if (emptyHandle(dom) || InvalidateHeading(dom)) { return false; }
                const alignObj = getTextAlign(dom) || {};
                return { ...alignObj, level: 4 };
            } },
            { tag: 'h5', getAttrs: dom => {
                if (emptyHandle(dom) || InvalidateHeading(dom)) { return false; }
        
                const alignObj = getTextAlign(dom) || {};
                console.log('%c [ alignObj ]-144', 'font-size:13px; background:pink; color:#bf2c9f;', alignObj)
                return { ...alignObj, level: 5 };
            } },
            { tag: 'h6', getAttrs: dom => {
                if (emptyHandle(dom) || InvalidateHeading(dom)) { return false; }
                const alignObj = getTextAlign(dom) || {};
                return { ...alignObj, level: 6 };
            } },
        ],
        toDOM(node) {
            const { align, level } = node.attrs;
            // 统一输出h2标记
            const newLevel = level > 3 ? 4 : 2;
            return [ 'h' + newLevel, { align, level }, 0 ];
        }
    },
    text: {
        group: 'inline',
    },
}

const marks = {
    link: {
        attrs: {
            href: {},
            title: { default: null },
        },
        inclusive: false,
        parseDOM: [{
            tag: 'a[href]', getAttrs(dom) {
              return { href: dom.getAttribute('href'), title: dom.getAttribute('title') };
            },
        }],
        toDOM(node) { 
            const { title } = node.attrs; 
            return [ 'a', { 'data-link': true, title }, 0 ]; 
        },
    }
}

const schema = new Schema({ nodes, marks });
module.exports = {
  schema,
  model,
};