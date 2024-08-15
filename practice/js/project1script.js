//Import functionality from other modules
import {count, increment} from './counter.js';

//Define variables

//Attach event listeners to elements
document.getElementById("voteBtn").addEventListener("click", upVote);

//STartup code that runs at or during page load

//Functions to define specific behaviours
function upVote(){
    //increment the count value
    increment();
    //code that runs when UpVote is clicked
    //print the value of count to the console
    console.log(count);
    //update the HTML to reflect the new counter value
    document.getElementById("voteValue").innerText = count;
}