(function () {
    document.getElementById("btn-search").addEventListener('click', search);

    // 검색 버튼 클릭 후 새로고침 되어도 검색 문자열 텍스트박스에 보이도록 처리
    const query = getParam('q');
    if (query) {
        document.getElementById("tb-search").value = decodeURI(query);
    }

    // 엔터키 입력 시 검색
    document.getElementById("tb-search")
        .addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById("btn-search").click();
            }
        });
})();

function search(e) {
    e.preventDefault(); // 버블 방지하지 않으면 페이지 이동 시 href 변경 사항이 반영되지 않음
    const query = document.getElementById("tb-search").value;
    const param = `page=1&q=${query}`;
    window.location.href = `${window.location.origin + window.location.pathname}?${encodeURI(param)}`;
}