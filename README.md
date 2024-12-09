# Creating a Runner

Run the following command in the terminal:  
`node createRunner {DAY}`

The {DAY} must be two digits long, so single digit days must be prepended with 0.

## Example
`node createRunner 03`

This will create a new folder "03" with the following files:
* input.txt
  * This file will be empty.
* runner.js
  * This runner's class name will be `DayThreeRunner`