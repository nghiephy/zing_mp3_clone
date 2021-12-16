const heartBtnEles = document.querySelectorAll('.song-heart-btn');
const musicListEle = document.querySelector('.mymusic-list-song div div');
const slideImgs = document.querySelectorAll('.mymusic-slider-item');
const mainWrapEle = document.querySelector('.main-wrap');
const toggleListMusicEle = document.querySelector('.toggle-list-music');
const listMusicEle = document.querySelector('.app .list-music');
const mbNavFulBtn = document.querySelector('.navigation .mb-nav-full-btn');
const navLayoutEle = document.querySelector('.navigation');
const navLabelEles = document.querySelectorAll('.main-nav__item');
const navContentEles = document.querySelectorAll('.nav-content');
const qualityEles = document.querySelectorAll('.menu-quality-item');
const historyTabEles = document.querySelectorAll('.list-controls__tab-item');
const historyContentEles = document.querySelectorAll('.list-content-item');

const sectionPlaylist = document.querySelector("#playlist-section");
const sectionAlbum = document.querySelector("#album-section");
const sectionMv = document.querySelector("#mv-section");
const sectionSinger = document.querySelector("#singer-section");
const headerSettingBtn = document.querySelector("#header-setting-button");

let imgIndex = 2;

handleFeatureUI();
slideShow();

handleSlider(sectionPlaylist, 20, 25, 50);
handleSlider(sectionAlbum, 20, 25, 50);
handleSlider(sectionSinger, 20, 25, 50);
handleSlider(sectionMv, 33.33, 33.33, 100);




