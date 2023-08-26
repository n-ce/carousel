import { applyTheme, themeFromImage } from '@material/material-color-utilities';
import './style.css';


const [settings, closeSettings, saveSettings, prev, next] = document.getElementsByTagName('button');
const carousel = document.querySelector('section');
const imgs = document.getElementsByTagName('img');

imgs[1].scrollIntoView();

let quality = 1;


const loadImg = async () => {
  if (!carousel) return;

  const dimension = Math.floor(carousel.clientWidth * devicePixelRatio / quality);

  return await fetch(`https://source.unsplash.com/random/${dimension}x${dimension}`)
    .then(data => data.url)
    .catch(err => err);
}



imgs[1].src = await loadImg();
imgs[0].src = await loadImg();
imgs[2].src = await loadImg();


async function generateLeftSlide() {
  imgs[0].scrollIntoView();
  const img = document.createElement('img');
  img.crossOrigin = 'anonymous';
  img.src = await loadImg();
  carousel?.prepend(img);
  imgs[2].remove();
  theme(isDarkTheme);
}
async function generateRightSlide() {
  imgs[2].scrollIntoView();
  const img = document.createElement('img');
  img.crossOrigin = 'anonymous';
  img.src = await loadImg();
  carousel?.appendChild(img);
  imgs[0].remove();
  theme(isDarkTheme);
}

prev.addEventListener('click', generateLeftSlide);

next.addEventListener('click', generateRightSlide);


const isDarkTheme = matchMedia('(prefers-color-scheme: dark)');

async function theme(dark: { matches: boolean }) {
  applyTheme(await themeFromImage(imgs[1]), { target: document.documentElement, dark: dark.matches });
}

theme(isDarkTheme);

isDarkTheme.addEventListener('change', theme);


// scrolling action 

carousel?.addEventListener('scroll', () => {
  if (imgs[0].getBoundingClientRect().left === carousel.getBoundingClientRect().left)
    generateLeftSlide();

  if (imgs[2].getBoundingClientRect().right < carousel.getBoundingClientRect().right)
    generateRightSlide();
});


// settings 

function settingsFx() {
  document.getElementById('settingsContainer')?.classList.toggle('hide');
  document.getElementById('overlay')?.classList.toggle('hide');
}

settings.addEventListener('click', settingsFx);

closeSettings?.addEventListener('click', settingsFx);

saveSettings.addEventListener('click', () => {
  const checkedElement = <HTMLInputElement>document.querySelector('input[name="pixelSelector"]:checked');
  quality = parseInt(checkedElement?.value);
  settingsFx();
})