var mysql = require('mysql');

var pool = mysql.createPool({
  user     : 'root',
  password : '12345NR',
  host     : 'localhost',
  port     :  3000,
  database : 'bank_account'
});
 
// connection.connect(function(err) {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }
   
//     console.log('connected as id ' + connection.threadId);
//   });
 
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
 
// connection.end();

module.exports={pool}