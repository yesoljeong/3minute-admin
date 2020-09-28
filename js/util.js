// url 에서 parameter 추출
function getParam(sname) {
    var params = location.search.substr(location.search.indexOf("?") + 1);
    var sval = "";
    params = params.split("&");
    for (var i = 0; i < params.length; i++) {
        temp = params[i].split("=");
        if ([temp[0]] == sname) {
            sval = temp[1];
        }
    }
    return sval;
}

function reload(pNum, query) {
    const param = `page=${pNum}&q=${query}`;
    window.location.href = `${window.location.origin + window.location.pathname}?${encodeURI(param)}`;
}

function getClosest(elem, tagName) {
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
		if(elem.tagName.toLowerCase() === tagName.toLowerCase()) {
            return elem;
        }
    }
    
    return null;
};
