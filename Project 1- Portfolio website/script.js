document.querySelector('.cross').style.display = 'none';
document.querySelector('.ham').addEventListener("click", () => {
    document.querySelector('.open').classList.toggle('close');
    document.querySelector('.containerAfter').classList.toggle('containerBefore');
    document.querySelector('.box1after').classList.toggle('box1before');
    document.querySelector('.box2after').classList.toggle('box2before');
})

const selectType = document.querySelector('.type');
if (selectType) {
    let typed_strings = selectType.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.type', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
    });
}

const form = document.getElementById('form');
const submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    form.submit();
});