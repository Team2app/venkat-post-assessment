const express = require('express')
const app = express()
const port = 3000

var fs = require('fs'); 
var parse = require('csv-parser');

app.get('/', (req, res) => {
   
var csvData=[];
fs.createReadStream('./data/students.csv')
    .pipe(parse({delimiter: ':'}))
    .on('data', function(csvrow) {
        //console.log(csvrow);
        csvData.push(csvrow);        
    })
    .on('end',function() {
      csvData.sort(objectComparisonCallback);
      const totalGrade = csvData.reduce((total, item) => parseInt(item.grade) + total, 0);
      var average = totalGrade/csvData.length;
      console.log("Sorted List of Students :",csvData);
      console.log("Average Grade of Students :",average);
    });
    res.send('Hello World!');
});

const objectComparisonCallback = (arrayItemA, arrayItemB) => {
if (arrayItemA.age < arrayItemB.age) {
    return -1
  }
  if (arrayItemA.age > arrayItemB.age) {
    return 1
  }
  return 0
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

