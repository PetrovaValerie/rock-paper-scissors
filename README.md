Itra project N3
<!-- DESCRIPTION -->
## Description
• Script that implements RPC game with the supports of arbitrary odd number of arbitrary combinations. Launched with command line parameters (arguments to the process.argv in Node.js). Accepts an odd N of >=3 non-repeating strings (the passed strings are moves)
<hr/>
• Winning alrorithm: the half of the next moves in the circle wins, half of the previous moves in the circle lose
<hr/>
• The script generates a cryptographically strong random key with a length of at least 256 bits, makes computes move, calculates HMAC from the own move with the generated key, displayed the HMAC to the user. After that the user gets "menu" 1 - Lizard, ...., 0 - Exit
<hr/>
⇒ The user makes his choice. The script shows hmac, who won, the move of the computer and the original key
