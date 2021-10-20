const heartBtnEles = document.querySelectorAll('.song-heart-btn');

heartBtnEles.forEach(item => {
    item.addEventListener('click', (e) => {
        item.classList.toggle('heart-active');
        const hearIcon = item.querySelector('i');
        hearIcon.classList.toggle('far');
        hearIcon.classList.toggle('fas');
    })
})