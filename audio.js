let card = document.querySelectorAll('.card');
let audioArr = document.querySelectorAll('.mainAudio');
console.log(audioArr, card);

card.forEach((eachcard, index) => {
  eachcard.addEventListener('mouseenter', () => {
    audioArr[index].play();
  });
  // eachcard.addEventListener('mouseleave', () => {
  //   audioArr[index].play();
  // });
});

// For not hovering the last card

// card.forEach((eachcard, index) => {
//   if (card.length - 1 !== index) {
//     eachcard.addEventListener('mouseenter', () => {
//       audioArr[0].play();
//     });
//     eachcard.addEventListener('mouseleave', () => {
//       audioArr[1].play();
//     });
//   }
// });
