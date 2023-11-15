// 将文本中的URL或其他可识别的链接转换为可点击的超链接
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


// 处理播放时长的时间
export function handleTime(time) {
    time = parseInt(time);
    time = Math.floor(time);
    let m = Math.floor(time / 60);
    let s = Math.floor(time % 60);
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    return m + ':' + s;
}


// 将播放时长还原为秒数
export function returnSecond(time) {
    time = time.split(':');
    let m = parseInt(time[0]);
    let s = parseInt(time[1]);
    return m * 60 + s;
}


// 处理大于1w的数字
export function handleNum(num) {
    if (num > 10000) {
        num = (num / 10000).toFixed(1);
        return num + '万';
    } else {
        return num;
    }
}


/**
 * 处理日期，截取月日或者24小时内或者60分钟内
 * @param {String} dateTime 
 * @returns 
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
        const month = inputDate.getMonth() + 1; // 月份是从0开始的
        const day = inputDate.getDate();
        return `${month}-${day}`;
    }
}


/**
 * 计算昵称长度，中日文字符占2长度，其他1长度，用于判断昵称长度是否超出24的限制
 * @param {String} nickname 
 * @returns 
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