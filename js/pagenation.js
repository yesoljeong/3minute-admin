const pageWrap = document.querySelector('#pagenation');
const pageA = document.querySelectorAll('#pagenation a');

pageWrap.addEventListener('click', pageWrapBtn);

for (let i = 0; i < 5; i++) {
    const newSpan = document.createElement('span');
    const span = pageWrap.appendChild(newSpan);
    span.textContent = i + 1
}

pageWrap.firstElementChild.classList.add('on')

prevF();
nextF();

function prevF() {
    const newA = document.createElement('a');
    newA.setAttribute('href', '#');
    const newI = document.createElement('i');
    newI.classList.add('fas', 'fa-chevron-left', 'prev')

    const prev = pageWrap.insertBefore(newA, pageWrap.firstChild);
    prev.appendChild(newI)
}

function nextF() {
    const newA = document.createElement('a');
    newA.setAttribute('href', '#');
    const newI = document.createElement('i');
    newI.classList.add('fas', 'fa-chevron-right', 'next');

    const childrenNum = pageWrap.children.length
    const next = pageWrap.insertBefore(newA, pageWrap.children[childrenNum]);
    next.appendChild(newI);
}

// 각 번호 클릭 시 번호 색 지정되는 스크립트
function pageWrapBtn(e) {
    e.preventDefault()
    // console.log(e.target)

    const pageSpan = document.querySelectorAll('#pagenation span');

    for (let i = 0; i < pageSpan.length; i++) {
        pageSpan[i].className = ''
    }

    if (e.target.className === 'on') {
        e.target.classList.remove('on');
    } else {
        e.target.classList.add('on');
    }
};

const nextBtn = document.querySelector('.next');
nextBtn.addEventListener('click', nextBtnWork);

function nextBtnWork(e) {
    e.preventDefault();
    // console.log(e.target)
    const pageSpan = document.querySelectorAll('#pagenation span');

    printLog("정예솔 바보 ")
    for (let i = 0; i < pageSpan.length; i++) {
        // console.log(pageSpan[i].className === 'on')
        if (pageSpan[i].className === 'on') {
            // console.log(pageSpan[i].nextElementSibling)
            pageSpan[i].nextElementSibling.className = 'on'
        }
    }

}

function printLog(log) {
    console.log(log)
}