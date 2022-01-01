const tabs = document.querySelectorAll('.tab');
const contentDivs = document.querySelectorAll('.content-body');

tabs.forEach(tab => {
  tab.addEventListener('click', e => {
    tabs.forEach(tab => tab.classList.remove('tab-active'));
    contentDivs.forEach(div => div.classList.remove('show-active'));
    document.getElementById(e.currentTarget.innerText.trim()).classList.add('show-active');
    e.currentTarget.classList.add('tab-active');
  });
});