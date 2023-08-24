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


for (const img of imgs)
  img.src = await loadImg();




async function generateLeftSlide() {

  imgs[0].scrollIntoView();
  const img = document.createElement('img');
  img.src = await loadImg();
  carousel?.prepend(img);
  imgs[2].remove();
}
async function generateRightSlide() {

  imgs[2].scrollIntoView();
  const img = document.createElement('img');
  img.src = await loadImg();
  carousel?.appendChild(img);
  imgs[0].remove();
}

prev.addEventListener('click', generateLeftSlide);

next.addEventListener('click', generateRightSlide);

/*
function viewable(element: HTMLImageElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= innerHeight &&
    rect.right <= innerWidth
  );
}

// on scroll load new slide
carousel?.addEventListener('scroll', () => {
  setTimeout(() => {
    if (viewable(imgs[1]))
      return;
    if (viewable(imgs[0]))
      generateLeftSlide();
    if (viewable(imgs[2]))
      generateRightSlide();
  }, 1000);
})
*/