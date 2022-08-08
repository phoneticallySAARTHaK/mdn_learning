const worker = new Worker("./generate.js");

const genBtn = document.querySelector("#generate");

genBtn.addEventListener("click", () => {
  const quota = document.querySelector("#quota").value;
  worker.postMessage({
    command: "generate",
    quota: quota,
  });
});

worker.addEventListener('message', (message) => {
    document.querySelector('#output').textContent = `Finished: ${message.data}`
})

document.querySelector("#reload").addEventListener('click', () => {
    document.querySelector('user-input').value() = "Try typing bitch"
    document.location.reload()
})