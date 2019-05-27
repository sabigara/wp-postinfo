function copyToClipboard(str) {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

function copyPostIdToClipboard() {
    let postId = getPostId()
    copyToClipboard(postId);
}

function createPostinfoBox() {
    let postinfoBox = document.createElement('div');
    postinfoBox.className = 'wp-postinfo-box';
    return postinfoBox;
}

function getPostId() {
    let article = document.getElementsByTagName('article')[0];
    let postIdAttr = article.getAttribute('id');
    return postIdAttr.substring(5);
}

function createButton() {
    let copyButton = document.createElement('button');
    copyButton.className = 'wp-postinfo-button';
    copyButton.innerHTML = 'コピー';
    copyButton.addEventListener('click', copyPostIdToClipboard);

    let wrapper = document.createElement('div');
    wrapper.className = 'wp-postinfo-button-wrapper';
    wrapper.appendChild(copyButton);
    return wrapper;
}

function createPostIdElem() {
    let postIdElem = document.createElement('div');
    postIdElem.className = 'wp-postinfo-row';
    let rowNameSpan = document.createElement('span');
    let postIdSpan = document.createElement('span');    
    let copyButtonWrapped = createButton();

    rowNameSpan.innerHTML = '記事ID:  ';
    postIdSpan.innerHTML = getPostId();
    postIdElem.appendChild(rowNameSpan);
    postIdElem.appendChild(postIdSpan);
    postIdElem.appendChild(copyButtonWrapped);
    return postIdElem;
}

let postinfoBox = createPostinfoBox();
let postIdElem = createPostIdElem();

postinfoBox.appendChild(postIdElem);
document.body.appendChild(postinfoBox);

postinfoBox.ondragstart = () => {
    return false;
}

postinfoBox.onmousedown = (e) => {
    let shiftX = e.clientX - postinfoBox.getBoundingClientRect().left;
    let shiftY = e.clientY - postinfoBox.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
        postinfoBox.style.left = pageX - shiftX + 'px';
        postinfoBox.style.top = pageY - shiftY + 'px';
    }
    
    function onMouseMove(e) {
        moveAt(e.pageX, e.pageY)
    }

    moveAt(e.pageX, e.pageY);
    document.addEventListener('mousemove', onMouseMove);
    
    postinfoBox.onmouseup = () => {
        document.removeEventListener('mousemove', onMouseMove);
        postinfoBox.onmouseup = null;
    };
};