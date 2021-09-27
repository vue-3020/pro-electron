const sqliteBetter = require("./sqliteBetter").DB;


// class Serv extends sqliteBetter {
//   constructor(file_name) {
//     super(file_name);
//   }
//   async getInfoAll(params) {
//     let arr = [{
//       key: "all_mat",
//       sql:
//         "select F_IMG3DURL, F_NAME AS mat_name, F_IMGURL AS mat_image , F_CODE AS mat_code from T_Mat",
//       param: [],
//     }
//     ]
//     console.log(77777,arr);
//     return await this.allIn(arr);
//   }
// }
// module.exports = Serv;

let path = require('path');
// let db = require("better-sqlite3")(path.join(__dirname, "../sqlite/SQliteDB.db"));
// console.log(3333, db);

const Database = require('better-sqlite3');
// const db = new Database(path.join(__dirname, "../sqlite/cldb.db"), { verbose: console.log });


//获取
// const row = db.prepare('select * from bc_site where scan_type_code=?').get(5)
// console.log(row);
//插入
// const row = db.prepare("insert into bc_site(comm_type, comm_type_code, mach_id, scan_type, scan_type_code, site_code, site_id, site_name, site_type, site_type_code) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
// row.run(9, 8, 7, 6, 5, 4, 3, 2, 1,10);


//更新
// const row = db.prepare("update bc_site set comm_type_code = ? where mach_id=?")
// row.run(6666, 7,);


