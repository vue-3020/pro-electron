let fs = require("fs");
let path = require('path');
let sqlite = require("better-sqlite3")(path.join(__dirname, "../sqlite/cldb.db"));
console.log(55555,sqlite);
class DB {
  constructor(file_name) {
     //判断是否有这个数据库
    this.file_name = fs.existsSync(file_name) ? file_name : fs.openSync(file_name, "w");
    this.db = sqlite;
  }
  //插入和修改
  run(params = {}) {
    if (params.sql) {
      return new Promise((reslove, reject) => {
        if (params.param == null) {
          let stmt = this.db.prepare(params.sql);
          stmt.run();
          reslove({ state: true });
        }
        else if (params.param != null) {
          let stmt = this.db.prepare(params.sql);
          stmt.run(params.param);
          reslove({ state: true });
        }
      });
    }
  }
  exec(params = {}) {
    if (params.sql) {
      return new Promise(reslove => {
        this.db = require('better-sqlite3')(path.join(__dirname, '../sqlite/cldb.db'));
        var strs = new Array(); //定义一数组
        strs = params.sql.split(';');
        for (var i = 0; i < strs.length; i++) {
          let stmt = this.db.prepare(strs[i].toString());
          stmt.run();
        }
        reslove({ state: true });
      });
    }
  }
  //单条查询,DQL数据查询
  get(params = {}) {
    if (params.sql) {
      return new Promise((reslove, reject) => {
        let stmt = this.db.prepare(params.sql);
        const data = stmt.get(params.param);
        reslove({ state: true, app_data: data });
      });
    }
  }
  //全部查询,DQL数据查询
  all(params = {}) {
    if (params.sql) {
      return new Promise((reslove, reject) => {
        let stmt = this.db.prepare(params.sql);
        const data = stmt.all();
        reslove({ state: true, app_data: data });
      });
    }
  }

  /**
   * 多次查询全部数据
   */
  allIn(params = []) {
    if (params) {
      let PromiseList = [];
      for (let i = 0; i < params.length; i++) {
        PromiseList.push(
          new Promise((reslove, reject) => {
            this.db = require('better-sqlite3')(path.join(__dirname, '../sqlite/cldb.db'));
            let stmt = this.db.prepare(params[i].sql);
            const data = stmt.all(params[i].param);
            reslove(data);
          })
        );
      }
      return new Promise((reslove, reject) => {
        Promise.all(PromiseList).then(result => {
          let list = {};
          for (let i = 0; i < params.length; i++) {
            list[params[i].key] = result[i];
          }
          list.state = true;
          reslove(list);
        });
      });
    }
  }
  //
  getIn(params = []) {
    if (params) {
      let PromiseList = [];
      for (let i = 0; i < params.length; i++) {
        PromiseList.push(
          new Promise((reslove, reject) => {
            let stmt = this.db.prepare(params[i].sql);
            const data = stmt.get(params[i].param);
            reslove(data);
          })
        );
      }
      return new Promise((reslove, reject) => {
        Promise.get(PromiseList).then(result => {
          let list = {};
          for (let i = 0; i < params.length; i++) {
            list[params[i].key] = result[i];
          }
          list.state = true;
          reslove(list);
        });
      });
    }
  }
  close() {
    this.db.close();
  }

}
exports.DB = DB;