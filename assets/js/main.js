const heartBtnEles = document.querySelectorAll('.song-heart-btn');
const musicListEle = document.querySelector('.mymusic-list-song div div');
const slideImgs = document.querySelectorAll('.mymusic-slider-item');
const mainWrapEle = document.querySelector('.main-wrap');
const toggleListMusicEle = document.querySelector('.toggle-list-music');
const listMusicEle = document.querySelector('.app .list-music');
const mbNavFulBtn = document.querySelector('.navigation .mb-nav-full-btn');
const navLayoutEle = document.querySelector('.navigation');

// Handle when click heart button
heartBtnEles.forEach(item => {
    item.addEventListener('click', (e) => {
        item.classList.toggle('heart-active');
        const hearIcon = item.querySelector('i');
        hearIcon.classList.toggle('far');
        hearIcon.classList.toggle('fas');
    })
})

// Handle when click button toggle list music in the right
toggleListMusicEle.addEventListener('click', (e) => {
    listMusicEle.classList.toggle('active');
})

// Handle when click button display full nav layout
mbNavFulBtn.addEventListener('click', (e) => {
    navLayoutEle.classList.toggle('small');
    mbNavFulBtn.querySelector('i').classList.toggle('fa-chevron-right');
    mbNavFulBtn.querySelector('i').classList.toggle('fa-chevron-left');
})

// Handle display small nav when screen.width < 1023px
var onresize = function() {
    width = document.body.clientWidth;
    if(width <= 1023) {
        navLayoutEle.classList.add('small');
    }
    if(width > 1023) {
        navLayoutEle.classList.remove('small');
    }
 }
 window.addEventListener("resize", onresize);

// Handle vertical scrollbar in songlist
let scrollTimer = -1;
musicListEle.addEventListener('scroll', () => {
    const trackVertical = document.querySelector('.track-vertical');
    const thumbVertical = trackVertical.querySelector('.thumb-vertical');
    const totalHeight = musicListEle.scrollHeight - musicListEle.offsetHeight;

    // Set properties when frist begin scroll
    trackVertical.style.height = musicListEle.scrollHeight + 'px';
    trackVertical.style.opacity = '1';
    thumbVertical.style.backgroundColor = '#6e6875';
    
    // Calculate value to scroll
    let progress = musicListEle.scrollTop / totalHeight;
    let valueTranslateY = progress*musicListEle.offsetHeight - thumbVertical.offsetHeight;
    valueTranslateY = (valueTranslateY>0)?valueTranslateY:0;
    thumbVertical.style.transform = 'translatey(' + valueTranslateY + 'px)';

    // Set timeout for vertical scrollbar: it will hidden after 1.5s don't scroll
    if (scrollTimer != -1)
        clearTimeout(scrollTimer); // make it don't hiden when scrolling

    scrollTimer = window.setTimeout(() => {
        trackVertical.style.opacity = 0;
    }, 1500);
})

//Handle slide show
let imgIndex = 2;
function slideShow() {
    const slideImgFirst = document.querySelector('.mymusic-slider-item.first')
    const slideImgSecond = document.querySelector('.mymusic-slider-item.second')
    const slideImgThird = slideImgs[imgIndex]
    // const slideImgFourth = slideImgs[imgIndex === slideImgs.length -1 ?  0 : imgIndex + 1]
    // slideImgFourth.classList.add('third')
    slideImgThird.classList.replace('third', 'second')
    slideImgSecond.classList.replace('second', 'first')
    slideImgFirst.classList.replace('first', 'third')
    imgIndex++;
    if(imgIndex >= slideImgs.length) { //imgIndex: 0-7, slideImgs.length: 8
        imgIndex = 0;
    }
    setTimeout(slideShow, 2000)
}

// Handle add header background when scroll
mainWrapEle.addEventListener('scroll', () => {
    const headerEle = document.querySelector('.main-wrap .header');
    if(mainWrapEle.scrollTop > 0)
        headerEle.classList.add('active-bg');
    else 
        headerEle.classList.remove('active-bg');

})

slideShow();
