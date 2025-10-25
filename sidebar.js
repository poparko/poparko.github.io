
// Select all sidebar buttons and sections
const buttons = document.querySelectorAll('.slant-btn');
const sections = document.querySelectorAll('.section');
const bg = document.querySelector('.background');
const fg = document.querySelector('.foreground');
const fg2 = document.querySelector('.foreground-next');
const backgrounds = [
  'url("images/bbg2.jpg")',
  'url("images/bg1.jpg")',
  'url("images/bg3.jpg")',
  'url("images/bbg4.jpg")'
];
var currentSection = -1; // tracks which section is active
let isScrolling;

//Start
sections.forEach((section, index) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    fg.style.backgroundImage = backgrounds[0];
    const scrollPos = window.scrollY + window.innerHeight / 2;
    if (scrollPos >= top && scrollPos < bottom) {
        buttons.forEach(btn => btn.classList.remove('active'));
        buttons[index].classList.add('active');
    }
});

//On click behaviour
buttons.forEach((btn, index) => {
    btn.addEventListener('mousedown', () => {
        sections[index].scrollIntoView({ behavior: 'smooth' });
        buttons.forEach(b => b.classList.remove('active')); // changed variable name
        btn.classList.add('active'); // reference the clicked button
    });
});


window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + window.innerHeight / 2; 
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        sections.forEach((section, index) => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;

            if (scrollPos >= top && scrollPos < bottom && index !== currentSection) {
                currentSection = index; 
                buttons.forEach(btn => btn.classList.remove('active'));
                buttons[index].classList.add('active');
                fg2.style.backgroundImage = backgrounds[index];
                fg2.style.opacity = 1;
                fg.style.opacity = 0;
                setTimeout(() => {
                    fg.style.backgroundImage = backgrounds[index];
                    fg.style.opacity = 1;
                },400);
            }
        });
    }, 10);
});


