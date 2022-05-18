const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

const storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";

const s1 = `Willy the Goblin
Big Daddy
Father Christmas`;

const s2 = `the soup kitchen
Disneyland
the White House`;

const s3 = `spontaneously combusted
melted into a puddle on the sidewalk
turned into a slug and crawled away`;

const insertX = s1.split("\n");
const insertY = s2.split("\n");
const insertZ = s3.split("\n");

randomize.addEventListener('click', result);

function result() {

    let newStory = storyText;
    const xItem = randomValueFromArray(insertX);
    const yItem = randomValueFromArray(insertY);
    const zItem = randomValueFromArray(insertZ);
  
    newStory = newStory.replaceAll(":insertx", xItem);
    newStory = newStory.replaceAll(":inserty", yItem);
    newStory = newStory.replaceAll(":insertz", zItem);

  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replaceAll("Bob", name);
  }

  if(document.getElementById("uk").checked) {
    const weight = Math.round(300);
    const temperature =  Math.round(94);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}