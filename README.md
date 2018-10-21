# Javascript Crossword Fitter

This code tries to fill all the blank spaces in the crossword puzzle with the provided hints. 

The crossword is a _(square)_ matrix with `+` indicating blocked cells and `-` indicating available blank spaces.\
And, hints are `;` delimited string.

**Eg.**

### Input:

1. Crossword\
+-++++++++\
+-++++++++\
+-++++++++\
+-----++++\
+-+++-++++\
+-+++-++++\
+++++-++++\
++------++\
+++++-++++\
+++++-++++

2. Hints\
"LONDON;DELHI;ICELAND;ANKARA"


### Output:

+L++++++++\
+O++++++++\
+N++++++++\
+DELHI++++\
+O+++C++++\
+N+++E++++\
+++++L++++\
++ANKARA++\
+++++N++++\
+++++D++++

