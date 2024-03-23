import EmojiList from '@/assets/json/emoji.json';


/**
 * 将文本中的URL或其他可识别的链接转换为可点击的超链接
 * @param {String} text 需要识别的文本
 * @returns {String} 带有超链接a标签的文本
 */
export function linkify(text) {
    if (text) {
        // 匹配URL的正则表达式
        var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%=~_|$?!:,.]*[A-Z0-9+&@#/%=~_|$])/gi;

        // 将匹配到的URL替换为带有链接的HTML
        var linkedText = text.replace(urlRegex, function (url) {
            return '<a href="' + url + '" class="v-url" target="_blank">' + url + '</a>';
        });

        return linkedText;
    } else {
        return text; // 如果 text 未定义，则返回原始值
    }
}


/**
 * 将文本中的有效表情转换成图片
 * @param {String} text 需要识别的文本
 * @returns {String} 带有表情的html文本
 */
export function emojiText(text) {
    if (text) {
        // 匹配 [表情] 格式的字符串
        const regex = /\[(.*?)\]/g;
        const replacedText = text.replace(regex, (match, p1) => {
            // 查找匹配的表情名称在 EmojiList 中的索引
            const emojiIndex = EmojiList.findIndex(emoji => emoji.name === `[${p1}]`);

            // 如果找到了对应的表情
            if (emojiIndex !== -1) {
                const { name, url } = EmojiList[emojiIndex];
                // 构建替换的 HTML
                return `<a class="emotion-items" title="${name}"><div class="img-emoji" style="background-image:url('${url}'); height:20px; width:20px;"></div></a>`;
            } else {
                // 如果未找到对应的表情，返回原始字符串
                return match;
            }
        });

        return replacedText;
    } else {
        return text;
    }
}


/**
 * 对文本进行关键词高亮
 * @param {String} keyword 要高亮的关键词
 * @param {String} inputString 要转换的文本
 */
export function highlightKeyword(keyword, inputString) {
    // 使用正则表达式创建一个匹配关键词的模式
    const regex = new RegExp(`(${keyword.split('').join('|')})`, 'gi');
    // 使用字符串替换函数进行替换，添加高亮标签
    return inputString.replace(regex, '<em class="suggest_high_light">$1</em>');
}


/**
 * 处理播放时长，将秒数转换为分钟和秒的格式
 * @param {Number} time 传入的总时长，以秒为单位
 * @returns {String} 处理后的时间字符串，格式为 'mm:ss'
 */
export function handleTime(time) {
    time = parseInt(time);
    time = Math.floor(time);
    let m = Math.floor(time / 60);
    let s = Math.floor(time % 60);
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    return m + ':' + s;
}


/**
 * 将格式化后的播放时长还原为秒数
 * @param {String} time 格式为 'mm:ss' 的时间字符串
 * @returns {Number} 总时长秒数
 */
export function returnSecond(time) {
    time = time.split(':');
    let m = parseInt(time[0]);
    let s = parseInt(time[1]);
    return m * 60 + s;
}


/**
 * 处理大于1万的数字
 * @param {Number} num 如：198765
 * @returns {String} 转换后：'19.9万'
 */
export function handleNum(num) {
    if (num > 10000) {
        num = (num / 10000).toFixed(1);
        return num + '万';
    } else {
        return num;
    }
}


/**
 * 处理日期，截取(年)月日或者24小时内或者60分钟内
 * @param {Number|String|Date} dateTime 传入的日期时间，可以是数字、字符串或日期对象
 * @returns {String} 处理后的日期字符串 2023-11-11 / 3-24 / 8小时前 / 30分钟前
 */
export function handleDate(dateTime) {
    const currentDate = new Date();
    const inputDate = new Date(dateTime);
    // 计算时间差（以毫秒为单位）
    const timeDifference = currentDate - inputDate;
    
    if (timeDifference < 60 * 60 * 1000) {
        const minutes = Math.floor(timeDifference / 1000 / 60);
        return `${minutes}分钟前`;
    } else if (timeDifference < 24 * 60 * 60 * 1000) {
        const hours = Math.floor(timeDifference / 1000 / 60 / 60);
        return `${hours}小时前`;
    } else {
        const currentYear = currentDate.getFullYear();
        const inputYear = inputDate.getFullYear();
        // 判断是否今年
        if (inputYear < currentYear) {
            const month = inputDate.getMonth() + 1; // 月份是从0开始的
            const day = inputDate.getDate();
            return `${inputYear}-${month}-${day}`;
        } else {
            const month = inputDate.getMonth() + 1; // 月份是从0开始的
            const day = inputDate.getDate();
            return `${month}-${day}`;
        }
    }
}

/**
 * 处理日期，格式化为 年月日时分/今天时分/昨天时分
 * @param {Number|String|Date} dateTime 传入的日期时间，可以是数字、字符串或日期对象
 * @returns {String} 处理后的日期字符串 2023年12月18日 04:46 / 今天 15:00 / 昨天 00:00
 */
