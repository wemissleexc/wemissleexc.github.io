//星空背景
function dark() {window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;var n,e,i,h,t=.05,s=document.getElementById("universe"),o=!0,a="180,184,240",r="226,225,142",d="226,225,224",c=[];function f(){n=window.innerWidth,e=window.innerHeight,i=.216*n,s.setAttribute("width",n),s.setAttribute("height",e)}function u(){h.clearRect(0,0,n,e);for(var t=c.length,i=0;i<t;i++){var s=c[i];s.move(),s.fadeIn(),s.fadeOut(),s.draw()}}function y(){this.reset=function(){this.giant=m(3),this.comet=!this.giant&&!o&&m(10),this.x=l(0,n-10),this.y=l(0,e),this.r=l(1.1,2.6),this.dx=l(t,6*t)+(this.comet+1-1)*t*l(50,120)+2*t,this.dy=-l(t,6*t)-(this.comet+1-1)*t*l(50,120),this.fadingOut=null,this.fadingIn=!0,this.opacity=0,this.opacityTresh=l(.2,1-.4*(this.comet+1-1)),this.do=l(5e-4,.002)+.001*(this.comet+1-1)},this.fadeIn=function(){this.fadingIn&&(this.fadingIn=!(this.opacity>this.opacityTresh),this.opacity+=this.do)},this.fadeOut=function(){this.fadingOut&&(this.fadingOut=!(this.opacity<0),this.opacity-=this.do/2,(this.x>n||this.y<0)&&(this.fadingOut=!1,this.reset()))},this.draw=function(){if(h.beginPath(),this.giant)h.fillStyle="rgba("+a+","+this.opacity+")",h.arc(this.x,this.y,2,0,2*Math.PI,!1);else if(this.comet){h.fillStyle="rgba("+d+","+this.opacity+")",h.arc(this.x,this.y,1.5,0,2*Math.PI,!1);for(var t=0;t<30;t++)h.fillStyle="rgba("+d+","+(this.opacity-this.opacity/20*t)+")",h.rect(this.x-this.dx/4*t,this.y-this.dy/4*t-2,2,2),h.fill()}else h.fillStyle="rgba("+r+","+this.opacity+")",h.rect(this.x,this.y,this.r,this.r);h.closePath(),h.fill()},this.move=function(){this.x+=this.dx,this.y+=this.dy,!1===this.fadingOut&&this.reset(),(this.x>n-n/4||this.y<0)&&(this.fadingOut=!0)},setTimeout(function(){o=!1},50)}function m(t){return Math.floor(1e3*Math.random())+1<10*t}function l(t,i){return Math.random()*(i-t)+t}f(),window.addEventListener("resize",f,!1),function(){h=s.getContext("2d");for(var t=0;t<i;t++)c[t]=new y,c[t].reset();u()}(),function t(){document.getElementsByTagName('html')[0].getAttribute('data-theme')=='dark'&&u(),window.requestAnimationFrame(t)}()};
dark()

//动态标题
var OriginTitile = document.title;
var titleTime;
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    //离开当前页面时标签显示内容
    document.title = "o(>_<)o 要记得我还在这里等你哦";
    clearTimeout(titleTime);
  } else {
    //返回当前页面时标签显示内容
    document.title = "(❁´◡`❁)欢迎回来！" + OriginTitile;
    //两秒后变回正常标题
    titleTime = setTimeout(function () {
      document.title = OriginTitile;
    }, 2000);
  }
});

//地理位置信息get请求
$.ajax({
  type: 'get',
  url: 'https://apis.map.qq.com/ws/location/v1/ip',
  data: {
      key: 'SMMBZ-V5BR4-GDVUX-KPDX5-TD2AE-KUF6A',
      output: 'jsonp',
  },
  dataType: 'jsonp',
  success: function (res) {
      ipLoacation = res;
  }
})
function getDistance(e1, n1, e2, n2) {
  const R = 6371
  const { sin, cos, asin, PI, hypot } = Math
  let getPoint = (e, n) => {
      e *= PI / 180
      n *= PI / 180
      return { x: cos(n) * cos(e), y: cos(n) * sin(e), z: sin(n) }
  }

  let a = getPoint(e1, n1)
  let b = getPoint(e2, n2)
  let c = hypot(a.x - b.x, a.y - b.y, a.z - b.z)
  let r = asin(c / 2) * 2 * R
  return Math.round(r);
}

