# Creating a Runner

Run the following command in the terminal to create a runner for the current day of the month:  
`node generate`

Use the `--day` argument to specify a specific day.
- The day must be between 1-31.

### Example
`node createRunner --day 3`

This will create a new folder "03" with the following files:
* input.txt
  * This file will be empty.
* runner.js
  * This runner's class name will be `DayThreeRunner`