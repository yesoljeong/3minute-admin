// 모달 팝업 오픈 스크립트
const counselModal = document.querySelector('.add_counsel');
const addCounselBtn = document.querySelectorAll('aside .add_btn');
loadPlaceNames();

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

function loadPlaceNames() {
    $.ajax({
        type: "GET",
        url: `https://3min.yonghochoi.com/api/places/name`,
        data: {},
        success: function (response) {
            if (!response.data) {
                console.log("현장 정보가 존재하지 않습니다.");
                return;
            }
            
            const placeNameSelect = document.getElementById("counsel_placename")
            for(placeName of response.data) {
                const op = new Option();
                op.value = placeName;
                op.text = placeName;
                
                placeNameSelect.add(op);
            }
        }
    });
}