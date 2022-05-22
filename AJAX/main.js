const aliceTumbling = [
    { transform: 'rotate(0) scale(1)' },
    { transform: 'rotate(360deg) scale(0)' }
  ];
  
  const aliceTiming = {
    duration: 2000,
    iterations: 1,
    fill: 'forwards'
  }
  
  const alice1 = document.querySelector("#alice1");
  const alice2 = document.querySelector("#alice2");
  const alice3 = document.querySelector("#alice3");

  async function animation(alice) {
    return alice.animate(aliceTumbling, aliceTiming).finished;
  }

async function animateAlice() {
    await animation(alice1);
    await animation(alice2);
    animation(alice3);
}

animateAlice();