## Electronic Rituals, Oracles and Fortune Telling

Meditation 4<br>
Assignment: Create a psychic “experiment” with your interpretation of an electronic equivalent of Zener Cards. Document your methodology and your results. (What is it possible to be “psychic” about in a digital context?)

Implementation: This project is my interpretation of extrasensory perception séance using color cards and audio. There are 20 prerecorded tones, where each tone is assigned to a particular color. A user is supposed to sense the sound and guess which tone represents the correct color card. After every turn, a new tone is being randomly selected. First, user clicks on PLAY button to hear the tone, then he/she should select the appropriate color card․ There are two counters that keep turns and correct answers. After the test is over user gets the result.   

---------------------------------

As an addition a custom random function is implemented which is to replace javascript Math.random(), which was used in the first verion of the program.

I use user mouse coordinates as a source of ramdom data. After some math operations randInRange() function is called to get an integer number from range [min, max]. Later this value is used in the program to ramdonly select a tune from the array.

<i>function randInRange(seed, min, max) {<br>
  return seed % (max + 1 - min) + min;<br>
}<br>
document.addEventListener("mousemove", function(event){<br>
  /* Get mouse corrdinates as a source of random events and perform some math */<br>
  mouseX = event.clientX;<br>
  mouseY = event.clientY;<br>
<br>
  totalXY += mouseX + mouseY;<br>
  seed = parseInt(((totalXY * totalXY) / 100 ) % 10000) ;<br>
});<br>
</i>
