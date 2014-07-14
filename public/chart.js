var chart;
var selected

$(function () {

    $('#myModal').modal({
      backdrop: 'static', keyboard: false
    })

    var obstacles = [
        { obstacle: 'Castle Wall', tool: 'Grappling Hook', specificTools: 'Grappling Hook', resources: '', ring: 1 },
        { obstacle: 'Dark Cave', tool: 'Torch', specificTools: 'Torch', resources: '', ring: 1 },
        { obstacle: 'Razor Wire Fence', tool: 'Axe', specificTools: 'Axe', resources: '', ring: 1 },
        { obstacle: 'Zombies', tool: 'Shotgun', specificTools: 'Gun', resources: 'Scrap Metal', ring: 1 },
        { obstacle: 'Starving Village', tool: 'Hearty Meal', specificTools: 'Hearty Meal', resources: '', ring: 1 },
        { obstacle: 'Pirates', tool: 'Money', specificTools: 'Money', resources: '', ring: 1 },
        { obstacle: 'Swarm of Bees', tool: 'Bee Suit', specificTools: '', resources: 'Wool + Plastic', ring: 1 },
        { obstacle: 'Poison Gas Field', tool: 'Gas Mask', specificTools: 'Gas Mask', resources: '', ring: 2 },
        { obstacle: 'Very Dry Desert', tool: 'Supplies', specificTools: 'Canteen + Hearty Meal', resources: '', ring: 2 },
        { obstacle: 'Wildfire', tool: 'Lots of Water', specificTools: 'Canteen + Axe', resources: '', ring: 2 },
        { obstacle: 'Security Door', tool: 'Security Card', specificTools: 'Electronics', resources: 'Plastic', ring: 2 },
        { obstacle: 'Boulders', tool: 'Dynamite', specificTools: 'Torch', resources: 'Chemicals + Fuel', ring: 2 },
        { obstacle: 'Rushing River Rapids', tool: 'Kayak', specificTools: 'Boat', resources: 'Plastic', ring: 2 },
        { obstacle: 'Labyrinth', tool: 'Guide', specificTools: 'Money', resources: 'People', ring: 2 },
        { obstacle: 'Arctic Tundra', tool: 'Dog Sled', specificTools: 'Money', resources: 'Food', ring: 2 },
        { obstacle: 'Hurricane', tool: 'Shelter', specificTools: '', resources: 'Wood + Scrap Metal + Wool', ring: 2 },
        { obstacle: 'Mine Field', tool: 'Metal Detector', specificTools: 'Power + Electronics', resources: 'Scrap Metal', ring: 3 },
        { obstacle: 'Epidemic', tool: 'First Aid', specificTools: 'Gas Mask', resources: 'Chemicals + Plastic', ring: 3 },
        { obstacle: 'Swampy Swamp', tool: 'Fanboat', specificTools: 'Boat + Power', resources: 'Scrap Metal', ring: 3 },
        { obstacle: 'Cliff', tool: 'Zipline', specificTools: 'Grappling Hook + Gun', resources: 'Scrap Metal', ring: 3 },
        { obstacle: 'Carnivorous Vegetation', tool: 'Flamethrower', specificTools: 'Torch + Gun', resources: 'Chemicals', ring: 3 },
        { obstacle: 'Shark', tool: 'Speargun', specificTools: 'Gun', resources: 'Scrap Metal + Plastic + Fuel', ring: 3 },
        { obstacle: 'Dense Jungle', tool: 'Powered Axe', specificTools: 'Axe + Power', resources: 'Fuel', ring: 3 },
        { obstacle: 'Enemy Army', tool: 'Mercenary', specificTools: 'Money + Gun', resources: 'People', ring: 3 }
    ];

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
        { name: 'Present', y: 8.0, color: '#8C8C8C' },
        { name: '<span class="glyphicon glyphicon-record" style="font-size:20px; color: white;">', y: 1.0, color: '#3E403F' },
        { name: 'Future', y: 7.0, color: '#3E403F' }
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
        credits: {
            enabled: false
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
            formatter: function() {
                var tooltip = "";

                var obstacleName = this.key;
                var editObstacleName = obstacleName.replace('<br/>',' ');
                editObstacleName = obstacleName.replace('<br/>',' ');
                editObstacleName = obstacleName.replace('<br/>',' ');

                $.each(obstacles, function(i, obstacle) {
                    if (editObstacleName.indexOf(obstacle.obstacle) > -1)
                    {
                        //Found obstacle match
                        tooltip = '<b>Tool:</b> ' + obstacle.tool;
                        tooltip = tooltip + '<br/><b>Specific Tools:</b> ' + obstacle.specificTools;
                        tooltip = tooltip + '<br/><b>Additional Resources:</b> ' + obstacle.resources;
                    }    
                });

                return tooltip;
            }
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
            },
            enableMouseTracking: false
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
            },
            enableMouseTracking: false
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
            },
            enableMouseTracking: false
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
            },
            enableMouseTracking: false
        }]
    });
});
