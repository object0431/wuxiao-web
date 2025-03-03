<template>
  <div class="chart-date-picker">
    <!-- <el-radio-group v-model="dateType" size="mini" @change="handleChange">
      <el-radio-button label="date">日</el-radio-button>
      <el-radio-button label="week">周</el-radio-button>
      <el-radio-button label="month">月</el-radio-button>
      <el-radio-button label="year">年</el-radio-button>
    </el-radio-group> -->
    <el-date-picker :clearable="false" v-model="date" size="mini" :picker-options="{ 'firstDayOfWeek': 1 }" :type="dateType" :format="dateType==='week'?'yyyy 第 WW 周':null" :placeholder="dateType==='date'?'选择日':dateType==='week'?'选择周':dateType==='month'?'选择月':dateType==='year'?'选择年':''" style="width: 140px;vertical-align: middle" @change="handleChange"></el-date-picker>
  </div>
</template>
 
<script>
import { dateFormat } from "@/filters/index";
export default {
  name: "ChartDatePicker",
  props: {
    value: {
      type: Date,
    },
    type: {
      type: String,
      default: "week",
    },
  },
  data() {
    return {
      dateType: "",
      date: null,
    };
  },
  methods: {
    handleChange() {
      
      
      let obj = this.timeDifference(this.date, this.dateType);
      this.$emit("handleChangeTime", obj);
    },
    timeDifference() {
      let timeObj = {};
      let time = new Date(dateFormat(this.date, "yyyy-MM-dd")); // 可入参指定时间
      let year = time.getFullYear();
      let month = time.getMonth();
      let date = time.getDate(); // 获取日期
      let day = time.getDay(); // 获取周几，0-6，0表示周日
      let _day = day == 0 ? 7 : day;
      switch (this.dateType) {
        case "date":
          timeObj = {
            startTime: `${dateFormat(this.date, "yyyy-MM-dd")} 00:00:00`,
            endTime: `${dateFormat(this.date, "yyyy-MM-dd")} 23:59:59`,
          };
          break;
        case "week":
          // 获取周一日期
          var startDate = new Date(year, month, date - _day + 1);
          // 获取周日日期
          var endDate = new Date(
            new Date(startDate).getTime() + 6 * 24 * 3600 * 1000
          );
          timeObj = {
            startTime: `${dateFormat(startDate, "yyyy-MM-dd")} 00:00:00`,
            endTime: `${dateFormat(endDate, "yyyy-MM-dd")} 23:59:59`,
          };
          break;
        case "month":
          var startDate = new Date(year, month, 1);
          var endDate = new Date(year, month + 1, 0);
          timeObj = {
            startTime: `${dateFormat(startDate, "yyyyMM")}`,
            endTime: `${dateFormat(endDate, "yyyyMM")}`,
          };
          break;
        case "year":
          var startDate = new Date(year, 0, 1);
          var endDate = new Date(year, 12, 0);
          timeObj = {
            startTime: `${dateFormat(startDate, "yyyy")}`,
            endTime: `${dateFormat(endDate, "yyyy")}`,
          };
          break;
      }
      return timeObj;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.date = val;
      },
    },
    type: {
      immediate: true,
      handler(val) {
        if (val === this.dateType) {
          return;
        }
        this.dateType = val;
      },
    },
    date: {
      immediate: true,
      handler(val) {
        this.$emit("input", val);
      },
    },
    dateType: {
      immediate: true,
      handler(val) {
        if (val === this.type) {
          return;
        }
        this.$emit("update:type", val);
      },
    },
  },
};
</script>
 
<style lang="scss">
.chart-date-picker {
  .el-radio-button--mini .el-radio-button__inner {
    padding: 5px 15px;
  }
 
  .el-radio-button:first-child .el-radio-button__inner {
    border-radius: 15px 0 0 15px;
  }
 
  .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 0;
  }
 
  .el-input--mini .el-input__inner {
    height: 34px;
    line-height: 34px;
  }
 
  .el-input--mini .el-input__icon {
    line-height: 34px;
  }
 
  .el-input__inner {
    // border-left: none;
    // border-radius: 0 15px 15px 0;
  }
}
</style>
 
<style lang="scss" scoped>
.chart-date-picker {
}
</style>