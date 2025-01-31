console.log("开始加载danmu.js");
const mediaQueryStr = "div[data-type='video-osd']";
const buttonClassStr = "videoosd-transportbuttons";
const displayButtonOpts = {
    title: '弹幕开关',
    id: 'displayDanmaku',
    innerText: '弹幕开关',
    onclick: () => {
        console.info('点击了弹幕开关');
    },
};
const searchButtonOpts = {
    title: '搜索弹幕',
    id: 'searchDanmaku',
    innerText: '搜索弹幕',
    onclick: () => {
        console.info('点击了搜索弹幕');
        let info = getEpisodeInfo();
    },
};
function createButton(opts) {
    let button = document.createElement('button');
    button.title = opts.title;
    button.id = opts.id;
    button.innerText = opts.innerText;
    button.onclick = opts.onclick;
    return button;
}

function getEpisodeInfo() {
    let episode = document.getElementsByClassName('videoOsdParentTitle')[0].innerText;
    let episodeInfo = document.getElementsByClassName('videoOsdTitle')[0].innerText;
    let 季 = episodeInfo.split(':')[0];
    let 集 = episodeInfo.split(':')[1];
    let Info = {
        '季': 季,
        '集': 集,
        '剧集名': episode
    };
    console.info('获取到剧集信息:', Info);
    return Info;
}
function reloadDanmaku() {
    console.info('重新加载弹幕');
    let btn = document.getElementsByClassName(buttonClassStr)[0];
    let displayButton = createButton(displayButtonOpts);
    let searchButton = createButton(searchButtonOpts);
    let danmaku_button_div = document.createElement('div');
    danmaku_button_div.id = 'Danmaku_Button';
    danmaku_button_div.appendChild(displayButton);
    danmaku_button_div.appendChild(searchButton);
    btn.appendChild(danmaku_button_div);
    console.info('添加弹幕按钮成功');
}
function initListener() {
    let container = document.querySelector(mediaQueryStr);
    // 页面未加载
    if (!container) {
        console.info('页面未加载');
    } else {
        let danmaku = document.getElementById('Danmaku_Button');
        if (!danmaku) {
            console.info('准备添加弹幕按钮');
            reloadDanmaku();
        } else {
            console.info('已添加弹幕按钮');
        }
    }
}
class dandanplay {
    api="https://api.dandanplay.net/"
    async search(keyword) {
        console.info('搜索关键词:', keyword);
        let url = api + 'api/v2/search/episodes?anime=' + keyword;
        data = await fetch(url).then(res => res.json());
    }
}
setInterval(initListener, 1000);