import { TweenMax, Power0, TimelineMax } from 'gsap';

const themeColors = {
  darker: '#252B33',
  dark: '#3A4451',
  cyan: '#5DE2F9',
  pink: '#FF6EA8',
};

const colors = {
  yellow: '#FFEB3B',
  red: '#F44336',
  purple: '#9C27B0',
  green: '#4CAF50',
  blue: '#2196F3',
};

const SPIN_DURATION = 36;

const getCoord = (index, num) => {
  const angPI = index * 360 / num * Math.PI / 180;
  const x = Math.cos(angPI) * 250;
  const y = Math.sin(angPI) * 250 + 250;
  return { x, y };
};

const wheelScene = function() {
  let points = [];
  for (let index = 0; index < 360; index++) {
    points.push(getCoord(index, 360));
  }
  points = [...points.slice(270), ...points.slice(0, 270)];
  const tl = new TimelineMax();
  tl.add('wheel-start');
  tl.add(wheelCartScene(points), 'wheel-start');
  tl.add(wheelLinesScene(), 'wheel-start');
  tl.add(wheelCirclesScene(), '0.8-=wheel-start');
  tl.add(wheelBaseScene(), '0.8-=wheel-start');
  tl.add(spinCartsScene(points), 'wheel-spin');
  tl.add(spinLinesScene(), 'wheel-spin');
  return tl;
};

const wheelCartScene = function(points) {
  const numberOfCarts = 8;
  let colorsCycle = Object.values(colors);
  while (colorsCycle.length < numberOfCarts) {
    colorsCycle = [...colorsCycle, ...colorsCycle];
  }
  const $cart = $('.wheel-cart');
  TweenMax.set($cart, { fill: colorsCycle[0] });
  for (let i = 1; i < numberOfCarts; i++) {
    $cart.clone().insertAfter($cart);
    TweenMax.set($cart, { fill: colorsCycle[i] });
  }
  const mult = 360 / numberOfCarts;
  return TweenMax.staggerTo(
    '.wheel-cart',
    1,
    {
      cycle: {
        bezier: function(index) {
          return {
            type: 'soft',
            values: points.slice(0, (index + 1) * mult),
          };
        },
      },
      transformOrigin: 'center 230px',
    },
    0.1
  );
};

const wheelLinesScene = function() {
  const numberOfWheels = 36;
  const $line = $('.wheel-line');
  for (let i = 0; i < numberOfWheels; i++) {
    $line.clone().insertAfter($line);
  }
  return TweenMax.staggerTo(
    '.wheel-line',
    1,
    {
      cycle: {
        rotation: function(index) {
          const angle = index * 360 / numberOfWheels;
          return `${angle}__cw`;
        },
      },
      transformOrigin: 'center bottom',
    },
    0.01
  );
};

const wheelCirclesScene = function() {
  return TweenMax.staggerFrom(
    '.wheel-circle',
    1.5,
    {
      scale: '0',
      transformOrigin: 'center center',
      ease: Elastic.easeOut.config(0.5, 0.4),
    },
    0.2
  );
};

const wheelBaseScene = function() {
  return TweenMax.from('.wheel-base', 1, {
    scale: '0.3',
    opacity: 0,
    transformOrigin: 'center top',
  });
};

const spinCartsScene = function(points) {
  const tl = new TimelineMax();
  const numberOfCarts = $('.wheel-cart').length;
  const mult = 360 / numberOfCarts;
  tl.add('spin-start');
  $('.wheel-cart').each(function(index) {
    const pointsAdjusted = [
      ...points.slice((index + 1) * mult),
      ...points.slice(0, (index + 1) * mult),
    ];
    tl.to(
      $(this),
      SPIN_DURATION,
      {
        bezier: {
          type: 'thru',
          values: pointsAdjusted,
        },
        ease: Power0.easeNone,
        repeat: -1,
      },
      'spin-start'
    );
  });
  return tl;
};

const spinLinesScene = function() {
  return TweenMax.to('.wheel-line', SPIN_DURATION, {
    rotation: '+=360',
    modifiers: {
      rotation: angle => angle % 360,
    },
    transformOrigin: 'center bottom',
    ease: Power0.easeNone,
    repeat: -1,
  });
};

const masterScene = new TimelineMax();
masterScene.add(wheelScene(), 'wheelScene');

export default masterScene;
