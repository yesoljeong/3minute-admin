(function(){    // 전역 변수 사용을 제한하기 위해 즉시 실행 함수 사용
    places();

    // 모달팝업 open close
    const addBtn = document.querySelector('.add_btn');
    const closeBtn = document.querySelector('.close_btn');
    closeBtn.addEventListener('click', addModal);
    addBtn.addEventListener('click', addModal);
    
    // 데이터 서버에 전달 ajax
    const addsubmit = document.querySelector('.add_place input[type=submit]')
    addsubmit.addEventListener('click', addPlace)    
}());

function addModal() {
    const modalPopup = document.querySelector('.add_place');
    modalPopup.classList.remove('on');
    modalPopup.classList.add('on')
}

// 페이지에 현장 리스트 테이블 표시
function places() {
    $.ajax({
        type: 'GET',
        url: `https://3min.yonghochoi.com/api/places?size=10&page=${getParam("page")}`,
        data: {},
        success: function (response) {
            if (!response.data) { //null이든 undefind든 메시지가 나오게 함
                alert('데이터가 없습니다.')
                return;
            }

            makePlaceRow(response);
            const pageNum = response.page.page;
            const totalCount = response.page.totalCount;
            let pageTotalCount = getPageTotalCount(totalCount);
            let startPage = getStartPage(pageNum);
            let endPage = getEndPage(pageTotalCount, startPage);
            paging(startPage, endPage);
        }
    });
}

function makePlaceRow(response) {
    const place = document.querySelector('#places');
    for (let i = 0; i < response.data.length; i++) {
        place.innerHTML +=
            `<ul class="table_data">
                <li>${response.data[i].id}</li>
                <li>${response.data[i].placeNum}</li>
                <li>${response.data[i].name}</li>
                <li>${response.data[i].assignee}</li>
                <li>${response.data[i].phone}</li>
                <li>${response.data[i].rt}</li>
                <li>${response.data[i].placeType}</li>
                <li><i class="fas fa-edit"></i></li>
                <li><i class="fas fa-trash-alt"></i></li>
            </ul>`
    }

    const modifiedBtn = document.querySelectorAll('.fa-edit');
    for (let i = 0; i < modifiedBtn.length; i++) {
        modifiedBtn[i].addEventListener('click', clickPlaceModified);
    }

    // 모달창에서 수정 submit눌렀을때 수정되는 ajax
    const modifiedsubmit = document.querySelector('.modified_modal input[type=submit]')
    modifiedsubmit.addEventListener('click', modified)

    // 데이터 삭제 ajax
    const delBtn = document.querySelectorAll('.fa-trash-alt')
    for (let i = 0; i < delBtn.length; i++) {
        delBtn[i].addEventListener('click', deleteBtnWork)
    }
}

// 삭제 아이콘 클릭 시 서버에 삭제 요청
function deleteBtnWork(e) {
    const pid = e.target.parentNode.parentNode.firstElementChild.textContent
    console.log(pid)

    $.ajax({
        type: 'DELETE',
        url: `https://3min.yonghochoi.com/api/places/${pid}`,
        data: {},
        success: function (response) {
            console.log(response)
            if (response['code'] === '200') {
                alert('삭제 하였습니다');
            } else {
                alert('삭제에 실패했습니다');
            }

            location.reload();
        }
    });
}

// 수정 아이콘 클릭 시 팝업창 표시
function clickPlaceModified() {
    const modifiedModal = document.querySelector('.modified_modal')
    modifiedModal.classList.add('on');
    const pid = this.parentNode.parentNode.children[0].textContent
    const pnumber = this.parentNode.parentNode.children[1].textContent
    const placeName = this.parentNode.parentNode.children[2].textContent
    const assignee = this.parentNode.parentNode.children[3].textContent
    const phone = this.parentNode.parentNode.children[4].textContent
    const rt = this.parentNode.parentNode.children[5].textContent
    const placeType = this.parentNode.parentNode.children[6].textContent

    console.log(pid, pnumber, placeName, assignee, phone, rt, placeType)

    modifiedModal.querySelector('#modi_pid').value = pid;
    modifiedModal.querySelector('#modi_number').value = pnumber;
    modifiedModal.querySelector('#modi_place').value = placeName;
    modifiedModal.querySelector('#modi_pname').value = assignee;
    modifiedModal.querySelector('#modi_phone').value = phone;
    modifiedModal.querySelector('#modi_cost').value = rt;
    modifiedModal.querySelector('#modi_kinds').value = placeType;
}

// 수정 팝업 창에서 수정 버튼 클릭 시 서버에 수정 요청
function modified() {
    const modifiedModal = document.querySelector('.modified_modal')
    const pid = modifiedModal.querySelector('#modi_pid').value
    const pnumber = modifiedModal.querySelector('#modi_number').value
    const placeName = modifiedModal.querySelector('#modi_place').value
    const assignee = modifiedModal.querySelector('#modi_pname').value
    const phone = modifiedModal.querySelector('#modi_phone').value
    const rt = modifiedModal.querySelector('#modi_cost').value
    const placeType = modifiedModal.querySelector('#modi_kinds').value

    $.ajax({
        type: 'PUT',
        url: `https://3min.yonghochoi.com/api/places/${pid}`,
        data: {
            placeNum: pnumber,
            name: placeName,
            assignee: assignee,
            phone: phone,
            rt: rt,
            placeType: placeType,
        },
        success: function (response) {
            console.log(response)
            if (response['code'] === '200') {
                alert('수정 하였습니다');
            } else {
                alert('수정에 실패했습니다');
            }
            location.reload();
        }
    });
}

function addPlace() {
    const pNumber = document.querySelector('#add_number').value;
    const place = document.querySelector('#add_place').value;
    const pname = document.querySelector('#add_pname').value;
    const phone = document.querySelector('#add_phone').value;
    const cost = document.querySelector('#add_cost').value;
    const kinds = document.querySelector('#add_kinds').value;
    console.log(pNumber, place, pname, phone, cost, kinds)

    $.ajax({
        type: 'POST',
        url: 'https://3min.yonghochoi.com/api/places',
        data: {
            placeNum: pNumber,
            name: place,
            assignee: pname,
            phone: phone,
            rt: cost,
            placeType: kinds,
        },
        success: function (response) {
            if (response['code'] === '200') {
                alert('저장하였습니다');
                // location.reload();
            } else {
                alert('저장에 실패했습니다');
            }
        }
    });
}
