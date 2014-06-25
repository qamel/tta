var chart;
var selected

$(function () {

    $('#myModal').modal({
      backdrop: 'static', keyboard: false
    })

    var timeEraData = [
        { name: '0', y: 1.0, color: '#FF4D6A' },
        { name: '100', y: 1.0, color: '#FF4D6A' },
        { name: '200', y: 1.0, color: '#FF7751' },
        { name: '300', y: 1.0, color: '#FF7751' },
        { name: '400', y: 1.0, color: '#FFBB55' },
        { name: '500', y: 1.0, color: '#FFBB55' },
        { name: '600', y: 1.0, color: '#FFFD59' },
        { name: '700', y: 1.0, color: '#FFFD59' },
        { name: '800', y: 1.0, color: '#C2FF5D' },
        { name: '900', y: 1.0, color: '#C2FF5D' },
        { name: '1000', y: 1.0, color: '#87FF61' },
        { name: '1100', y: 1.0, color: '#87FF61' },
        { name: '1200', y: 1.0, color: '#65FF7B' },
        { name: '1300', y: 1.0, color: '#65FF7B' },
        { name: '1400', y: 1.0, color: '#69FFB7' },
        { name: '1500', y: 1.0, color: '#69FFB7' },
        { name: '1600', y: 1.0, color: '#6DFFF1' },
        { name: '1700', y: 1.0, color: '#6DFFF1' },
        { name: '1800', y: 1.0, color: '#71D5FF' },
        { name: '1900', y: 1.0, color: '#71D5FF' },
        { name: '2000', y: 1.0, color: '#75A2FF' },
        { name: '2100', y: 1.0, color: '#75A2FF' },
        { name: '2200', y: 1.0, color: '#8279FF' },
        { name: '2300', y: 1.0, color: '#8279FF' }
    ];

    var resourceData = [
        { name: 'Water', y: 1.0, color: '#FF4D6A' },
        { name: 'Wood', y: 1.0, color: '#FF7751' },
        { name: 'Wool', y: 1.0, color: '#FFBB55' },
        { name: 'Food', y: 1.0, color: '#FFFD59' },
        { name: 'People', y: 1.0, color: '#C2FF5D' },
        { name: 'Gold', y: 1.0, color: '#87FF61' },
        { name: 'Scrap Metal', y: 1.0, color: '#65FF7B' },
        { name: 'Fuel', y: 1.0, color: '#69FFB7' },
        { name: 'Rubber', y: 1.0, color: '#6DFFF1' },
        { name: 'Chemicals', y: 1.0, color: '#71D5FF' },
        { name: 'Plastic', y: 1.0, color: '#75A2FF' },
        { name: 'Chronotons', y: 1.0, color: '#8279FF' }
    ];

     var knowledgeData = [
        { name: 'Past', y: 7.0, color: '#BFBFBF' },
        { name: '<span class="glyphicon glyphicon-record" style="font-size:20px; color: black;">', y: 1.0, color: '#BFBFBF' },
        { name: 'Present', y: 7.0, color: '#8C8C8C' },
        { name: '<span class="glyphicon glyphicon-record" style="font-size:20px; color: white;">', y: 1.0, color: '#3E403F' },
        { name: 'Future', y: 8.0, color: '#3E403F' }
    ];

    var obstacle1Data = [
        { name: 'Castle Wall', y: 1.0, color: '#9DE08A', id: '1_1' },
        { name: 'Dark Cave', y: 1.0, color: '#82D57E', id: '1_2' },
        { name: 'Zombies', y: 1.0, color: '#77CA73', id: '1_3' },
        { name: 'Starving<br/>Village', y: 1.0, color: '#6CBF67', id: '1_4' },
        { name: 'Pirates', y: 1.0, color: '#61B45C', id: '1_5' },
        { name: 'Swarm of Bees', y: 1.0, color: '#56A950', id: '1_6'  },

        { name: 'Razor Wire<br/>Fence', y: 1.0, color: '#4B9E45', id: '1_7' },
        { name: 'Dark Cave', y: 1.0, color: '#409339', id: '1_8' },
        { name: 'Castle Wall', y: 1.0, color: '#35882E', id: '1_9' },
        { name: 'Pirates', y: 1.0, color: '#2A7D22', id: '1_10' },
        { name: 'Razor Wire<br/>Fence', y: 1.0, color: '#1F7217', id: '1_11' },
        { name: 'Zombies', y: 1.0, color: '#14670B', id: '1_12' },

        { name: 'Starving<br/>Village', y: 1.0, color: '#0A5C00', id: '1_13'  },
        { name: 'Dark Cave', y: 1.0, color: '#14670B', id: '1_14' },
        { name: 'Razor Wire<br/>Fence', y: 1.0, color: '#1F7217', id: '1_15'  },
        { name: 'Pirates', y: 1.0, color: '#2A7D22', id: '1_16' },
        { name: 'Dark Cave', y: 1.0, color: '#35882E', id: '1_17' },
        { name: 'Zombies', y: 1.0, color: '#409339', id: '1_18' },

        { name: 'Razor Wire<br/>Fence', y: 1.0, color: '#4B9E45', id: '1_19' },
        { name: 'Swarm of Bees', y: 1.0, color: '#56A950', id: '1_20' },
        { name: 'Dark Cave', y: 1.0, color: '#61B45C', id: '1_21' },
        { name: 'Pirates', y: 1.0, color: '#6CBF67', id: '1_22' },
        { name: 'Razor Wire<br/>Fence', y: 1.0, color: '#77CA73', id: '1_23' },
        { name: 'Starving<br/>Village', y: 1.0, color: '#82D57E', id: '1_24' }
    ];

    var obstacle2Data = [
        { name: 'Poison Gas<br/>Field', y: 1.0, color: '#75A6FF', id: '2_1' },
        { name: 'Very Dry<br/>Desert', y: 1.0, color: '#618EE4', id: '2_2' },
        { name: 'Wildfire', y: 1.0, color: '#4E76CA', id: '2_3' },

        { name: 'Security Door', y: 1.0, color: '#3B5EAF', id: '2_4' },
        { name: 'Boulders', y: 1.0, color: '#274695', id: '2_5' },
        { name: 'Rushing River<br/>Rapids', y: 1.0, color: '#142E7A', id: '2_6' },

        { name: 'Poison Gas<br/>Field', y: 1.0, color: '#011760', id: '2_7' },
        { name: 'Labyrinth', y: 1.0, color: '#142E7A', id: '2_8' },
        { name: 'Wildfire', y: 1.0, color: '#274695', id: '2_9' },

        { name: 'Arctic Tundra', y: 1.0, color: '#3B5EAF', id: '2_10' },
        { name: 'Security Door', y: 1.0, color: '#4E76CA', id: '2_11' },
        { name: 'Hurricane', y: 1.0, color: '#618EE4', id: '2_12' }
    ];

    var obstacle3Data = [
        { name: 'Mine Field', y: 1.0, color: '#FEC467', id: '3_1' },
        { name: 'Epidemic', y: 1.0, color: '#FBAC44', id: '3_2' },
        { name: 'Swampy<br/>Swamp', y: 1.0, color: '#F89422', id: '3_3' },
        { name: 'Cliff', y: 1.0, color: '#F57D00', id: '3_4' },

        { name: 'Carnivorous<br/>Vegetation', y: 1.0, color: '#F89422', id: '3_5' },
        { name: 'Shark', y: 1.0, color: '#FBAC44', id: '3_6' }
        //{ name: 'Dense Jungle', y: 1.0, color: '#94090D' },
        //{ name: 'Enemy Army', y: 1.0, color: '#5C0002' }
    ];

    var artifactData = [
        { name: '#1', y: 1.0, color: '#DB57FF' },
        { name: '#2', y: 1.0, color: '#B52BE0' },
        { name: '#3', y: 1.0, color: '#8F00C2' }
        //{ name: '#4', y: 1.0, color: '#36175E' }
    ];

    // Create the chart
    chart = new Highcharts.Chart({
        chart: {
            type: 'pie',
            renderTo: 'container'
        },
        title: {
            text: '',
            floating: 'true'
        },
        yAxis: {
            title: {
                text: 'Total percent market share'
            }
        },
        tooltip: {
            enabled: false
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '50%'],
                startAngle: 0
            }
        },
        series: [{
            name: 'Time Eras',
            data: timeEraData,
            size: '100%',
            innerSize: '90%',
            dataLabels: {
                color: 'black',
                distance: -20,
                useHTML: true
            },
            allowPointSelect: false,
            slicedOffset: 0,
            states: {
                select: {
                    color: '#FF9494'
                }
            }
        }, {
            name: 'Resource',
            data: resourceData,
            size: '90%',
            innerSize: '80%',
            dataLabels: {
                color: 'black',
                distance: -25,
                useHTML: true
            },
            allowPointSelect: false,
            slicedOffset: 0,
            states: {
                select: {
                    color: '#FF9494'
                }
            }
        }, {
            name: 'Knowledge',
            data: knowledgeData,
            size: '80%',
            innerSize: '70%',
            dataLabels: {
                color: 'white',
                distance: -23,
                useHTML: true
            },
            allowPointSelect: false,
            slicedOffset: 0,
            states: {
                select: {
                    color: '#FF9494'
                }
            }
        }, {
            name: 'Obstacle1 ',
            data: obstacle1Data,
            size: '70%',
            innerSize: '50%',
            dataLabels: {
                color: 'white',
                distance: -45,
                useHTML: true
            },
            allowPointSelect: true,
            slicedOffset: 0,
            states: {
                select: {
                    color: '#FF9494'
                }
            }
        }, {
            name: 'Obstacle2',
            data: obstacle2Data,
            size: '50%',
            innerSize: '30%',
            dataLabels: {
                color: 'white',
                distance: -45,
                useHTML: true
            },
            allowPointSelect: true,
            slicedOffset: 0,
            states: {
                select: {
                    color: '#FF9494'
                }
            }
        }, {
            name: 'Obstacle3',
            data: obstacle3Data,
            size: '30%',
            innerSize: '10%',
            dataLabels: {
                color: 'white',
                distance: -45,
                useHTML: true
            },
            allowPointSelect: true,
            slicedOffset: 0,
            states: {
                select: {
                    color: '#FF9494'
                }
            }
        }, {
            name: 'Artifacts',
            data: artifactData,
            size: '10%',
            dataLabels: {
                color: 'white',
                distance: -20,
                useHTML: true
            },
            allowPointSelect: false,
            slicedOffset: 0,
            states: {
                select: {
                    color: '#FF9494'
                }
            }
        }]
    });
});
