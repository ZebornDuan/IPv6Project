var Index = function () {

  var getLeftOneData = function(){
    $.getJSON('js/json/3dleftone.json', function (data) {
      $("#port-selectbox ul").html('');
      if(Object.keys(data).length > 0){
        for(var k in data){
          $("<li>"+k+"</li>").appendTo( $("#port-selectbox ul")).each(function(){
            $.data($(this)[0], "retlist", data[k]);
          });
        };
        $("#portName").text(Object.keys(data)[0]);
        leftLineChart(data[Object.keys(data)[0]]);
      };
    });
  };
  
  jQuery(document).off('click', '#port-select');
  jQuery(document).on('click', '#port-select', function () {
    $(this).siblings("div#port-selectbox").stop().slideToggle("slow");
  });

  jQuery(document).off('click', '#port-selectbox li');
  jQuery(document).on('click', '#port-selectbox li', function () {
    var data = $(this).data("retlist");
    $("#portName").text($(this).text());
    $(this).parent().parent().slideToggle();
    leftLineChart(data);
  });

  var leftLineChart = function (data) {
    var radius = ['45%', '56%'];
    var fontSize = 17;
    var padding = [0,15,0,15];
    if($("body").width()<=3200 && $("body").width()>2560){
      radius = ['40%', '51%'];
      fontSize = 15;
      padding = [0,3,0,3];
    }
    if($("body").width()<=2560 && $("body").width()>1920){
      fontSize = 14;
      radius = ['45%', '56%'];
      padding = [0,3,0,3];
    }
    if($("body").width()<=1920){
      fontSize = 12;
      radius = ["35%","46%"];
      padding = [0,3,0,3];
    }
    var leftchart1 = echarts.init(document.getElementById('left-one-chart_3d'));
    var legendData = data.serviceKey;
    var getData =data.serviceData;
    var seriesData = []
    var colorList = ['#56ff9a', '#9dffc6', '#11813c', '#49b373', '#15542d', '#0e391e'];
    var totalnum = 0;
    for(var k=0;k<legendData.length;k++){
      seriesData.push({name:legendData[k],value:getData[k]});
      totalnum+=getData[k];
    };
    $('#perNum').text((getData[0] / totalnum * 100).toFixed()+'%');
    $('#perName').text(legendData[0]);
    option1 = {
      title: {},
      legend: {
        type: "scroll",
        orient: 'vertical',
        left: "50%",
        top: 'middle',
        itemGap: 0,
        itemWidth: 16,
        itemHeight: 5,
        data: legendData,
        formatter: function(name) {
          for (var i = 0; i<legendData.length; i++) {
            if(name == legendData[i]){
              return '{name|' + name+ '}{rate|' + getData[i].toLocaleString() + '}'
            }
          }
        },
        textStyle: {
          rich: {
            name: {
              fontSize: fontSize,
              fontWeight: 400,
              height: 25,
              padding:padding,
              color:'#e5e8f2'
            },
            rate: {
              fontSize: fontSize,
              fontWeight: 400,
              height: 35,
              align:'right',
              color:'#29e874'
            }
          }
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          // option1.title.text =params.name;
          // leftchart1.setOption(option1);
          $('#perNum').text((params.value / totalnum * 100).toFixed()+'%');
          $('#perName').text(params.name);
        }
      },
      series: [{
        type: 'pie',
        center: ['25%', '50%'],
        radius: radius,
        clockwise: true,
        avoidLabelOverlap: true,
        hoverOffset: 26,
        emphasis:{
          itemStyle:{
            borderColor: '#13131c',
            borderWidth: 12
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
        data: seriesData,
      }]
    };
    leftchart1.setOption(option1);
    window.addEventListener("resize",function(){
      leftchart1.resize();
    });
  }

  var leftTwoChart = function () {
    var fontSize = 20;
    var fontSize16 = 16;
    if($("body").width()<=1920){
      fontSize = 14;
      fontSize16 = 12;
    }
    if($("body").width()<=2560 && $("body").width()>1920){
      fontSize = 16;
      fontSize16 = 14;
    }
    var leftchart2 = echarts.init(document.getElementById('left-two-chart-3d'));
    $.getJSON('js/json/3dlefttwo.json', function (data) {
      if(data.category.length>0 && data.seriesData.length>0){
        var charts = { // 按顺序排列从大到小
          cityList: data.category,
          cityData: data.seriesData
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
            currnet:{name:top10CityList[i],value:top10CityData[i]},
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
                return `${p.data.currnet.name}<br/>${p.data.currnet.value}`
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
              fontSize: fontSize16,
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
                fontSize: fontSize16,
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
              fontSize: fontSize,
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
        window.addEventListener("resize",function(){
          leftchart2.resize();
        });
      }
    });
  }

  var rightLineChart = function () {
    var fontSize22 = 22;
    var fontSize17 = 17;
    if($("body").width()<=1920){
      fontSize22 = 16;
      fontSize17 = 13;
    }
    var rightchart1 = echarts.init(document.getElementById('right-one-chart-3d'));
    $.getJSON('js/json/3drightone.json', function (data) {
      if(data.seriesData.length>0){
        option = {
          color: [ '#15ffcc', '#16ac8b', '#47665f', '#324742', '#0d2e37','#d2d17c','#5085f2','#8d7fec','#00b7ee','#e75fc3'],
          title: {
            text: '234213',
            x: 'center',
            y: 'center',
            textStyle: {
              color: '#15ffcc',
              fontSize: fontSize22,
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
            name: '操作系统数量统计',
            type: 'pie',
            roseType: 'area',
            radius: ['50%', '68%'],
            center: ['50%', '50%'],
            data: data.seriesData,
            label: {
              fontSize: fontSize17,
              rich: {
                a: {
                  fontSize: fontSize17,
                  color: "#e5e8f2"
                },
                b: {
                  fontSize: fontSize17,
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
                length2: 20,
                lineStyle: {
                  width: 1,
                  color: '#3f3f49'
                }
              }
            }
          }]
        }
        rightchart1.setOption(option);
        window.addEventListener("resize",function(){
          rightchart1.resize();
        });
      };
    });
  }

  var rightPieChart = function () {
    var fontSize22 = 22;
    var fontSize17 = 17;
    var length = 50;
    var length2 = 20;
    if($("body").width()<=3200){
      fontSize22 = 18;
      fontSize17 = 14;
      length = 15;
      length2 = 15;
    }
    if($("body").width()<=1920){
      fontSize22 = 16;
      fontSize17 = 12;
      length = 15;
      length2 = 15;
    }
    var rightchart2 = echarts.init(document.getElementById('right-two-chart-3d'));
    $.getJSON('js/json/3drighttwo.json', function (data) {
      if(data.seriesData.length>0){
        var colorList = ['#15fecc', '#15ab8b', '#476660', '#324742', '#0d2e37', '#184c5a'];
        option = {
          title: {},
          tooltip: {
            trigger: 'item'
          },
          series: [{
            type: 'pie',
            center: ['50%', '52%'],
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
              fontSize: fontSize17,
              rich: {
                a: {
                  fontSize: fontSize17,
                  color: "#e5e8f2"
                },
                b: {
                  fontSize: fontSize17,
                  lineHeight: 25,
                  color: "#15ffcc"
                }
              },
              formatter: function(p) {
                return '{a|' + p.name + '}\n{b|' + p.value.toLocaleString() + '}'
              }
            },
            labelLine: {
              normal: {
                length: length,
                length2: length2,
                lineStyle: {
                  width: 1,
                  color: '#3f3f49'
                }
              }
            },
            data: data.seriesData,
          }]
        };
        rightchart2.setOption(option);
        window.addEventListener("resize",function(){
          rightchart2.resize();
        });
      }
    });
  }

  var right3PieChart = function () {
    var fontSize17 = 17;
    var fontSize30 = 30;
    var height = 32;
    if($("body").width()<=2560){
      fontSize30 = 18;
      fontSize17 = 12;
      height = 15;
    }
    var rightchart3pie = echarts.init(document.getElementById('right-three-pie'));
    $.getJSON('js/json/3drightthree.json', function (data) {
      if(data.cveData.nameData.length>0 && data.cveData.valueData.length){
        var totalnum = 0;
        var legendData = data.cveData.nameData;
        var getData = data.cveData.valueData;
        var seriesDataList = [];
        var radiusList = {"低危":['90%', '80%'],"中危":['70%', '60%'],"高危":['50%', '40%']};
        var seriescolor ={"低危":"#feca5a","中危":"#fe8336","高危":"#f03d39"};
        for(var i=0;i<data.cveData.valueData.length;i++){
          totalnum += data.cveData.valueData[i];
        }
        for(var k=0;k<data.cveData.nameData.length;k++){
          seriesDataList.push({
            name: data.cveData.nameData[k],
            type: 'pie',
            hoverAnimation: false, //鼠标移入变大
            clockWise: false,
            center: ['80%', '50%'],
            radius: radiusList[data.cveData.nameData[k]],
            itemStyle: {
              normal: {
                color: seriescolor[data.cveData.nameData[k]],
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            data: [{
              value:totalnum,
              name: 'invisible',
              itemStyle: {
                normal: {
                  color: '#30303a',
                }
              }
            },{
                value:data.cveData.valueData[k],
                name: data.cveData.nameData[k]
              }],
          });
        }
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
                  fontSize: fontSize17,
                  fontWeight: 400,
                  height: height,
                  padding:[0,15,0,15],
                  color:'#e5e8f2'
                },
                rate1: {
                  fontSize: fontSize30,
                  fontWeight: 400,
                  height: height,
                  align:'right',
                  color:'#f03c3b'
                },
                rate2: {
                  fontSize: fontSize30,
                  fontWeight: 400,
                  height: height,
                  align:'right',
                  color:'#ff8134'
                },
                rate3: {
                  fontSize: fontSize30,
                  fontWeight: 400,
                  height: height,
                  align:'right',
                  color:'#ffca56'
                },
              }
            }
          },
          series: seriesDataList
        };
        rightchart3pie.setOption(option);
        window.addEventListener("resize",function(){
          rightchart3pie.resize();
        });
      }
    });
  }

  jQuery(document).off('click', '.all-select-btn');
  jQuery(document).on('click', '.all-select-btn', function (event) {
    event.stopPropagation();
    $(this).children("div.selectbox").stop().slideToggle("slow");
  });

  jQuery(document).off('click', '#type-selectbox li');
  jQuery(document).on('click', '#type-selectbox li', function (event) {
    event.stopPropagation();
    $("#select-text").text($(this).text());
    $(this).parent().parent().slideToggle();
    getStatisticsData($(this).text());
  });

  var getStatisticsData = function(txt){
    $.getJSON('js/json/3drightthree.json', function (data) {
      var dataList =[];
      $("#type-selectbox ul").html('');
      if(data.typeStatisticsData.selectData.length==0) 
        return;
      for(var k=0;k<data.typeStatisticsData.selectData.length;k++){
        $("<li>"+data.typeStatisticsData.selectData[k]+"</li>").appendTo($("#type-selectbox ul"));
      }
      if(txt) 
        dataList = data.typeStatisticsData[txt];
      else
        dataList = data.typeStatisticsData[data.typeStatisticsData.selectData[0]];
      if(dataList.deviceList.length>0)
        rightBarChart(dataList);
    });
  };

  var rightBarChart = function (data) {
    var fontSize = 16;
    var bottom = 80;
    if($("body").width()<=1920){
      fontSize = 12;
      bottom = 60;
    };
    var rightchart3 = echarts.init(document.getElementById('right-three-chart-3d'));
    option = {
      color: ["#f03c3b","#ff8234","#ffca59"],
      title: {
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        show: false
      },
      grid: {
        top: 30,
        bottom: bottom,
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
          fontSize: fontSize,
          color: '#ced3dc'
        },
        data: data.deviceList
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
            fontSize: fontSize,
            textAlign:'right'
          }
        },
      },
      series: [{
        name: "高危",
        type: 'bar',
        stack: 'all',
        barWidth: "14",
        // itemStyle: {
        //   borderWidth: 1,
        //   borderColor: '#161521', //同背景色一样
        // },
        data: data.highList
      }, {
        name: "中危",
        type: 'bar',
        stack: 'all',
        barWidth: "14",
        // itemStyle: {
        //   borderWidth: 1,
        //   borderColor: '#161521', //同背景色一样
        // },
        data: data.middleList
      }, {
        name: "低危",
        type: 'bar',
        stack: 'all',
        barWidth: "14",
        // itemStyle: {
        //   borderWidth: 1,
        //   borderColor: '#161521', //同背景色一样
        // },
        data: data.lowList
      }]
    };
    rightchart3.setOption(option);
    window.addEventListener("resize",function(){
      rightchart3.resize();
    });
  }

  jQuery(document).off('click', '#3dmap');
  jQuery(document).on('click', '#3dmap', function () {
    $(this).addClass("current").css("border-right","1px solid #15f1c1").css("border-left","1px solid #15f1c1");
    $("#worldmap").removeClass("current").css("border-left","0");
    mapchart3d();
  });

  jQuery(document).off('click', '#worldmap');
  jQuery(document).on('click', '#worldmap', function () {
    $(this).addClass("current").css("border-left","1px solid #15f1c1");
    $("#3dmap").removeClass("current").css("border-left","1px solid #373b47").css("border-right","0");
    mapchart();
  });
  var mapname = '';
  var mapchart = function () {
    $("#map-chart").css("height",$(".m-left").height());
    var mapCenterChart = echarts2.init(document.getElementById('map-chart'));
    $.getJSON('js/json/worldmap.json', function (data) {
      var option = {
        tooltip : {
          trigger: 'item',
          backgroundColor:'rgb(255,255,255,0)',
          formatter: function (params) {
            var detail = params.data; 
            if(detail.value!='' && detail.value!='-' && detail.tip!=false){
              var res = '';
              res += '<div class="threed-map-tip relative">';
              res += '<h3>' + params.name + '</h3><div class="value">' + detail.value.toLocaleString() + '</div>';
              res += '</div>';
              return res; 
            }
            return ''
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
            geoCoord: data.latlon
          },
          {
            name: 'Top5',
            zlevel: 2,
            type: 'map',
            mapType: 'world',
            data:[],
            markPoint : {
              symbol:'image://images/map-point.png',//标注样式
              symbolSize : function (v){
                var num = 0
                if(v>0) num = 2;
                if(v>10000)  num = 4;
                if(v>100000) num = 6;
                if(v>1000000) num = 9;
                if(v>10000000) num = 12;
                if(v>100000000) num = 16
                return num;
              },
              effect : {},
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
              data : data.seriesData
            }
          }
        ]
      };
      mapCenterChart.setOption(option);
      mapCenterChart.on(echarts2.config.EVENT.CLICK, function (param) {
        var p_name = param.name.toLowerCase();
        var current_name = option.series[0].mapType;
        if (p_name == '南海诸岛') return;
        if (current_name == 'world' && p_name != 'china') return;
        try {
          if (mapname == '台湾') p_name = 'world';
          if (mapname == '' && p_name == '台湾') {
            mapname = '台湾';
          } else {
            mapname = '';
          }
          option.series[0].mapType = p_name;
          option.series[1].mapType = p_name;
          mapCenterChart.clear();
          mapCenterChart.setOption(option, true);
        } catch (err) {
          option.series[0].mapType = 'world';
          option.series[1].mapType = 'world';
          mapCenterChart.clear();
          mapCenterChart.setOption(option, true);
        }
      });
      window.addEventListener("resize",function(){
        mapCenterChart.resize();
      });
    });
  }

  var mapchart3d = function () {
    $("#map-chart").css("height",$(".threed-m-left").height()-200);
    var mapCenterChart = echarts.init(document.getElementById('map-chart'));
    $.getJSON('js/json/3dmap.json', function (data) {
      var option = {
        tooltip : {
          trigger: 'item',
          backgroundColor:'none',
          formatter: function (params) {
              var res = '';
              res += '<div class="threed-map-tip relative">';
              res += '<h3>' + params.name + '</h3><div class="value">' + params.value[2].toLocaleString() + '</div>';
              res += '</div>';
              return res;
          }
        },
        globe: {
          baseTexture: 'images/earch.jpeg',
          heightTexture: 'images/bathymetry_bw_composite_4k.jpeg',
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
            texture: 'images/world.jpg'
          }]
        },
        series: [
          {
            type: 'bar3D',
            coordinateSystem: 'globe',
            data: data,
            barSize: 0.2,
            minHeight: 0.2,
            silent: true,
            itemStyle: {
              color: '#57fb97'
            },
            emphasis:{
              label:{show:true}
            }
          },{
            type: 'scatter3D',
            coordinateSystem: 'globe',
            distance:1000,
            emphasis:{
              label:{show:false}
            },
            symbolSize : function (v){
              var num = 0;
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
            data: data
          }
        ]
      };
      mapCenterChart.setOption(option);
      window.addEventListener("resize",function(){
        mapCenterChart.resize();
      });
    });
  };

  var scroll = function(){
    m_current++;
      if(m_current >= $('#midScroll li').length){
        m_current = 0;
        $('#midScroll ul').css("top",0);
      }
      $('#midScroll ul').animate({top: (0-m_current)*$('#midScroll li').height()});
  };

  var timer = null;
  var m_current = 0;
  var animateScroll = function () {
    timer = self.setInterval(function(){
      scroll();
    },3000);
  };

  var getTotalData = function(){
    $.getJSON('js/json/totalnum.json', function (data) {
      $('#total').text(data.total.toLocaleString());
      $('#todayTotal').text(data.todayTotal.toLocaleString());
      for(var k=0;k<data.scrollData.length;k++){
        $("<li><i></i><span>"+data.scrollData[k].datetime+"</span><span class='paddingLeft25'>"+data.scrollData[k].desc+"</span></li>").appendTo($("#midScroll ul"));
      };
      animateScroll();
    });
  };

  document.addEventListener('visibilitychange',function(){
    if(document.visibilityState == 'hidden') {
      window.clearTimeout(timer);
    }else{
      timer = setInterval(function(){
        scroll();
    },3000);
    }
  });

  $(".nicescroll").niceScroll({
    cursorwidth:0,
    cursorcolor:'rgb(75, 77, 97)',//滑块颜色设置
    cursorborder:'none',
    cursorborderradius:10,//滑块弧度设置
    autohidemode:'leave'
  });  

  $(".nicescroll1").niceScroll({
  cursorwidth:5,
    cursorcolor:'rgb(75, 77, 97)',//滑块颜色设置
    cursorborder:'none',
    cursorborderradius:10,//滑块弧度设置
    autohidemode:'leave'
  });  

  jQuery(document).off('click', '#refresh');
  jQuery(document).on('click', '#refresh', function () {
    startLoad();
    var txt = $("#center-middle-list>div.current").attr("res");
    if(txt=="3d"){
      mapchart3d();
    }else{
      mapchart();
    }
  });

   //获取当前时间
	var getDate = function () {
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth()>=9 ?  (date.getMonth()+1) : "0"+(date.getMonth()+1);
		var getDate = date.getDate()>9 ? date.getDate() : "0"+date.getDate();
		var hour = date.getHours()>9 ? date.getHours() : "0"+date.getHours();
		var min =date.getMinutes()>9 ? date.getMinutes() : "0"+date.getMinutes();
		$("#head-date").text(year+"-"+month+"-"+getDate);
	};

  var startLoad = function(){
    getTotalData();
    getLeftOneData();
    leftTwoChart();
    rightLineChart();
    rightPieChart();
    right3PieChart();
    getStatisticsData();
    getDate();
  };

  return {
    init: function () {
      startLoad();
      mapchart3d();
    }
  };
}();

jQuery(document).ready(function () {
  Index.init();
});
