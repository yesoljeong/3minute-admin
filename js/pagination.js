function getPageTotalCount(totalRowCount) {
    let pageTotalCount = parseInt(totalRowCount / 10);
    if (totalRowCount % 10 > 0) {
        pageTotalCount += 1;
    }

    return pageTotalCount;
}

function getStartPage(pageNum) {
    console.log(`현재 선택한 페이지 = ${pageNum}`);
    let startPage = 1;
    if (parseInt(pageNum % 10) === 0) {
        startPage = parseInt(pageNum / 10);
        startPage -= 1;
        if (startPage < 0) {
            startPage = 1;
        } else {
            startPage *= 10;
            startPage += 1;
        }
    } else {
        startPage = parseInt(pageNum / 10) * 10 + 1;
    }

    return parseInt(startPage);
}

function getEndPage(pageTotalCount, startPageNum) {
    let endPage = startPageNum + 10;
    if (endPage > pageTotalCount) {
        // 계산으로 산출된 마지막 페이지 번호보다 실제 마지막 페이지 번호가 작으면 실제 마지막 페이지 번호로 대체
        endPage = pageTotalCount;
    }
    endPage -= 1; // 시작 페이지 인덱스가 0부터 시작하므로 -1 해줌
    console.log(
        `현재 선택한 페이지가 속한 페이지 범위 = ${startPageNum} ~ ${endPage}`
    );
    console.log(`전체 보여져야할 페이지 수 = ${pageTotalCount}`);

    return endPage;
}

function paging(startPage, endPage) {
    startPage -= 1;
    const pageWrap = document.querySelector("#pagenation");
    const pageA = document.querySelectorAll("#pagenation a");
    let pageNum = 1;
    const page = getParam("page");
    if (page !== "") {
        pageNum = parseInt(page);
    }

    // 페이지 번호 생성 (번호 입력하고 클릭 이벤트 등록)
    if (endPage === 0) {
        endPage = 1;
    }
    
    for (let i = startPage; i < endPage; i++) {
        const newSpan = document.createElement("span");
        const span = pageWrap.appendChild(newSpan);
        span.textContent = i + 1;
        span.addEventListener("click", pageWrapBtn);
    }

    prevF();
    nextF();

    function prevF() {
        const newA = document.createElement("a");
        newA.setAttribute("href", "");
        newA.addEventListener("click", prevBtnWork);
        const newI = document.createElement("i");
        newI.classList.add("fas", "fa-chevron-left", "prev");

        const prev = pageWrap.insertBefore(newA, pageWrap.firstChild);
        prev.appendChild(newI);
    }

    function nextF() {
        const newA = document.createElement("a");
        newA.setAttribute("href", "");

        const newI = document.createElement("i");
        newI.classList.add("fas", "fa-chevron-right", "next");

        const childrenNum = pageWrap.children.length;
        const next = pageWrap.insertBefore(
            newA,
            pageWrap.children[childrenNum]
        );
        newA.addEventListener("click", nextBtnWork);
        next.appendChild(newI);
    }

    // 각 번호 클릭 시 번호 색 지정되는 스크립트
    function pageWrapBtn(e) {
        e.preventDefault();
        reload(e.target.textContent);
    }

    const pageSpan = document.querySelectorAll("#pagenation span");

    if (pageNum > 10) {
        pageNum %= 10;
    }
    debugger;
    pageSpan[parseInt(pageNum) - 1].classList.add("on");
}

function nextBtnWork(e) {
    e.preventDefault();
    let pNum = 1;
    const p = getParam("page");
    if (p !== "") {
        pNum = parseInt(p);
    }

    console.log(`pageNum = ${pNum}`);

    let s = getStartPage(pNum);
    s += 10;

    console.log(`startPage = ${s}`);
    debugger;
    reload(s);
}

function prevBtnWork(e) {
    e.preventDefault();
    let pNum = 1;
    const p = getParam("page");
    if (p !== "") {
        pNum = parseInt(p);
    }

    console.log(`pageNum = ${pNum}`);

    let s = parseInt(pNum / 10) * 10 + 1;
    s -= 1;
    if (s <= 0) {
        s = 1;
    }

    reload(s);
}
