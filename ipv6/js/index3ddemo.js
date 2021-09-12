var Index = function () {

  var leftLineChart = function () {
    var leftchart1 = echarts.init(document.getElementById('left-one-chart'));
    let index = 0;
    var legendData = ['unknown','http','https','tcpwrappend','sip','isakmp'];
    var getData =[121342883,105342883,80342891,43462883,21342883,14342883]
    var colorList = ['#56ff9a', '#9dffc6', '#11813c', '#49b373', '#15542d', '#0e391e'];
    option = {
      title: {
        text: 'PieChart',
        x: 85,
        y: 'center',
        textStyle: {
          fontSize: 20
        }
      },
      legend: {
        type: "scroll",
        orient: 'vertical',
        left: 260,
        top: 'middle',
        itemGap: 0,
        itemWidth: 16,
        itemHeight: 5,
        data: legendData,
        formatter: function(name) {
          for (var i = 0; i<legendData.length; i++) {
            if(name == legendData[i])
              return '{name|' + name+ '}{rate|' + getData[i].toLocaleString() + '}'
          }
        },
        textStyle: {
          rich: {
            name: {
              fontSize: 17,
              fontWeight: 400,
              height: 25,
              padding:[0,15,0,15],
              color:'#e5e8f2'
            },
            rate: {
              fontSize: 17,
              fontWeight: 400,
              height: 35,
              align:'right',
              color:'#29e874'
            },
          }
        }
      },
      tooltip: {
        trigger: 'item'
      },
      series: [{
        type: 'pie',
        center: ['130', '50%'],
        radius: ['45%', '56%'],
        clockwise: true,
        avoidLabelOverlap: true,
        hoverOffset: 26,
        emphasis:{
          itemStyle:{
            borderColor: '#13131c',
            borderWidth: 12,
            // shadowBlur: 15,
            // shadowColor: 'rgb(86 255 154 / 0.5)'
          }
        },
        itemStyle: {
          normal: {
            color: function(params) {
              return colorList[params.dataIndex]
            }
          }
        },
        label: {
          show: false
        },
        data: [{
          'name': 'unknown',
          'value': 121342883
        }, {
          'name': 'http',
          'value': 105342883
        }, {
          'name': 'https',
          'value': 80342891
        }, {
          'name': 'tcpwrappend',
          'value': 43462883
        }, {
          'name': 'sip',
          'value': 21342883
        },{
            'name': 'isakmp',
            'value': 14342883
        }],
      }]
    };
    leftchart1.setOption(option);
  }

  var leftTwoChart = function () {
    var leftchart2 = echarts.init(document.getElementById('left-two-chart'));
    var charts = { // 按顺序排列从大到小
      cityList: ['其他网络设备', '路由交换设备', '网络摄像头', '云服务资源', '物联网设备','安全防护设备', '网络打印机', '网络存储设备', '工业控制设备', '代理服务器'],
      cityData: [341211342, 337314359, 236784670, 184717261,  156646111, 123401353, 112636363, 81899153, 51685798, 21598821]
    }
    var top10CityList = charts.cityList;
    var top10CityData = charts.cityData;
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

  var rightLineChart = function () {
    var rightchart1 = echarts.init(document.getElementById('right-one-chart'));
    let data = [
      {
        name: "Windows",
        value: 341211342
      }, {
        name: "FortiOS",
        value: 287314359
      }, {
        name: "Liunx",
        value: 236784670
      }, {
        name: "IOS",
        value: 184717261
      },{
        name: "Unix",
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
    rightchart1.setOption(option);
  }

  var rightPieChart = function () {
    var rightchart2 = echarts.init(document.getElementById('right-two-chart'));
    let index = 0;
    var colorList = ['#15fecc', '#15ab8b', '#476660', '#324742', '#0d2e37', '#184c5a'];
    option = {
      title: {},
      tooltip: {
        trigger: 'item'
      },
      series: [{
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['0%', '45%'],
        clockwise: true,
        avoidLabelOverlap: true,
        hoverOffset: 20,
        emphasis:{
          itemStyle:{
            borderColor: '#13131c',
            borderWidth: 10
          }
        },
        itemStyle: {
          normal: {
            color: function(params) {
              return colorList[params.dataIndex]
            }
          }
        },
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
            length: 20,
            length2: 30,
            lineStyle: {
              width: 1,
              color: '#3f3f49'
            }
          }
        },
        data: [{
          'name': '8080',
          'value': 341211342
        }, {
          'name': '443',
          'value': 287314359
        }, {
          'name': '8081',
          'value': 236784670
        }, {
          'name': '7547',
          'value': 184717261
        }, {
          'name': '5060',
          'value': 156646111
        }, {
          'name': '22',
          'value': 156346111
        }],
      }]
    };
    rightchart2.setOption(option);
  }

  var right3PieChart = function () {
    var rightchart3pie = echarts.init(document.getElementById('right-three-pie'));
    var placeHolderStyle = {
      normal: {
        color: '#30303a',
      },
    };
    var legendData = ["严重","高危","中危"];
    var getData = [2643,93093,432643]
    option = {
      title: {},
      tooltip: {
        show: true,
        formatter: "{a}：{d}%"
      },

      legend: {
        type: "scroll",
        orient: 'vertical',
        left: '20',
        top: 'middle',
        itemGap: 25,
        itemWidth: 16,
        itemHeight: 4,
        data: legendData,
        formatter: function(name) {
          for (var i = 0; i<legendData.length; i++) {
            if (name === legendData[i]) {
              return `{name|${name}}{rate${i + 1}|${getData[i].toLocaleString()}}`
            }
          }
        },
        textStyle: {
          rich: {
            name: {
              fontSize: 17,
              fontWeight: 400,
              height: 25,
              padding:[0,15,0,15],
              color:'#e5e8f2'
            },
            rate1: {
              fontSize: 30,
              fontWeight: 400,
              height: 32,
              align:'right',
              color:'#f03c3b'
            },
            rate2: {
              fontSize: 30,
              fontWeight: 400,
              height: 32,
              align:'right',
              color:'#ff8134'
            },
            rate3: {
              fontSize: 30,
              fontWeight: 400,
              height: 32,
              align:'right',
              color:'#ffca56'
            },
          }
        }
      },

      series: [{
        name: '中危',
        type: 'pie',
        hoverAnimation: false, //鼠标移入变大
        clockWise: false,
        center: ['400', '50%'],
        radius: ['100', '92'],
        itemStyle: {
          normal: {
            color: '#feca5a',
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        },
        data: [{
          value:50,
          name: 'invisible',
          itemStyle: placeHolderStyle
        },{
            value:50,
            name: '中危'
          }],
      },
        {
          name: '高危',
          type: 'pie',
          clockWise: false,
          hoverAnimation: false, //鼠标移入变大
          center: ['400', '50%'],
          radius: ['78', '70'],
          itemStyle: {
            normal: {
              color: '#fe8336',
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          data: [{
            value: 60,
            name: 'invisible',
            itemStyle: placeHolderStyle
          },{
              value: 40,
              name: '高危'
            }]
        },
        {
          name: '严重',
          type: 'pie',
          clockWise: false,
          hoverAnimation: false, //鼠标移入变大
          center: ['400', '50%'],
          radius: ['58', '50'],
          itemStyle: {
            normal: {
              color: '#f03d39',
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          data: [{
            value: 70,
            name: 'invisible',
            itemStyle: placeHolderStyle
          }, {
              value: 30,
              name: '严重'
            }]
        }
      ]
    };
    rightchart3pie.setOption(option);
  }

  var rightBarChart = function () {
    var rightchart3 = echarts.init(document.getElementById('right-three-chart'));
    option = {
      color: ["#ffca59", "#ff8234", "#f03c3b"],
      title: {
      },
      // tooltip: {
      //   trigger: 'axis',
      //   axisPointer: { type: 'shadow' }
      // },
      legend: {
        show: false
      },
      grid: {
        top: 30,
        bottom: 80,
        left: 60,
        right: 0
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        axisLine: {
          lineStyle: {
            color: '#33343e'
          }
        },
        axisLabel: {
          show: true,
          rotate: 45,
          fontSize: 16,
          color: '#ced3dc'
        },
        data: ['路由交互设备', '网络摄像头', '云服务资源', '物联网设备', '安全防护设备', '网络打印机', '网络存储设备', '工业控制设备', '代理服务器', '其他']
      },
      yAxis: {
        name: "",
        nameTextStyle: { color: "#33343e", fontSize: 13 },
        type: 'value',
        splitLine: {
          lineStyle: { color: "#33343e", type: "solid" }
        },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: "rgb(229,232,242,0.2)",
          inside: true,
          margin:-40,
          padding: [10, 0, 0, 0],
          verticalAlign: "top",
          textStyle: {
            fontSize: 16,
            textAlign:'right'
          }
        },
      },
      series: [{
        name: "page1",
        type: 'bar',
        stack: 'all',
        barWidth: "14",
        itemStyle: {
          borderWidth: 3,
          borderColor: '#161521', //同背景色一样
        },
        data: [100000, 99000, 80000, 70000, 60000, 50000, 40000, 30000, 60000, 50000]
      }, {
        name: "page2",
        type: 'bar',
        stack: 'all',
        barWidth: "14",
        itemStyle: {
          borderWidth: 2,
          borderColor: '#161521', //同背景色一样
        },
        data: [90000, 80000, 70000, 60000, 50000, 40000, 30000, 20000, 40000, 20000]
      }, {
        name: "page3",
        type: 'bar',
        stack: 'all',
        barWidth: "14",
        itemStyle: {
          borderWidth: 2,
          borderColor: '#161521', //同背景色一样
        },
        data: [80000, 70000, 60000, 50000, 40000, 30000, 20000, 10000, 30000, 40000]
      }]
    };
    rightchart3.setOption(option);
  }

  var mapchart = function () {
    var mapCenterChart = echarts.init(document.getElementById('map-chart'));
    var ROOT_PATH = 'js/';
    $.getJSON(ROOT_PATH + '/population.json', function (data) {
      data = data.filter(function (dataItem) {
        return dataItem[2] > 0;
      }).map(function (dataItem) {
        return [dataItem[0], dataItem[1], (dataItem[2])];
      });
      // data1 = data.slice(28100, 28400);
      data2 = data.slice(0, 1000);
      data1 = geoLat;
      var option = {
        tooltip : {
          trigger: 'item',
          backgroundColor:'none',
          formatter: function (params) {
            // debugger
              var res = '';
              res += '<div class="threed-map-tip relative">';
              res += '<h3>' + params.name + '</h3><div class="value">' + params.value[2].toLocaleString() + '</div>';
              res += '</div>';
              return res;
          }
        },
        // dataRange: {
        //   min : 0,
        //   max : 500,
        //   calculable : true,
        //   show: false,
        //   color: ['maroon','purple','red','orange','yellow','lightgreen']
        // },
        globe: {
          baseTexture: ROOT_PATH + 'earch.jpeg',
          heightTexture: ROOT_PATH + 'bathymetry_bw_composite_4k.jpeg',
          shading: 'lambert',
          // environment: ROOT_PATH + 'starfield.jpeg',
          environment: '#13131D',
          light: {
            ambient: {
              color: '#2F4F4F',
              intensity: 0.2
            },
            main: {
              intensity: 0
            }
          },
          viewControl: {
            autoRotateDirection: 'ccw',
            autoRotateSpeed: 2,
            autoRotateAfterStill: 15,
            alpha: 25,
            beta: -150,
          },
          layers: [{
            type: 'blend',
            blendTo: 'emission',
            texture: ROOT_PATH + 'world.jpg'
          }]
        },
        // visualMap: {
        //   max: 10000000,
        //   calculable: true,
        //   realtime: false,
        //   inRange: {
        //     colorLightness: [0.2, 0.9]
        //   },
        //   textStyle: {
        //     color: '#fff'
        //   },
        //   controller: {
        //     inRange: {
        //       color: 'orange'
        //     }
        //   },
        //   outOfRange: {
        //     colorAlpha: 0
        //   }
        // },
        series: [
          {
            type: 'bar3D',
            coordinateSystem: 'globe',
            data: data1,
            barSize: 0.2,
            minHeight: 0.2,
            silent: true,
            itemStyle: {
              color: '#57fb97'
            },
            emphasis:{
                  label:{
                    show:true,
                  }
                },
          },
            {
          type: 'scatter3D',
          coordinateSystem: 'globe',
          distance:1000,
          emphasis:{
            label:{
              show:false,
            }
          },
          symbolSize : function (v){
            var num = 12;
            if(v[2]>0){
              num = 2
            }
            if(v[2]>10000){
              num = 5;
            }
            if(v[2]>100000){
              num = 7;
            }
            if(v[2]>1000000){
              num = 10;
            }
            if(v[2]>10000000){
              num = 13;
            }
            if(v[2]>100000000){
              num = 16
            }
            return num;
          },
          itemStyle: {
            color: '#47ff97',
            opacity: 1
          },
          label:{
            show:false
          },
          data: data1,
        },
        //   {
        //   type: 'bar3D',
        //   coordinateSystem: 'globe',
        //   bevelSmoothness:2,
        //   // symbol: 'image://images/3d-line-bar.png',
        //   // symbolSize: [12,174],
        //   blendMode: 'lighter',
        //   barSize: 0.2,
        //   minHeight:0.2,
        //   maxHeight:15,
        //   bevelSize:0.5,
        //   emphasis:{
        //     label:{
        //       show:false,
        //     }
        //   },
        //   itemStyle: {
        //     color: '#57fb97',
        //     opacity: 1
        //   },
        //   data: data2
        // }
        ]

      };
      mapCenterChart.setOption(option);
    });
  };

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
      rightLineChart();
      rightPieChart();
      right3PieChart();
      rightBarChart();
      animateScroll();
    }
  };
}();

jQuery(document).ready(function () {
  Index.init();
});
