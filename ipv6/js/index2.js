var Index = function () {
  var leftLineChart = function () {
    var fontSize = 16;
    if($("body").width()<=1920){
      fontSize = 12;
    }
    if($("body").width()<=2560 && $("body").width()>1920){
      fontSize = 16;
    }
    var leftchart1 = echarts.init(document.getElementById('left-one-chart'));
    $.getJSON('js/json/leftone.json', function (data) {
      if (data.xAxisData.length > 0 && data.seriesData.length > 0) {
        $("#date-left").text(data.xAxisData[0]);
        $("#total-left").text(data.seriesData[0].toLocaleString());
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
            formatter: (value, index) => {
              $("#date-left").text(value[0].name);
              $("#total-left").text(value[0].value.toLocaleString());
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
            data: data.xAxisData,
            axisLabel: {
              color: "#e5e8f2",
              padding: [15, 10, 0, 0],
              align: "left",
              textStyle: {
                fontSize: fontSize,
              },
              formatter: (value, index) => {
                return value.split('-')[1] + '-' + value.split('-')[2];
              }
            },
            logBase: 3,
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
              margin: 0,
              padding: [10, 0, 0, 0],
              verticalAlign: "top",
              textStyle: {
                fontSize: fontSize
              },
              showMinLabel: false,
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: "#33343e"
              }
            },
            minInterval: 1,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          series: [{
            name: "白起",
            data: data.seriesData,
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
        };
        leftchart1.setOption(option);
        window.addEventListener("resize",function(){
          leftchart1.resize();
        });
      }
    });
  }

  leftTwoChart = function () {
    var fontsize = 16;
    var fontsize1 = 20;
    if($("body").width()<=1920){
      fontsize = 13;
      fontsize1 = 13;
    }
    if($("body").width()<=2560 && $("body").width()>1920){
      fontsize = 15;
      fontsize1 = 18;
    }
    var leftchart2 = echarts.init(document.getElementById('left-two-chart'));
    $.getJSON('js/json/lefttwo.json', function (data) {
      if (data.cityList.length > 0 && data.cityData.length > 0) {
        var top10CityList = data.cityList;
        var top10CityData = data.cityData;
        var color = ['#54ff97', '#54ff97', '#54ff97'];
        var color1 = ['#54ff97', '#54ff97', '#54ff97'];
        let lineY = [];
        let lineT = [];
        for (var i = 0; i < top10CityList.length; i++) {
          var x = i;
          if (x > 1) x = 2;
          var data = {
            name: top10CityList[i],
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
          };
          var data1 = {
            value: top10CityData[0],
            currnet:{name:top10CityList[i],value:top10CityData[i]},
            itemStyle: {
              color: '#21212c',
            }
          };
          lineY.push(data);
          lineT.push(data1);
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
              fontSize: fontsize,
              formatter: (p, index) => {
                if (index < 3)
                  return '{index|' + (index + 1) + '} '
                else
                  return ''
              },
              rich: {
                index: {
                  color: '#15fecc',
                  fontSize: '12',
                  backgroundColor: '#13131c',
                  borderWidth: 1,
                  borderColor: '#15fecc',
                  width: 14,
                  height: 14,
                  align: 'center',
                }, index2: {
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
                fontSize: fontsize,
              }
            },
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: top10CityData
          }, {
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
              fontSize: fontsize1,
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
  };

  var getRightOneData = function(){
    $.getJSON('js/json/rightone.json', function (data) {
        var topFourList = {};
        $("#selectList").html('');
        $('<div class="select-searchbox boxSizing relative all-select-btn" style="width: 100px;">'+
        '<div id="country-select" class="smallSquare display-flex justify-content-space-between align-items-center">'+
        '<i></i><span>others...</span><span class="arrow-bottom"></span></div>'+
        '<div id="country-selectbox" class="selectbox" style="width: 100px;"><ul class="nicescrollright"></ul></div></div>').appendTo($("#selectList"));
        $(".nicescrollright").niceScroll({
          cursorwidth:5,
          cursorcolor:'rgb(75, 77, 97)',//滑块颜色设置
          cursorborder:'none',
          cursorborderradius:10,//滑块弧度设置
          autohidemode:'leave'
        });  
        $.data($("#right-one-chart")[0], "xAxisData", data.xAxisData);
        if(data.xAxisData.length>0){
          if(data.topFour.length == 0){
            data.topFour = Object.keys(data.seriesData).slice(0,4);
          }
          if(data.topFour.length>2) data.topFour.length =2;
          for(var k in data.seriesData){
            if(data.topFour.includes(k)){
              $('<div class="check-defalut current"><div><i></i>'+k+'</div></div>').prependTo($("#selectList")).each(function(){
                $.data($(this)[0], "retlist", data.seriesData[k]);
              });
              topFourList[k] = data.seriesData[k];
            }else{
              $('<li class="smallSquare"><i class="marginRight10"></i>'+data.seriesData[k].name+'</li>').appendTo($('#country-selectbox ul')).each(function(){
                $.data($(this)[0], "retlist", data.seriesData[k]);
              });
            }
          }
          rightLineChart(topFourList);
        }
    });
  };

  jQuery(document).off('click', '.all-select-btn');
  jQuery(document).on('click', '.all-select-btn', function (event) {
    event.stopPropagation();
    $(this).children("div.selectbox").stop().slideToggle("slow");
  });

  var getConntryData = function(){
    var data = {};
    $("#selectList div.check-defalut.current").each(function (i,v) {
      data[$(this).data("retlist").name]=$(this).data("retlist");
    });
    $("#country-selectbox li.current").each(function (i,v) {
      data[$(this).data("retlist").name]=$(this).data("retlist");
    });
    rightLineChart(data);
  };

  jQuery(document).off('click', '#country-selectbox li');
  jQuery(document).on('click', '#country-selectbox li', function (event) {
    event.stopPropagation();
    if($(this).hasClass("current")){
      $(this).removeClass("current");
    }else {
      $(this).addClass("current");
    };
    if($("#country-selectbox li.current").length>0){
      $("#country-select").addClass("current");
    }else{
      $("#country-select").removeClass("current");
    }
    getConntryData();
  });

  jQuery(document).off('click', '#selectList div.check-defalut');
  jQuery(document).on('click', '#selectList div.check-defalut', function () {
    if($(this).hasClass("current")){
      $(this).removeClass("current").addClass("smallSquare");
    }else {
      $(this).addClass("current").removeClass("smallSquare");
    }
    getConntryData();
  });

  $(window).click(function(){
    $(".selectbox").stop().slideUp("slow");
  });

  var rightLineChart = function (retData) {
    var fontSize = 16;
    if($("body").width()<=1920){
      fontSize = 12;
    }
    var rightchart1 = echarts.init(document.getElementById('right-one-chart'));
    rightchart1.clear();
    var symbol = [
      'image://images/line-1-bg.png','image://images/line-2-bg.png','image://images/line-3-bg.png','image://images/line-4-bg.png',
      'image://images/line-5-bg.png','image://images/line-6-bg.png','image://images/line-7-bg.png','image://images/line-8-bg.png',
      'image://images/line-9-bg.png','image://images/line-10-bg.png'
    ];
    var seriesData = [];
    var symbolSize= [];
    for(var k in Object.keys(retData)){
      var txtcolor = '#182224';
      if(k=='2'){
        txtcolor = '#fff';
      } 
      var symbolwidth = Object.keys(retData)[k].length * 9;
      if(symbolwidth < 56) symbolwidth = 56;
      symbolSize = [symbolwidth,24];
      var series = {
        name: retData[Object.keys(retData)[k]].name,
        data: retData[Object.keys(retData)[k]].data,
        type: "line",
        smooth: true,
        smoothMonotone: "x",
        cursor: "pointer",
        showSymbol: false,
        markPoint:{
          symbol:symbol[k],
          symbolKeepAspect:'true',//支持缩放
          symbolSize:symbolSize, //标注大小
          symbolOffset:['0','-80%'],//标注偏移位置
          z:-100,
          data:[{
            type: 'max',
            name: retData[Object.keys(retData)[k]].name
          }],
          itemStyle: {
            normal: {
              label: {
                show: true,
                color:txtcolor,
                fontSize:fontSize,
                fontWeight:'600',
                offset:[0,-2],
                formatter: function(params) {
                  return params.name
                }
              }
            }
          }
        }
      };
      seriesData.push(series);
    }
    option = {
      textStyle: {
        fontFamily: "Din-Light"
      },
      color: ["#57fb97","#62e5ff","#6156ff","#15ffcc","#d3adf7","#e8684a","#00b0ff","#f6bd17","#82b1ff","#01c853"],
      title: {},
      legend: {
        data: [],
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none"
        },
        confine: true
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
        data: $("#right-one-chart").data("xAxisData"),
        axisLabel: {
          color: "#e5e8f2",
          padding: [15, 0, 0, 0],
          align:"left",
          textStyle: {
            fontSize: fontSize,
          },
          formatter: (value, index) => {
            return value.split('-')[1] + '-' + value.split('-')[2];
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
            fontSize: fontSize
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
    window.addEventListener("resize",function(){
      rightchart1.resize();
    });
  }

  var getRightTwoData = function(){
    $.getJSON('js/json/righttwo.json', function (data) {
      $.data($("#right-two-chart")[0], "total", data.total);
      var topFourList = [];
      $('#right-2-select').html('');
      $('<div class="select-searchbox boxSizing relative all-select-btn" style="width: 100px;">'+
      '<div id="as-select" class="smallSquare display-flex justify-content-space-between align-items-center">'+
      '<i></i><span>others...</span><span class="arrow-bottom"></span></div>'+
      '<div id="as-selectbox" class="selectbox nicescroll" style="width: 100px;"><ul class="nicescrollright2"></ul></div></div>').appendTo($('#right-2-select'));
      $(".nicescrollright2").niceScroll({
        cursorwidth:5,
        cursorcolor:'rgb(75, 77, 97)',//滑块颜色设置
        cursorborder:'none',
        cursorborderradius:10,//滑块弧度设置
        autohidemode:'leave'
      }); 
      if(data.seriesData.length > 0){
        if(data.topFour.length == 0){
          for(var i=0;i<data.seriesData.length;i++){
            if(i<4) data.topFour.push(data.seriesData[i].name);
          }
        }
        if(data.topFour.length>2) data.topFour.length =2;
        for(var k=0;k<data.seriesData.length;k++){
          if(data.topFour.includes(data.seriesData[k].name)){
            $('<div class="check-defalut current"><div><i></i>'+data.seriesData[k].name+'</div></div>').prependTo($('#right-2-select')).each(function(){
              $.data($(this)[0], "retlist", data.seriesData[k]);
            });
            topFourList.push(data.seriesData[k]);
          }else{
            $('<li class="smallSquare"><i class="marginRight10"></i>'+data.seriesData[k].name+'</li>').appendTo($('#as-selectbox ul')).each(function(){
              $.data($(this)[0], "retlist", data.seriesData[k]);
            });
          }
        };
        rightPieChart(topFourList);
      }
    });
  };

  var getClickData = function(){
    var data = [];
    $("#right-2-select div.check-defalut.current").each(function (i,v) {
      data.push($(this).data("retlist"));
    });
    $("#as-selectbox li.current").each(function (i,v) {
      data.push($(this).data("retlist"));
    });
    rightPieChart(data);
  };

  jQuery(document).off('click', '#as-selectbox li');
  jQuery(document).on('click', '#as-selectbox li', function (event) {
    event.stopPropagation();
    if($(this).hasClass("current")){
      $(this).removeClass("current");
    }else {
      $(this).addClass("current");
    };
    if($("#as-selectbox li.current").length>0){
      $("#as-select").addClass("current");
    }else{
      $("#as-select").removeClass("current");
    }
    getClickData();
  });

  jQuery(document).off('click', '#right-2-select div.check-defalut');
  jQuery(document).on('click', '#right-2-select div.check-defalut', function () {
    if($(this).hasClass("current")){
      $(this).removeClass("current").addClass("smallSquare");
    }else {
      $(this).addClass("current").removeClass("smallSquare");
    }
    getClickData();
  });

  var rightPieChart = function (data) {
    var fontsizeTitle = 22;
    var fontSize = 17;
    var radiusLocation = ['50%', '68%'];
    if($("body").width()<=2560 && $("body").width()>1920){
      fontsizeTitle = 16;
      fontSize = 14;
    }
    if($("body").width()<=1920){
      fontsizeTitle = 12;
      fontSize = 12;
      radiusLocation = ['40%', '58%'];
    }
    var rightchart2 = echarts.init(document.getElementById('right-two-chart'));
    option = {
      color:['#15fecc', '#15ab8b', '#476660', '#324742', '#0d2e37', '#184c5a'],
      title: {
        text: $("#right-two-chart").data("total").toLocaleString(),
        x: 'center',
        y: 'center',
        textStyle: {
          color: '#15ffcc',
          fontSize: fontsizeTitle,
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
        radius: radiusLocation,
        center: ['50%', '50%'],
        data: data,
        label: {
          fontSize: fontSize,
          rich: {
            a: {
              fontSize: fontSize,
              color: "#e5e8f2"
            },
            b: {
              fontSize: fontSize,
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
            length: 12,
            length2: 18,
            lineStyle: {
              width: 1,
              color: '#3f3f49'
            }
          }
        }
      }]
    }
    rightchart2.setOption(option);
  }

  var getRightThreeData = function(page,count){
    $.getJSON('js/json/rightthree.json', function (data) {
      if(data.xAxisData.length>0 && data.seriesData.length>0){
        var dataStartLength = page * count;
        $("#page-upper").attr("res",page);
        $("#page-next").attr("res",page);
        $("#page-upper").attr("count",data.xAxisData.length);
        $("#page-next").attr("count",data.xAxisData.length);
        if(page>0){
          $("#page-upper").addClass('current');
        }else{
          $("#page-upper").removeClass('current');
        }
        if((Number(page) +1) * count >= data.xAxisData.length){
          $("#page-next").removeClass('current');
        }else{
          $("#page-next").addClass('current');
        }
        var sliceStart = dataStartLength;
        var sliceEnd = dataStartLength + count;
        var xAxisData = [];
        var seriesData = [];
        if(data.xAxisData.length > dataStartLength){
          xAxisData = data.xAxisData.slice(sliceStart,sliceEnd);
          seriesData = data.seriesData.slice(sliceStart,sliceEnd);
        };
        rightBarChart(xAxisData,seriesData);
      }
    });
  };

  jQuery(document).off('click', '#page-next');
  jQuery(document).on('click', '#page-next', function () {
    var page = Number($(this).attr("res")) + 1;
    var count = 10;
    var maxCount = Number($(this).attr("count"));
    if(page * count < maxCount){
      getRightThreeData(page,count);
    }
  });

  jQuery(document).off('click', '#page-upper');
  jQuery(document).on('click', '#page-upper', function () {
    var page = Number($(this).attr("res")) - 1;
    var count = 10;
    if(page>=0){
      getRightThreeData(page,count);
    };
  });

  var rightBarChart = function (xAxisData,seriesData) {
    var fontSize = 18;
    var yfontSize = 18;
    if($("body").width()<=1920){
      fontSize = 12;
      yfontSize = 12;
    }
    if($("body").width()<=2560 && $("body").width()>1920){
      fontSize = 14;
      yfontSize = 15;
    }
    var rightchart3 = echarts.init(document.getElementById('right-three-chart'));
    $.getJSON('js/json/rightthree.json', function (data) {
      option = {
        grid: {
          top: 20,
          bottom: 70,
          right:0
        },
        legend: {
          show: false
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
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
            fontSize: fontSize,
            color: '#ced3dc'
          },
          data: xAxisData
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
            inside: true,
            margin:-40,
            verticalAlign: "top",
            textStyle: {
              fontSize: yfontSize,
              textAlign:'right'
            },
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
            data: seriesData,
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
            }
          }
        ]
      };
      rightchart3.setOption(option);
      window.addEventListener("resize",function(){
        rightchart3.resize();
      });
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
    $("#map-chart").css("height",$(".m-left").height()-200);
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
              var num = 0
              if(v>0) num = 2;
              if(v>10000)  num = 4;
              if(v>100000) num = 6;
              if(v>1000000) num = 9;
              if(v>10000000) num = 12;
              if(v>100000000) num = 16
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
      $('#activeTotal').text(data.actvieTotal.toLocaleString());
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
    cursorcolor:'#fff',//滑块颜色设置
    cursorborder:'none',
    cursorborderradius:10,//滑块弧度设置
    autohidemode:'true'
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
    leftLineChart();
    leftTwoChart();
    getRightOneData();
    getRightTwoData();
    getRightThreeData(0,10);
    getDate();
  };

  return {
    init: function () {
      startLoad();
      mapchart();
    }
  };
}();

jQuery(document).ready(function () {
  Index.init();
});
