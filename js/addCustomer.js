const section = document.querySelector('section');
const stars = document.querySelectorAll('.star svg');
const addModal = document.querySelector('.add_modal');
const aside = document.querySelector('aside');

customers();
modal();

// 모달팝업 open close
function modal() {

    const closeBtn = document.querySelector('.close_btn');
    const addBtn = document.querySelector('.add_btn');

    addBtn.addEventListener('click', addUserModal);
    closeBtn.addEventListener('click', addUserModalClose);

    function addUserModal() {
        addModal.classList.add('on');
    }

    function addUserModalClose() {
        addModal.classList.remove('on');
    }
};

// ajax 리스트
function customers() {

    $.ajax({
        type: 'GET',
        url: 'https://3min.yonghochoi.com/api/customers?size=10',
        data: {},
        success: function (response) {
            // console.log(response)
            const customer = document.querySelector('#customers');

            if (!response.data) { //null이든 undefind든 메시지가 나오게 함
                alert('데이터가 없습니다');
                return;
            }
            for (let i = 0; i < response.data.length; i++) {
                customer.innerHTML +=
                    `<ul class="table_data" id="${response.data[i].id}">
                    <li class="pid">${response.data[i].id}</li>
                    <li>${[i+1]}</li>
                    <li>${response.data[i].name}</li>
                    <li>${response.data[i].gender}</li>
                    <li>${response.data[i].phone}</li>
                    <li><i class="fas fa-edit modified"></i></li>
                    <li><i class="fas fa-trash-alt"></i></li>
                    <li class="show"><a href="">보기</a></li>
                </ul>`
            }

            // 데이터 수정 ajax
            const modifiedBtns = document.querySelectorAll('.modified');
            const modifiedModal = document.querySelector('.modified_modal');
            const modifiedModalBtn = document.querySelector('.modified_modal input[type=submit]');

            for (let i = 0; i < modifiedBtns.length; i++) {
                modifiedBtns[i].addEventListener('click', showModal);
            }

            modifiedModalBtn.addEventListener('click', modified)

            function showModal() {
                modifiedModal.classList.add('on');

                const pid = this.parentNode.parentNode.children[0].textContent
                const pname = this.parentNode.parentNode.children[2].textContent
                const gender = this.parentNode.parentNode.children[3].textContent
                const phone = this.parentNode.parentNode.children[4].textContent

                modifiedModal.querySelector('#modi_pid').value = pid
                modifiedModal.querySelector('#modi_pname').value = pname
                modifiedModal.querySelector('#modi_gender').value = gender
                modifiedModal.querySelector('#modi_phone').value = phone
            }

            function modified() {

                const pid = modifiedModal.querySelector('#modi_pid').value
                const pname = modifiedModal.querySelector('#modi_pname').value
                const gender = modifiedModal.querySelector('#modi_gender').value
                const phone = modifiedModal.querySelector('#modi_phone').value

                $.ajax({
                    type: 'PUT',
                    url: `https://3min.yonghochoi.com/api/customers/${pid}`,
                    data: {
                        name: pname,
                        gender: gender,
                        phone: phone,
                    },
                    success: function (response) {
                        console.log(response)
                        if (response['code'] === '200') {
                            alert('수정 하였습니다');
                            location.reload();
                        } else {
                            alert('수정에 실패했습니다');
                            location.reload();
                        }
                    }
                });
            }

            const delBtn = document.querySelectorAll('.fa-trash-alt')

            for (let i = 0; i < delBtn.length; i++) {
                delBtn[i].addEventListener('click', deleteWork);
            }

            function deleteWork(e) {
                const pid = e.target.parentNode.parentNode.id
                console.log(pid)

                $.ajax({
                    type: 'DELETE',
                    url: `https://3min.yonghochoi.com/api/customers/${pid}`,
                    data: {},
                    success: function (response) {
                        console.log(response)
                        if (response['code'] === '200') {
                            alert('삭제되었습니다');
                            location.reload();
                        } else {
                            alert('삭제에 실패했습니다');
                            location.reload();
                        }
                    }
                });
            }

            // 상담내역(aside) 관련 스크립트
            const show = document.querySelectorAll('.show');
            // const tableData = document.querySelector('.table_data');

            for (let i = 0; i < show.length; i++) {
                show[i].addEventListener('click', showAside);
            }

            function showAside(e) {
                e.preventDefault()
                console.log(e.target)
                const pid = e.target.parentNode.parentNode.id;

                if (aside.classList.contains('on') && section.classList.contains('harf')) {
                    aside.classList.remove('on');
                    section.classList.remove('harf');
                    // tableData.classList.remove('on');

                } else {
                    aside.classList.add('on');
                    section.classList.add('harf');
                    // tableData.classList.add('on');
                }

                // 상담내역 보여주는 스크립트
                $.ajax({
                    type: 'GET',
                    url: `https://3min.yonghochoi.com/api/counsels?customer_id=${pid}`,
                    data: {},
                    success: function (response) {
                        console.log(pid)
                        const counsel = document.querySelector('#counsel');

                        if (!response.data) { //null이든 undefind든 메시지가 나오게 함
                            alert('데이터가 없습니다');
                            return;
                        }
                        for (let i = 0; i < response.data.length; i++) {
                            counsel.innerHTML +=
                                `<ul class="clear">
                                    <li>
                                        <span>상담사 : </span>
                                        <span>${response.data[i].counselorName}</span>
                                    </li>
                                    <li>
                                        <span>매물번호 : </span>
                                        <span>${response.data[i].placeName}</span>
                                    </li>
                                    <li>
                                        <span>관심도 : </span>
                                        <span>${response.data[i].interest}</span>
                                    </li>
                                    <li>
                                        <p>${response.data[i].content}</p>
                                    </li>
                                </ul>`
                        }
                    }
                });

                // 카운셀 등록

                const counselSubmit = counselModal.querySelector('input[type=submit]');
                const counselPid = document.querySelector('#counsel_pid');
                counselSubmit.addEventListener('click', addcounsel)

                counselPid.textContent = pid

                function addcounsel(e) {
                    const counselId = e.target.parentNode.parentNode.querySelector('#counsel_pid').textContent;

                    const counselDay = document.querySelector('#counsel_day').value;
                    const counselAssignee = document.querySelector('#counsel_assignee').value;
                    const counselNumber = document.querySelector('#counsel_number').value;
                    const counselInterest = document.querySelector('#counsel_interest').value;
                    const counselText = document.querySelector('#counsel_text').value;

                    console.log(counselId, counselDay, counselAssignee, counselNumber, counselInterest, counselText)

                    $.ajax({
                        type: 'POST',
                        url: `https://3min.yonghochoi.com/api/counsels?customer_id=${counselId}`,
                        data: {
                            customerName: counselDay,
                            counselorName: counselAssignee,
                            placeName: counselNumber,
                            interest: counselInterest,
                            content: counselText,
                        },
                        success: function (response) {
                            if (response['code'] === '200') {
                                alert('등록 했습니다');
                                location.reload();
                            } else {
                                alert('등록에 실패했습니다');
                                location.reload();
                            }
                        }
                    });
                }
            }
        }
    });
}

for (let i = 0; i < stars.length; i++) {
    stars[i].addEventListener('click', clickWork)
}

function clickWork() {
    for (let i = 0; i < stars.length; i++) {
        stars[i].classList.add('fill')
    }
}

// 데이터 서버에 전달 ajax
const submit = document.querySelector('input[type=submit]')
submit.addEventListener('click', addUser)

function addUser() {
    const pname = document.querySelector('#add_pname');
    const gender = document.querySelector('#add_gender');
    const phone = document.querySelector('#add_phone');

    $.ajax({
        type: 'POST',
        url: 'https://3min.yonghochoi.com/api/customers',
        data: {
            name: pname.value,
            gender: gender.value,
            phone: phone.value,
        },
        success: function (response) {
            if (response['code'] === '200') {
                alert('등록 했습니다');
                location.reload();
            } else {
                alert('등록에 실패했습니다');
                location.reload();
            }
        }
    });
}