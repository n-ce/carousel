import { applyTheme, themeFromImage } from '@material/material-color-utilities';
import './style.css';


const [prev, next] = document.getElementsByTagName('button');
const carousel = document.querySelector('section');
const imgs = document.getElementsByTagName('img');

imgs[1].scrollIntoView();

const loadImg = async () => {
  if (!carousel) return;
  const dimension = Math.floor(carousel.clientWidth * devicePixelRatio / 5);

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



