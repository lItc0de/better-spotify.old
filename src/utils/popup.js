export const popupCenter = (url, title, w, h) => {
  // Fixes dual-screen position                         Most browsers      Firefox
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screen.left;
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screen.top;

  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width;
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height;

  const left = ((width / 2) - (w / 2)) + dualScreenLeft;
  const top = ((height / 2) - (h / 2)) + dualScreenTop;
  const newWindow = window.open(url, title, `scrollbars=yes,width=${w},height=${h},top=${top},left=${left}`);

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus();
  }
}
