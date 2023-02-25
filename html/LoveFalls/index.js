class KissEffect {
  kisses = [];
  constructor() {
    this.createKisses(100);
  }

  async createKisses(count) {

    for (let i = 0; i < count; i++) {
      if (i % 2 === 0) {
        await this.sleep(150);
      }
      this.createKissAndPlay();
    }

    await this.sleep(8000)
    this.removeKisses();
  }

  sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time))
  }

  createRandom(min, max) {
    const d = max - min;
    const random = Math.random() * d + min;
    return random;
  }

  async createKissAndPlay() {
    const baseSize = 40;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const x = this.createRandom(0, screenWidth - baseSize);
    const y = -(baseSize + 30);
    const size = this.createRandom(baseSize - 10, baseSize + 10);
    const duration = this.createRandom(2, 6);
    const delay = this.createRandom(0, 1);
    const kiss = this.createKiss(size, x, y, duration, delay);

    await this.sleep(100);
    const newY = screenHeight + 100 + 'px';
    const newX = this.createRandom(-100, 100) + 'px';
    kiss.style.transform = `translate(${newX}, ${newY})`;
    await this.sleep((duration + delay)* 1000)
    // this.removeKiss(kiss);
  }

  createKiss(size, x, y, duration, delay) {
    const kiss = document.createElement('div');
    kiss.className = 'kiss';
    kiss.innerHTML = '😘'
    Object.assign(kiss.style, {
      position: 'fixed',
      left: x + 'px',
      top: y + 'px',
      fontSize: size + 'px',
      transition: 'all linear',
      transitionDuration: duration + 's',
      transitionDelay: delay + 's',
      zIndex: '100000000'
    })
    document.body.appendChild(kiss);
    return kiss;
  }

  // removeKiss(kiss) {
  //   console.log('移除', kiss)
  //   kiss.parentElement.removeChild(kiss);
  // }

  removeKisses() {
    const kisses = document.getElementsByClassName('kiss');
    while(kisses.length) {
      const kiss = kisses[0];
      kiss.parentElement.removeChild(kiss);
    }
  }
}

document.addEventListener('click', () => {
  new KissEffect();
}, true);
