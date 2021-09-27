var sqlite3 = require('sqlite3').verbose();

const {
  app,
  BrowserWindow,
  ipcRenderer,
  ipcMain
} = require('electron')
var db = new sqlite3.Database('./sqlite/cldb.db', (err) => {
  if (err) {
    return console.error(err.message);
  }

});
console.log(db);
//查询批次
ipcMain.on('getCheckbatchObj', function (event, arg) {
  let data = [
    { a1: 1, a2: 2, a3: 3, a4: 4, a5: 5, a6: 6, a7: 7, a8: 8, a9: 9, a11: 11 },
    { a1: 1, a2: 2, a3: 3, a4: 4, a5: 5, a6: 6, a7: 7, a8: 8, a9: 9, a11: 11 },
    { a1: 1, a2: 2, a3: 3, a4: 4, a5: 5, a6: 6, a7: 7, a8: 8, a9: 9, a11: 11 },
  ]
  var insertSqls = `insert into bc_site (comm_type, comm_type_code, mach_id, scan_type, scan_type_code, site_code, site_id, site_name, site_type, site_type_code) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
  db.serialize(function () {
    if (data.length > 0) {
      console.log(insertSqls);
      db.prepare(`DELETE FROM bc_site`).run();
      var stmt = db.prepare(insertSqls);
      for (var i = 0; i < data.length; i++) {
        stmt.run([data[i].a1, data[i].a2, data[i].a3, data[i].a4, data[i].a5, data[i].a6, data[i].a7, data[i].a8, data[i].a9, data[i].a11]);
      }
      event.sender.send('getCheckbatchObjBack', JSON.stringify('success'))
      stmt.finalize()
    }
  })

});