function showWelcome() {

  let dist = getDistance(108.563332, 34.153990, ipLoacation.result.location.lng, ipLoacation.result.location.lat); //这里换成自己的经纬度
  let pos = ipLoacation.result.ad_info.nation;
  let ip;
  let posdesc;
  switch (ipLoacation.result.ad_info.nation) {
      case "中国":
          pos = ipLoacation.result.ad_info.province + " " + ipLoacation.result.ad_info.city + " " + ipLoacation.result.ad_info.district;
          ip = ipLoacation.result.ip;
        default:
            posdesc = "";
            break;
    }

  //根据本地时间切换欢迎语
  let timeChange;
  let date = new Date();
  if (date.getHours() >= 6 && date.getHours() < 11) timeChange = "<span>早上好</span>，一日之计在于晨！";
  else if (date.getHours() >= 11 && date.getHours() < 14) timeChange = "<span>中午好</span>，该摸鱼吃午饭了。";
  else if (date.getHours() >= 14 && date.getHours() < 16) timeChange = "<span>下午好</span>，且先轻抿一口淡茶！";
  else if (date.getHours() >= 16 && date.getHours() < 19) timeChange = "<span>夕阳无限好，</span>干饭要趁早！";
  else if (date.getHours() >= 19 && date.getHours() < 24) timeChange = "<span>晚上好</span>，卷起来！嗨起来！";
  else timeChange = "夜深了，早点休息，熬夜会变丑哦。";

  try {
      //自定义文本和需要放的位置
      document.getElementById("welcome-info").innerHTML =
          `欢迎来自 <span style="color:#1DA1F2">${pos}</span> 的小伙伴。
          ${timeChange}您现在距离Beerlee约有 <span style="color:#1DA1F2">${dist}</span> 公里。 ${posdesc}</b>`;
  } catch (err) {
      // console.log("Pjax无法获取#welcome-info元素 (#_<-)")
  }
}
window.onload = showWelcome;
// 如果使用了pjax在加上下面这行代码
document.addEventListener('pjax:complete', showWelcome);


//右键菜单
function setMask() {
  //设置遮罩
  if (document.getElementsByClassName("rmMask")[0] != undefined)
      return document.getElementsByClassName("rmMask")[0];
  mask = document.createElement('div');
  mask.className = "rmMask";
  mask.style.width = window.innerWidth + 'px';
  mask.style.height = window.innerHeight + 'px';
  mask.style.background = '#fff';
  mask.style.opacity = '.0';
  mask.style.position = 'fixed';
  mask.style.top = '0';
  mask.style.left = '0';
  mask.style.zIndex = 998;
  document.body.appendChild(mask);
  document.getElementById("rightMenu").style.zIndex = 19198;
  return mask;
}

function insertAtCursor(myField, myValue) {

  //IE 浏览器
  if (document.selection) {
      myField.focus();
      sel = document.selection.createRange();
      sel.text = myValue;
      sel.select();
  }

  //FireFox、Chrome等
  else if (myField.selectionStart || myField.selectionStart == '0') {
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;

      // 保存滚动条
      var restoreTop = myField.scrollTop;
      myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);

      if (restoreTop > 0) {
          myField.scrollTop = restoreTop;
      }

      myField.focus();
      myField.selectionStart = startPos + myValue.length;
      myField.selectionEnd = startPos + myValue.length;
  } else {
      myField.value += myValue;
      myField.focus();
  }
}

let rmf = {};
rmf.showRightMenu = function (isTrue, x = 0, y = 0) {
  let $rightMenu = $('#rightMenu');
  $rightMenu.css('top', x + 'px').css('left', y + 'px');

  if (isTrue) {
      $rightMenu.show();
  } else {
      $rightMenu.hide();
  }
}

