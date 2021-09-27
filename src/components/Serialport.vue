<template>
  <div class="hello">
    <h1>串口调试</h1>
    <el-button type="primary" @click="openCom2('COM2')">打开COM2</el-button>
    <el-button type="info" @click="closeCOM2">关闭COM2</el-button>
    <br>
    <br>
    <br>
    <el-button type="success" @click="openCom1('COM1')">打开COM1 监听2号发过来的消息</el-button>
    <el-button type="warning" @click="closeCOM1">关闭COM1</el-button>
  </div>
</template>
<script>
/* eslint-disable */
//引入 内容
// import iconv from 'iconv-lite'
import { openPort } from './Serialport/useSerialport'
import Serialport from 'serialport'
let com_2 = null
let com_1 = null
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      COM1: null,
      timer: null,
    }
  },
  methods: {
    //开启2号开关
    openCom2(port) {
      if (!com_2?.isOpen) { //这只办法学费
        try {
          var number = 1

          this.$message({
            message: '恭喜你，打开COM2',
            type: 'success'
          });

          //创建 对象
          com_2 = openPort(port)

          //清楚定时器
          clearInterval(this.timer)

          //定时器执行

          this.timer = setInterval(() => {
            com_2.write(`COM2发送的数据--COM1可以监听到 ${number}`)
            number++
          }, 1000)

        } catch (e) {
          //错误提示
          this.$message({
            message: '无法打开COM2，请检查是否在其他设备打开了COM2',
            type: 'success'
          });

        }
        return
      }
      this.$message({
        message: 'COM2已打开，请勿重复打开',
        type: 'warning'
      });
    },

    //关闭2号开关
    closeCOM2() {
      if (com_2?.isOpen) {

        com_2.close(() => { })

        this.$message({
          message: `关闭COM2 ${com_2.isOpen}`,
          type: 'success'
        });
        return
      }
      this.$message({
        message: 'COM2已关闭，请勿重复关闭',
        type: 'warning'
      });
    },


    //监听1号开关
    openCom1(port2) {
      if (!com_1?.isOpen) {

        this.$message({
          message: `打开COM1`,
          type: 'success'
        });

        //创建实例
        com_1 = openPort(port2)

        //判断2是否打开
        if (com_2?.isOpen) {
          com_1.on('readable', () => {
            this.$notify({
              title: '成功',
              message: `COM1接COM2的data：, ${com_1.read().toString()}`,
              type: 'success'
            });
          })
        } else {
          com_1.on('readable', () => {
            this.$notify({
              title: '成功',
              message: `COM1接COM2的data：, ${iconv.decode(com_1.read())},gbk`,
              type: 'success'
            });
          })
        }
        return
      }
      //判断
      this.$message({
        message: 'COM1已打开，请勿重复打开',
        type: 'warning'
      });
    },


    //关闭端口
    closeCOM1() {
      if (com_1?.isOpen) {
        this.$message({
          message: `关闭COM1, ${com_1.isOpen}`,
          type: 'success'
        });
        com_1.close(() => { })
        return
      }
      //判断
      this.$message({
        message: 'COM1已关闭，请勿重复关闭',
        type: 'warning'
      });
    },
  }
}
</script>


<style scoped>
</style>
