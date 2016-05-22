/**
 * Created by huj on 21/05/16.
 */
var fs = require('fs'),
  path = require('path'),
  stream = fs.createReadStream('../app/data/FlightDelays.csv', 'utf8'),
  dataDirectory = 'temp', //'app/data'
  header = ['fl_date','origin','dest','crs_dep_time','arr_delay','crs_elapsed_time','distance'],
  parse = require('csv-parse'),
  parser = parse({ relax_column_count: true}),
  transform = require('stream-transform'),
  moment = require('moment');



console.log('hello');


if (fs.existsSync('../app/data/FlightDelays.csv')) {
  console.log('ok')

} else {
  console.log('Nok')
}

function createDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}
function createDayDirectory(dataDirectory){
  for (i =0; i < 7; i++) {
    var dir = path.join(dataDirectory, i.toString());
    createDirectory(dir);
    createSplitedFile(path.join(dir, i.toString() + '.csv'))
  }
}
var count = 0;
function handleEntry(row){
  var date = moment(row[0], "YYYY-MM-DD");
  if ( date.isValid() ) {
    var day = date.days().toString()
    var dirFile = path.join(dataDirectory, day, day + '.csv');
    fs.appendFile(dirFile, row.toString() +  '\n');
    count++;
  }

}
function finish(){
  console.log(count);
  console.log('END');
}

createDirectory(dataDirectory);
createDayDirectory(dataDirectory);
transformer = transform(handleEntry);
stream.pipe(parser).pipe(transformer);

stream.on('end', finish);


var data1 = ["2016-01-22","FLL","ATL","1245",44.00,116.00,581.00],
  data2 = ["2016-01-22","FLL","ATL","1245",44.00,116.00,581.00];


function createSplitedFile(path){
  fs.appendFile(path, header.toString() + '\n', function (err){
    if (err) {
      throw err;
    }
  });
}