rmf.copyWordsLink = function () {
  let url = window.location.href
  let txa = document.createElement("textarea");
  txa.value = url;
  document.body.appendChild(txa)
  txa.select();
  document.execCommand("Copy");
  document.body.removeChild(txa);
  Snackbar.show({
    text: '本文地址复制成功！',
    pos: 'top-right',
    showAction: false,
})}

//复制选中文字
rmf.copySelect = function () {
  document.execCommand('Copy', false, null);
  Snackbar.show({
    text: '复制成功！',
    pos: 'top-right',
    showAction: false,
})}
//回到顶部
rmf.scrollToTop = function () {
  document.getElementsByClassName("menus_items")[1].setAttribute("style", "");
  document.getElementById("name-container").setAttribute("style", "display:none");
  btf.scrollToDest(0, 500);
}

document.body.addEventListener('touchmove', function () {

}, { passive: false });

function popupMenu() {
  window.oncontextmenu = function (event) {
      // if (event.ctrlKey) return true;

      $('.rightMenu-group.hide').hide();
      if (document.getSelection().toString()) {
          $('#menu-text').show();
      }
      if (document.getElementById('post')) {
          $('#menu-post').show();
      } else {
          if (document.getElementById('page')) {
              $('#menu-post').show();
          }
      }
      var el = window.document.body;
      el = event.target;
      var a = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
      if (a.test(window.getSelection().toString()) && el.tagName != "A") {
          $('#menu-too').show()
      }
      if (el.tagName == 'A') {
          $('#menu-to').show()
          rmf.open = function () {
              if (el.href.indexOf("http://") == -1 && el.href.indexOf("https://") == -1 || el.href.indexOf("yisous.xyz") != -1) {
                  pjax.loadUrl(el.href)
              }
              else {
                  location.href = el.href
              }
          }
          rmf.openWithNewTab = function () {
              window.open(el.href);
              // window.location.reload();
          }
          rmf.copyLink = function () {
              let url = el.href
              let txa = document.createElement("textarea");
              txa.value = url;
              document.body.appendChild(txa)
              txa.select();
              document.execCommand("Copy");
              document.body.removeChild(txa);
              Snackbar.show({
                text: '链接地址复制成功！',
                pos: 'top-right',
                showAction: false,
            })
          }
      } else if (el.tagName == 'IMG') {
          $('#menu-img').show()
          rmf.openWithNewTab = function () {
              window.open(el.src);
              // window.location.reload();
          }
          rmf.click = function () {
              el.click()
          }
          rmf.copyLink = function () {
              let url = el.src
              let txa = document.createElement("textarea");
              txa.value = url;
              document.body.appendChild(txa)
              txa.select();
              document.execCommand("Copy");
              document.body.removeChild(txa);
          }
          rmf.saveAs = function () {
              var a = document.createElement('a');
              var url = el.src;
              var filename = url.split("/")[-1];
              a.href = url;
              a.download = filename;
              a.click();
              window.URL.revokeObjectURL(url);
          }
      } else if (el.tagName == "TEXTAREA" || el.tagName == "INPUT") {
          $('#menu-paste').show();
          rmf.paste = function () {
              navigator.permissions
                  .query({
                      name: 'clipboard-read'
                  })
                  .then(result => {
                      if (result.state == 'granted' || result.state == 'prompt') {
                          //读取剪贴板
                          navigator.clipboard.readText().then(text => {
                              console.log(text)
                              insertAtCursor(el, text)
                          })
                      } else {
                          Snackbar.show({
                              text: '请允许读取剪贴板！',
                              pos: 'top-center',
                              showAction: false,
                          })
                      }
                  })
          }
      }
      let pageX = event.clientX + 10;
      let pageY = event.clientY;
      let rmWidth = $('#rightMenu').width();
      let rmHeight = $('#rightMenu').height();
      if (pageX + rmWidth > window.innerWidth) {
          pageX -= rmWidth + 10;
      }
      if (pageY + rmHeight > window.innerHeight) {
          pageY -= pageY + rmHeight - window.innerHeight;
      }
      mask = setMask();
      // 滚动消失的代码和阅读进度有冲突，因此放到readPercent.js里面了
      $(".rightMenu-item").click(() => {
          $('.rmMask').attr('style', 'display: none');
      })
      $(window).resize(() => {
          rmf.showRightMenu(false);
          $('.rmMask').attr('style', 'display: none');
      })
      mask.onclick = () => {
          $('.rmMask').attr('style', 'display: none');
      }
      rmf.showRightMenu(true, pageY, pageX);
      $('.rmMask').attr('style', 'display: flex');
      return false;
  };

  window.addEventListener('click', function () {
      rmf.showRightMenu(false);
  });
}