function handleFeatureUI() {
    // Handle when click heart button
    heartBtnEles.forEach(item => {
        item.addEventListener('click', (e) => {
            item.classList.toggle('heart-active');
            const hearIcon = item.querySelector('i');
            hearIcon.classList.toggle('far');
            hearIcon.classList.toggle('fas');
        })
    })

    // Handle tabui
    navLabelEles.forEach((navLabelEle, index) => {
        const navContentEle = navContentEles[index];

        navLabelEle.onclick = function () {
            
            document.querySelector('.nav-content.active').classList.remove('active');
            document.querySelector('.main-nav__item.active').classList.remove('active');

            this.classList.add('active');
            navContentEle.classList.add('active');

        }
    })

    // Handle tab history play music right layout
    historyTabEles.forEach((historyTabEle, index) => {
        const historyContentEle = historyContentEles[index];

        historyTabEle.onclick = function () {
            document.querySelector('.list-controls__tab-item.active').classList.remove('active');
            document.querySelector('.list-content-item.active').classList.remove('active');

            this.classList.add('active');
            historyContentEle.classList.add('active');
        }
    })

    // Handle when click button toggle list music in the right
    toggleListMusicEle.addEventListener('click', (e) => {
        listMusicEle.classList.toggle('active');
        toggleListMusicEle.classList.toggle('active');
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
        if(width <= 1635) {
            listMusicEle.classList.remove('active');
        }
    }
    window.addEventListener("resize", onresize);

    
    // Handle add header background when scroll
    mainWrapEle.addEventListener('scroll', () => {
        const headerEle = document.querySelector('.main-wrap .header');
        if(mainWrapEle.scrollTop > 0)
            headerEle.classList.add('active-bg');
        else 
            headerEle.classList.remove('active-bg');

    })

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

    // Handle chosing quality music on header
    qualityEles.forEach((qualityEle, index) => {
        qualityEle.addEventListener('click', (event) => {
            qualityEle.classList.remove('disable');
            qualityEles.forEach(item => {
                if(item != qualityEle) {
                    item.classList.add('disable');
                }
            })
        })
    })    

    // Detecting user click outsile some element in website
    document.addEventListener('click', (event) => {
        const settingMenuEle = document.querySelector('#setting-menu');
        const userOptionMenuEle = document.querySelector('#user-option-menu');
        const userOptionBtn = document.querySelector('.user-option');
        const historyOtherBtn = document.querySelector('.list-controls__other-wrap');
        const historyOtherEle = document.querySelector('.list-controls__menu');
        let targetElement = event.target;

        do {
            if(targetElement == settingMenuEle) {
                return;
            }
            if(targetElement == historyOtherEle) {
                return;
            }
            if(targetElement == headerSettingBtn) {
                settingMenuEle.classList.toggle('disable');
                return;
            }
            if(targetElement == historyOtherBtn) {
                historyOtherEle.classList.toggle('disable');
                return;
            }
            if(targetElement == userOptionBtn) {
                userOptionMenuEle.classList.toggle('disable');
                return;
            }
            targetElement = targetElement.parentNode;
        } while(targetElement);
        settingMenuEle.classList.add('disable');
    })
}

function handleSlider(section, scalePC, scaleTa, scaleMb) {
    const sliderItems = section.querySelectorAll( ".container-item-wrap");
    const sliderRightBtn = section.querySelector('.container-controls__right');
    const sliderLeftBtn = section.querySelector('.container-controls__left');
    const numItemSliderPC = (100/scalePC);
    const numItemSliderTa = (100/scaleTa);
    const numItemSliderMb = (100/scaleMb);

    // Handle scroll for slider 
    let l=0;
    let movePer = scalePC*2;
    let maxMove = (sliderItems.length-numItemSliderPC)*scalePC + scalePC;
    let itemPages = Math.ceil(sliderItems.length/numItemSliderPC);
 
    // Properties scroll for tablet view => update when refresh
    let tabletViewSldier = window.matchMedia("(max-width: 1113px)");
    let mobileViewSldier = window.matchMedia("(max-width: 739px)");
    if(tabletViewSldier.matches) {
        movePer = scaleTa*2;
        maxMove = (sliderItems.length-numItemSliderTa)*scaleTa + scaleTa;
        itemPages = Math.ceil(sliderItems.length/numItemSliderTa);
    }
    if (mobileViewSldier.matches) {
        movePer = scaleMb*(scaleMb==100?1:2);
        maxMove = (sliderItems.length-numItemSliderMb)*scaleMb + (scaleMb==100?0:scaleMb);
        itemPages = Math.ceil(sliderItems.length/numItemSliderMb);
    }

    // Properties scroll for tablet view => update when scroll
    var onResizeSlider = function() {
        width = document.body.clientWidth;
        if(width > 1113) {
            movePer = scalePC*2;
            maxMove = (sliderItems.length-numItemSliderPC)*scalePC + scalePC;
            itemPages = Math.ceil(sliderItems.length/numItemSliderPC);
            console.log(maxMove);
        }
        if(width <= 1113) {
            movePer = scaleTa*2;
            maxMove = (sliderItems.length-numItemSliderTa)*scaleTa + scaleTa;
            itemPages = Math.ceil(sliderItems.length/numItemSliderTa);
            console.log(maxMove);
        }
        if(width <= 739) {
            movePer = scaleMb*(scaleMb==100?1:2);
            maxMove = (sliderItems.length-numItemSliderMb)*scaleMb + (scaleMb==100?0:scaleMb);
            itemPages = Math.ceil(sliderItems.length/numItemSliderMb);
        }

        // Return first item when scroll change
        for(var item of sliderItems) {
            item.style.left = "0%";
        }
        l = 0;
    }
    window.addEventListener("resize", onResizeSlider);

    sliderRightBtn.onclick = function () {
        l = l + movePer;
        console.log(l);
        console.log(maxMove);

        sliderLeftBtn.classList.remove('disable');

        if(Math.ceil(l+movePer) > Math.ceil(maxMove)) {
            sliderRightBtn.classList.add('disable');
            
        }

        console.log(sliderItems == 1);
        for(var item of sliderItems) {

            if(Math.ceil(l) > Math.ceil(maxMove)) {
                l = l - movePer;
            }

            item.style.left = '-' + l + '%';
        }
    }

    sliderLeftBtn.onclick = function () {
        l = l - movePer;

        sliderRightBtn.classList.remove('disable');

        if (l<=0) {
            l = 0;
            sliderLeftBtn.classList.add('disable');
        }

        for(var item of sliderItems) {
            if(itemPages > 1)
                item.style.left = '-' + l + '%';
        }
    }


}

//Handle slide show
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