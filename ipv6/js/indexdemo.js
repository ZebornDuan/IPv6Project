var Index = function () {

  var leftLineChart = function () {
    var leftchart1 = echarts.init(document.getElementById('left-one-chart'));
    const xAxisData = ["2020-05-11", "2020-05-12", "2020-05-13", "2020-05-14", "2020-05-15", "2020-05-16", "2020-05-17", "2020-05-18", "2020-05-19", "2020-05-20",
      "2020-05-21", "2020-05-22", "2020-05-23", "2020-05-24", "2020-05-25", "2020-05-26","2020-05-27", "2020-05-28", "2020-05-29", "2020-05-30", "2020-05-31",
      "2020-06-01", "2020-06-02", "2020-06-03", "2020-06-04", "2020-06-05", "2020-06-06", "2020-06-07", "2020-06-08", "2020-06-09", "2020-06-10"];
    const seriesData = [
        260, 58, 195, 229, 320, 211, 124, 131, 124, 360, 124, 78, 160, 604, 290, 720, 650, 532, 200, 320, 500, 230, 850, 420, 320, 230,120, 360, 450, 650, 325
    ];
    $("#date-left").text(xAxisData[0]);
    $("#total-left").text(seriesData[0]);
    option = {
      textStyle: {
        fontFamily: "Din-Light"
      },
      color: ["#57fb97"],
      title: {},
      legend: {
        data: [],
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none"
        },
        formatter:(value, index) => {
          $("#date-left").text(value[0].name);
          $("#total-left").text(value[0].value);
        }
      },
      grid: {
        left: 40,
        right: 40,
        top: 40,
        bottom: 50
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: xAxisData,
        axisLabel: {
          color: "#e5e8f2",
          padding: [15, 10, 0, 0],
          align:"left",
          textStyle: {
            fontSize: 16,
          },
          //X轴标签 label 做了特殊处理，防止左右溢出
          formatter: (value, index) => {
            return value.split('-')[1] +'-'+ value.split('-')[2];
          }
        },
        logBase:3,
        axisLine: {
          show: true,
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        name: "",
        type: "value",
        scale: true,
        axisLabel: {
          color: "rgb(229,232,242,0.2)",
          inside: true,
          margin:0,
          padding: [10, 0, 0, 0],
          verticalAlign: "top",
          textStyle: {
            fontSize: 16
          },
          showMinLabel:false,
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color:"#33343e"
          }
        },
        minInterval: 1,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },

      },
      series: [{
        name: "白起",
        data: seriesData,
        type: "line",
        smooth: true,
        smoothMonotone: "x",
        cursor: "pointer",
        showSymbol: false,
        lineStyle: {
          shadowColor: "rgba(18,61,172,0.5)",
          shadowBlur: 10
        }
      }]
    }
    leftchart1.setOption(option);
  }

  var leftTwoChart = function () {
    var leftchart2 = echarts.init(document.getElementById('left-two-chart'));
    var charts = { // 按顺序排列从大到小
      cityList: ['united states', '中国', 'russia', 'india', 'germany', 'canada', 'france', 'japan', 'italy', 'turkey'],
      cityData: [341211342, 337314359, 236784670, 184717261,  156646111, 123401353, 112636363, 81899153, 51685798, 21598821]
    }
    var top10CityList = charts.cityList
    var top10CityData = charts.cityData
    var color = ['#54ff97', '#54ff97', '#54ff97']
    var color1 = ['#54ff97', '#54ff97', '#54ff97']

    let lineY = []
    let lineT = []
    for (var i = 0; i < charts.cityList.length; i++) {
      var x = i
      if (x > 1) {
        x = 2
      }
      var data = {
        name: charts.cityList[i],
        color: color[x],
        value: top10CityData[i],
        barGap: '-100%',
        itemStyle: {
          normal: {
            show: true,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
              offset: 0,
              color: color[x]
            }, {
              offset: 1,
              color: color1[x]
            }], false)
          },
          emphasis: {
            shadowBlur: 15,
            shadowColor: 'rgba(0, 0, 0, 0.1)'
          }
        }
      }
      var data1 = {
        value: top10CityData[0],
        itemStyle: {
          color: '#21212c',
        }
      }
      lineY.push(data)
      lineT.push(data1)
    }

    option = {
      title: {
        show: false
      },
      tooltip: {
        trigger: 'item',
        formatter: (p) => {
          if (p.seriesName === 'total') {
            return ''
          }
          return `${p.name}<br/>${p.value}`
        }
      },
      grid: {
        borderWidth: 0,
        top: 30,
        left: 30,
        right: 0,
        bottom: 0
      },
      // color: color,
      yAxis: [{
        type: 'category',
        inverse: true,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          verticalAlign: 'bottom',
          align: 'left',
          padding: [1, 9, 15, -25],
          margin: 0,
          color: '#fff',
          fontSize: '16',
          formatter: (p, index) => {
            if(index<3)
              return '{index|' + (index + 1) + '} '
            else
              return '{index2|' + ' ' + '} '
          },
          rich: {
            index: {
              color: '#15fecc',
              fontSize: '12',
              backgroundColor: '#13131c',
              borderWidth:1,
              borderColor:'#15fecc',
              width: 14,
              height: 14,
              align: 'center',
            },index2: {
              color: '#15fecc',
              fontSize: '12',
              backgroundColor: '#13131c',
              width: 14,
              height: 14,
              align: 'center',
            }
          }
        },
        data: top10CityList
      }, {
        type: 'category',
        inverse: true,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          verticalAlign: 'bottom',
          align: 'right',
          padding: [0, 20, 15, 10],
          textStyle: {
            color: '#15ffcc',
            fontSize: '16',
          }
        },
        splitArea: {
          show: false
        },
        splitLine: {
          show: false
        },
        data: top10CityData
      },{
        type: 'category',
        position: "left",
        axisLine: {
          show: false
        },
        inverse: true,
        axisTick: {
          show: false
        },
        axisLabel: {
          interval: 0,
          color: ["#e5e8f2"],
          align: "left",
          verticalAlign: "bottom",
          fontSize: 20,
          padding: [0, 9, 15, 10],
        },
        data: top10CityList
      }
      ],
      xAxis: {
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        }
      },
      series: [{
        name: 'total',
        type: 'bar',
        zlevel: 1,
        barGap: '-100%',
        barWidth: '10px',
        data: lineT,
        barWidth: 6,
        legendHoverLink: false
      }, {
        name: 'bar',
        type: 'bar',
        zlevel: 2,
        barWidth: 6,
        data: lineY,
      }],
    }
    leftchart2.setOption(option);
  }

  var rightLineData = {
    '中国': {
      id:0,
      name:'中国',
      data:[260, 240, 300, 280, 350, 460, 400,500]
    },
    "USA": {
      id:1,
      name: "USA",
      data: [190, 220, 180, 240, 220, 280, 300,600]
    },
    "Europe": {
      id:2,
      name: "Europe",
      data: [50, 20, 35, 20, 160, 30, 60,80],
    },
    "Russia": {
      id:3,
      name: "Russia",
      data: [160, 100, 230, 120, 80, 100, 230,60],
    }
  };

  //各国现存活跃地址对比 点击
  jQuery(document).off('click', '.chart-line-select');
  jQuery(document).on('click', '.chart-line-select', function () {
    var thisname = $(this).text();
    var data = [];
    if($(this).hasClass("current")){
      $(this).removeClass("current");
    }else {
      $(this).addClass("current");
    }
    $(".chart-line-select.current").each(function (i,v) {
      data.push(rightLineData[$(v).text()])
    });
    rightLineChart(data);
  });

  var rightLineChart = function (retData) {
    var rightchart1 = echarts.init(document.getElementById('right-one-chart'));
    rightchart1.clear();
    var symbol = ['image://images/line-1-bg.png','image://images/line-2-bg.png','image://images/line-3-bg.png','image://images/line-4-bg.png'];
    const xAxisData = ["05-11", "05-12", "05-13", "05-14", "05-15", "05-16", "05-17","05-18"];
    var seriesData = [];
    for(var k in retData){
      var txtcolor = '#182224';
      if(k == 'Europe'){
        txtcolor = '#fff';
      }
      var elem = {
        name: retData[k].name,
        data: retData[k].data,
        type: "line",
        smooth: true,
        smoothMonotone: "x",
        cursor: "pointer",
        showSymbol: false,
        markPoint:{
          symbol:symbol[retData[k].id],
          symbolKeepAspect:'true',//支持缩放
          symbolSize:[56,24], //标注大小
          symbolOffset:['0','-80%'],//标注偏移位置
          z:-100,
          data:[{
            type: 'max',
            name: retData[k].name
          }],
          itemStyle: {
            normal: {
              label: {
                show: true,
                color:txtcolor,
                fontSize:14,
                fontWeight:'600',
                formatter: function(params) {
                  return params.name
                }
              }
            }
          }
        }
      };
      seriesData.push(elem);
    };

    option = {
      textStyle: {
        fontFamily: "Din-Light"
      },
      color: ["#57fb97","#62e5ff","#6156ff","#15ffcc"],
      title: {},
      legend: {
        data: [],
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none"
        },
        textStyle: {
          color: "#565656",
          lineHeight: 28
        },
        confine: true,
        padding: 12,
        extraCssText: "box-shadow: 0px 2px 8px 0px #cacaca;border-radius: 4px;opacity: 0.9;max-height: 100%;",
        formatter:(value, index) => {
          // debugger
        }
      },
      grid: {
        left: 40,
        right: 40,
        top: 40,
        bottom: 50
      },
      xAxis: {
        type: "category",
        boundaryGap: true,
        data: xAxisData,
        axisLabel: {
          // interval:2,
          color: "#e5e8f2",
          padding: [15, 0, 0, 0],
          align:"left",
          textStyle: {
            fontSize: 16,
          },
          //X轴标签 label 做了特殊处理，防止左右溢出
          formatter: (value, index) => {
            // if (index === 0 || index === xAxisData.length - 1) {
            //   return "";
            // }
            return value;
          }
        },
        logBase:3,
        axisLine: {
          show: true,
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        name: "",
        type: "value",
        scale: true,
        axisLabel: {
          color: "rgb(229,232,242,0.2)",
          inside: true,
          margin:0,
          padding: [10, 0, 0, 0],
          verticalAlign: "top",
          textStyle: {
            fontSize: 16
          },
          showMinLabel:false,
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color:"#33343e"
          }
        },
        minInterval: 1,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },

      },
      series: seriesData
    }
    rightchart1.setOption(option);
  }

  var rightPieChart = function () {
    var rightchart2 = echarts.init(document.getElementById('right-two-chart'));
    let data = [
      {
        name: "united states",
        value: 341211342
      }, {
        name: "中国",
        value: 287314359
      }, {
        name: "Russia",
        value: 236784670
      }, {
        name: "india",
        value: 184717261
      },{
          name: "gremany",
          value: 156646111
      }
    ]
    option = {
      color: [
        '#15ffcc',
        '#16ac8b',
        '#47665f',
        '#324742',
        '#0d2e37',
        '#d2d17c',
        '#5085f2',
        '#8d7fec',
        '#00b7ee',
        '#e75fc3'
      ],
      title: {
        text: '234213',
        x: 'center',
        y: 'center',
        textStyle: {
          color: '#15ffcc',
          fontSize: 22,
          fontWeight: 'normal'
        }
      },
      grid: {
        left: 'center',
        top: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      calculable: true,
      series: [{
        name: '分布',
        type: 'pie',
        roseType: 'area',
        radius: ['50%', '68%'],
        center: ['50%', '50%'],
        data: data,
        label: {
          fontSize: 17,
          rich: {
            a: {
              fontSize: 17,
              color: "#e5e8f2"
            },
            b: {
              fontSize: 17,
              lineHeight: 30,
              color: "#15ffcc"
            }
          },
          formatter: function(p) {
            return '{a|' + p.name + '}\n{b|' + p.value.toLocaleString() + '}'
          }
        },
        labelLine: {
          normal: {
            length: 15,
            length2: 25,
            lineStyle: {
              width: 1,
              color: '#3f3f49'
            }
          }
        },
      }]
    }
    rightchart2.setOption(option);
  }

  var rightBarChart = function () {
    var rightchart3 = echarts.init(document.getElementById('right-three-chart'));
    option = {
      grid: {
        top: 20,
        bottom: 90
      },
      legend: {
        show: false
      },
      tooltip: {},
      xAxis: [{
        type: 'category',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#33343e'
          }
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          rotate: 45,
          fontSize: 18,
          color: '#ced3dc'
        },
        data: ['united states', '中国', 'russia', 'india', 'germany', 'canada', 'france', 'japan', 'italy', 'turkey']
      }],
      yAxis: [{
        type: 'value',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          fontSize: 18,
          color: '#15ffcc',

        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#33343e',
            width: 1,
            type: 'solid'
          }
        }
      }],
      series: [
        {
          name: 'IPv6地址BGP分布',
          type: 'bar',
          data: [2000, 1800, 1600, 1400, 1200, 1000, 800, 600,400,200],
          barMaxWidth: 23,
          itemStyle: {
            normal: {
              color: function(params) {
                var colorList = [
                  '#15fdca', '#15efc1', '#13ddb4', '#13caa6', '#12b195',
                  '#119882', '#107e70', '#0f665f', '#0e4f4e', '#0e3e43'
                ];
                return colorList[params.dataIndex]
              }
            }
          },
        }
      ]
    };
    rightchart3.setOption(option);
  }

  var mapchart = function () {
    var mapCenterChart = echarts2.init(document.getElementById('map-chart'));
    var option = {
      tooltip : {
        trigger: 'item',
        formatter: function (params) {
          if(params.seriesName == 'Top5'){
            var detail = params.data;
            var res = '';
            res += '<a style="display: block;width: 200px;color: white; position: relative; text-decoration: none;" href="#">';
            res += '<h3 style="border-bottom: 1px white dashed; padding-bottom: 10px;font-weight: normal;font-size:20px;">' + params.name + '</h3>';
            res += '<div style="margin-top: 2px;">' + '攻击流量:' + detail.value + '</div>';
            res += '<div style="position: absolute; font-size: 10px;right:0; margin-top: 5px;"></div></a>';
            return res;
          }else{
            return params.name;
          }
        }
      },
      dataRange: {
        min : 100,
        max : 800,
        calculable : true,
        show: false,
        color: ['#15151e','#13131c','#212131','#1e1e2d','#181824','#1c1c29','#242436','#28283b']
      },
      toolbox: {
        show : false,
      },
      series : [
        {
          name: '世界',
          type: 'map',
          zlevel: 1,
          geoIndex:0,
          mapType: 'world',
          hoverable: false,
          showLegendSymbol: true,
          roam: false,
          data : [
            { name: 'United States of America', value: 200, 'tip':false },
              { name: "China", value: 400, 'tip':false},
              { name: 'Canada', value: 100, 'tip':false},
              { name: 'India', value: 400, 'tip':false },
              { name: 'Mongolia', value: 300, 'tip':false },
              { name: "Mexico", value: 400, 'tip':false },
              { name: "Brazil",  value: 400, 'tip':false },
              { name: "Saudi Arabia", value: 300, 'tip':false },
              { name: "Sudan", value: 400, 'tip':false },
              { name: "Oman", value: 300, 'tip':false },
              { name: "Yemen", value: 300, 'tip':false },
              { name: "Egypt", value: 400, 'tip':false },
              { name: "Ethiopia", value: 500, 'tip':false },
              { name: "Eritrea", value: 500, 'tip':false },
              { name: "Somalia", value: 500, 'tip':false },
              { name: "Somaliland", value: 500, 'tip':false },
              { name: "Libya", value: 500, 'tip':false },
              { name: "Algeria", value: 200, 'tip':false },
              { name: "Chad", value: 300, 'tip':false },
              { name: "Niger", value: 600, 'tip':false },
              { name: "Botswana", value: 700, 'tip':false },
              { name: "Zimbabwe", value: 800, 'tip':false },
              { name: "Zambia",  value: 400, 'tip':false },
              { name: "Angola", value: 300, 'tip':false },
              { name: "South Africa", value: 400, 'tip':false },
              { name: "Mozambique", value: 300, 'tip':false },
              { name: "Namibia",  value: 500, 'tip':false },
              { name: "Morocco", value: 300, 'tip':false },
              { name: "Central African Repulic", value: 500, 'tip':false },
              { name: "Pakistan", value: 800, 'tip':false },
              { name: "Afghanistan", value: 400, 'tip':false },
              { name: "Turkmenistan", value: 500, 'tip':false },
              { name: "Kazakhstan", value: 200, 'tip':false }
          ],
          tooltip: {show: true},
          itemStyle: {
            normal:{
              borderColor: '#3a3a4a',
              borderWidth:1.4,
              label:{show: true,textStyle:{color: 'rgb(229,232,242,0.3)', fontSize:8}},
              areaStyle:{ //地图背景色
                color: '#28283b',
              },
              fontSize: 8
            }
          },
          geoCoord: geoFactory
        },
        {
          name: 'Top5',
          zlevel: 2,
          type: 'map',
          mapType: 'world',
          data:[
            // {
            //   name: "China",
            //   value:95,
            //   selected:true,
            //   itemStyle: {
            //     normal:{
            //       borderColor: '#3a3a4a',
            //       borderWidth:2,
            //       label:{show: true,textStyle:{color: 'rgb(229,232,242,0.3)', fontSize:8}},
            //       areaColor:'#fff',
            //       areaStyle:{ //地图背景色
            //         color: '#28283b',
            //       },
            //       fontSize: 8
            //     }
            //   },
            // },

          ],
          markPoint : {
            symbol:'image://images/map-point.png',//标注样式
            symbolSize : function (v){
              var num = 0
              if(v>0){
                num = 2
              }
              if(v>10000){
                num = 4;
              }
              if(v>100000){
                num = 6;
              }
              if(v>1000000){
                num = 9;
              }
              if(v>10000000){
                num = 12;
              }
              if(v>100000000){
                num = 16
              }
              return num;
              // return 5 + v/1000 > 20 ? 20 : 5 + v/1000
            },
            effect : {
              // show: true,
              // shadowBlur: 0
            },
            label: {
              normal: {
                show: false,
              }
            },
            itemStyle: {
              normal: {
                label: { show: false },
                color:'#29e874'
              }
            },
            data : worldData
          }
        }
      ],

    };
    mapCenterChart.setOption(option);
  }

  var animateScroll = function () {
    var mDiv = $('#midScroll ul');
    var m_current = 0;
    var timer = self.setInterval(function(){
      m_current++;
      if(m_current>=3){
        m_current = 0;
        mDiv.css("top",0);
      }
      mDiv.animate({top: (0-m_current)*71});
    },3000);
  };

  return {
    init: function () {
      leftLineChart();
      leftTwoChart();
      mapchart();
      rightLineChart(rightLineData);
      rightPieChart();
      rightBarChart();
      animateScroll();
    }
  };
}();

jQuery(document).ready(function () {
  Index.init();
});
