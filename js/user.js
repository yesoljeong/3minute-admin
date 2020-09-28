(function () {
    $.ajax({
        type: "GET",
        url: "https://3min.yonghochoi.com/api/profile",
        success: function (response) {
            if (response.code === "300") {
                window.location.href = response.data;
            }

            if (response["code"] !== "200") {
                alert("사용자 정보 로드에 실패했습니다");
            }

            const name = document.getElementById("profile-name");
            const picture = document.getElementById("profile-picture");
            name.textContent = response["data"]["name"];
            picture.src = response["data"]["picture"];
        },
    });
})();