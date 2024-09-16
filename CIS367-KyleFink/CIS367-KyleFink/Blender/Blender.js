let text = document.getElementById('text');
let btn = document.getElementById('btn');
let header = document.querySelector('header');

window.addEventListener('scroll', function(){
    let value = window.scrollY;
    text.style.marginTop = value * 3.0 + 'px';
    btn.style.marginTop = value * 1.5 + 'px';
});