export function handleDateTime(dateTime) {
    // 将传入的日期时间转换为 Date 对象
    const inputDate = new Date(dateTime);
    // 如果转换后的日期无效，返回 '未知时间'
    if (isNaN(inputDate.getTime())) {
        return '未知时间';
    }
    // 获取当前日期时间，计算输入日期与当前日期之间的天数差异
    const now = new Date();
    // 判断日期是否是今天
    if (
        inputDate.getFullYear() === now.getFullYear() &&
        inputDate.getMonth() === now.getMonth() &&
        inputDate.getDate() === now.getDate()
    ) {
        // 获取小时、分钟，并在前面补零
        const hours = String(inputDate.getHours()).padStart(2, '0');
        const minutes = String(inputDate.getMinutes()).padStart(2, '0');
        return `今天 ${hours}:${minutes}`;
    } else {
        // 判断日期是否是昨天
        now.setDate(now.getDate() - 1); // 减去一天
        if (
            inputDate.getFullYear() === now.getFullYear() &&
            inputDate.getMonth() === now.getMonth() &&
            inputDate.getDate() === now.getDate()
        ) {
            // 获取小时、分钟，并在前面补零
            const hours = String(inputDate.getHours()).padStart(2, '0');
            const minutes = String(inputDate.getMinutes()).padStart(2, '0');
            return `昨天 ${hours}:${minutes}`;
        } else {
            // 如果日期不是今天或昨天，格式化为年月日时分的字符串
            const year = inputDate.getFullYear();
            const month = String(inputDate.getMonth() + 1).padStart(2, '0');
            const day = String(inputDate.getDate()).padStart(2, '0');
            const hours = String(inputDate.getHours()).padStart(2, '0');
            const minutes = String(inputDate.getMinutes()).padStart(2, '0');
            return `${year}年${month}月${day}日 ${hours}:${minutes}`;
        }
    }
}


/**
 * 处理日期，格式化为 月日时分
 * @param {Number|String|Date} dateTime 传入的日期时间，可以是数字、字符串或日期对象
 * @returns {String} 处理后的日期字符串 12-26 02:53
 */
export function handleDateTime2(dateTime) {
    // 将传入的日期时间转换为 Date 对象
    const inputDate = new Date(dateTime);
    // 如果转换后的日期无效，返回 '未知时间'
    if (isNaN(inputDate.getTime())) {
        return '未知时间';
    }
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    const hours = String(inputDate.getHours()).padStart(2, '0');
    const minutes = String(inputDate.getMinutes()).padStart(2, '0');
    return `${month}-${day} ${hours}:${minutes}`;
}

/**
 * 处理时间，格式化为 年-月-日 时:分 或者 n小时前 或者 n分钟前
 * @param {Number|String|Date} dateTime 传入的日期时间，可以是数字、字符串或日期对象
 * @returns {String} YYYY-MM-DD HH:mm / n小时前 / n分钟前 / 刚刚
 */
export function handleDateTime3(dateTime) {
    const inputDate = new Date(dateTime);
    if (isNaN(inputDate.getTime())) {
        return "未知时间";
    }

    var currentTime = new Date();
    var timeDiff = currentTime.getTime() - inputDate.getTime();


    if (timeDiff < 30 * 1000) { // 30s 前
        return "刚刚";
    } else if (timeDiff < 60 * 1000) { // 60s 前
        return "1分钟前";
    } else if (timeDiff < 60 * 60 * 1000) { // 一小时内，n分钟前
        const minutes = Math.floor(timeDiff / 1000 / 60);
        return `${minutes}分钟前`;
    } else if (timeDiff < 24 * 60 * 60 * 1000) { // 一天内，n小时前
        const hours = Math.floor(timeDiff / 1000 / 60 / 60);
        return `${hours}小时前`;
    }

    const year = String(inputDate.getFullYear());
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    const hours = String(inputDate.getHours()).padStart(2, '0');
    const minutes = String(inputDate.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}


/**
 * 计算昵称长度，中日文字符占2长度，其他1长度，用于判断昵称长度是否超出32的限制
 * @param {String} nickname 用户输入的昵称名
 * @returns {Number} 昵称的官方长度
 */
export function getNicknameLength(nickname) {
    let length = 0;
    for (let i = 0; i < nickname.length; i++) {
        // 使用正则表达式检测字符是否为中文或日文
        if (/[\u4e00-\u9fa5\u0800-\u4e00]/.test(nickname[i])) {
            length += 2;
        } else {
            length += 1;
        }
    }
    return length;
}


/**
 * 根据经验值计算用户等级
 * @param {Number} exp 经验值
 * @returns {Number} 等级
 */
export function handleLevel(exp) {
    if (exp < 50) {
        return 0;
    } else if (exp < 200) {
        return 1;
    } else if (exp < 1500) {
        return 2;
    } else if (exp < 4500) {
        return 3;
    } else if (exp < 10800) {
        return 4;
    } else if (exp < 28800) {
        return 5;
    } else {
        return 6;
    }
}


/**
 * 生成随机uuid
 * @returns {String} 随机的uuid 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
 */
export function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}