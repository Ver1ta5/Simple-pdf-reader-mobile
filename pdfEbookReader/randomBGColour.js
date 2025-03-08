export function randomBackgroundColour() {
  const colourAlphaNumeric = '0123456789ABCDEF'
  let colourCode = '#'

  for (i = 0; i < 6; i++) {
    // math.random get 0-1 multiply by 16 to 
    //get item closest colourAlphaNumeric ,floor to ensure it a valid index 
    colourCode += colourAlphaNumeric[Math.floor(Math.random() * 16)]
  }
  if (colourCode === '#FFFFFF') {
    colourCode = randomBackgroundColour()
  }

  return colourCode

}