// 全屏
rmf.fullScreen = function () {
  if (document.fullscreenElement) document.exitFullscreen();
  else document.documentElement.requestFullscreen();
}

if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
  popupMenu()
}
const box = document.documentElement

function addLongtabListener(target, callback) {
  let timer = 0 // 初始化timer

  target.ontouchstart = () => {
      timer = 0 // 重置timer
      timer = setTimeout(() => {
          callback();
          timer = 0
      }, 380) // 超时器能成功执行，说明是长按
  }

  target.ontouchmove = () => {
      clearTimeout(timer) // 如果来到这里，说明是滑动
      timer = 0
  }

  target.ontouchend = () => { // 到这里如果timer有值，说明此触摸时间不足380ms，是点击
      if (timer) {
          clearTimeout(timer)
      }
  }
}

addLongtabListener(box, popupMenu)

// 分类导航栏高亮 

function catalogActive () {
    let $list = document.getElementById('catalog-list')
    if ($list) {
      // 鼠标滚轮滚动
      $list.addEventListener('mousewheel', function (e) {
        // 计算鼠标滚轮滚动的距离
        $list.scrollLeft -= e.wheelDelta / 2
        // 阻止浏览器默认方法
        e.preventDefault()
      }, false)
  
      // 高亮当前页面对应的分类或标签
      let path = decodeURIComponent(window.location.pathname).replace(/page\/[0-9]+\//g, '')
      let $catalog = document.getElementById(path)
      $catalog?.classList.add('selected')
  
      // 滚动当前页面对应的分类或标签到中部
      $list.scrollLeft = ($catalog.offsetLeft - $list.offsetLeft) - ($list.offsetWidth - $catalog.offsetWidth) / 2
    }
  }
  catalogActive()

// 页面滚动百分比
window.addEventListener('scroll', function () {
    let totalH = document.body.scrollHeight || document.documentElement.scrollHeight // 页面总高
    let clientH = window.innerHeight || document.documentElement.clientHeight // 可视高
    document.querySelector('#nav #hotkey #top-button a.site-page i').dataset.percent = ((document.body.scrollTop || document.documentElement.scrollTop) / (totalH - clientH) * 100).toFixed(0)
  })

//瀑布流
if (document.querySelector('#bber-talk')) {
  var swiper = new Swiper('.swiper-container', {
    direction: 'vertical', // 垂直切换选项
    loop: true,
    autoplay: {
    delay: 3000,
    pauseOnMouseEnter: true
  },
  });
}

// 段落序号
function postAddToc () {
    let postContent = document.querySelector('#post>#article-container.post-content')
    let cardToc = document.getElementById('card-toc')
    if (postContent && cardToc) {
      let tocNumber = cardToc.getElementsByClassName('toc-number')
      let tocLink = cardToc.getElementsByClassName('toc-link')
      for (let i = 0; i < tocLink.length; i++) {
        document.getElementById(decodeURIComponent(tocLink[i].attributes.href.value).slice(1)).dataset.toc = tocNumber[i].innerText
      }
    }
  }
  postAddToc ()
//pjax-data标签属性
  document.addEventListener('pjax:complete', postAddToc);


   //导航栏标题
   if (GLOBAL_CONFIG_SITE.title.replace("Beerlee", "") === "") {
    document.getElementById("page-title").style.display = "none";
  } else {
    document.querySelector("#page-title>span").innerHTML = document.title.split("| Beerlee")[0];
  }
  // 添加pjax-data标签属性
  document.addEventListener('pjax:complete', pageTitle);
  function pageTitle() {
    var pageTitle = document.getElementById('page-title');
    pageTitle.setAttribute('pjax-data', 'true');
  }