// 모달 팝업 오픈 스크립트
const counselModal = document.querySelector('.add_counsel');
const addCounselBtn = document.querySelectorAll('aside .add_btn');

for (let i = 0; i < addCounselBtn.length; i++) {
    addCounselBtn[i].addEventListener('click', counselMoadalOpen)
}

function counselMoadalOpen() {
    if (counselModal.classList.contains('on')) {
        counselModal.classList.remove('on')
    } else {
        counselModal.classList.add('on')
    }
}