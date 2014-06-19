var chart;

$(function () {

    var timeEraData = [
        { name: '0', y: 1.0, color: '#F41C54' },
        { name: '100', y: 1.0, color: '#F41C54' },
        { name: '200', y: 1.0, color: '#FF9F00' },
        { name: '300', y: 1.0, color: '#FF9F00' },
        { name: '400', y: 1.0, color: '#FBD506' },
        { name: '500', y: 1.0, color: '#FBD506' },
        { name: '600', y: 1.0, color: '#A8BF12' },
        { name: '700', y: 1.0, color: '#A8BF12' },
        { name: '800', y: 1.0, color: '#00AAB5' },
        { name: '900', y: 1.0, color: '#00AAB5' },
        { name: '1000', y: 1.0, color: '#A41FF4' },
        { name: '1100', y: 1.0, color: '#A41FF4' },
        { name: '1200', y: 1.0, color: '#F41C54' },
        { name: '1300', y: 1.0, color: '#F41C54' },
        { name: '1400', y: 1.0, color: '#FF9F00' },
        { name: '1500', y: 1.0, color: '#FF9F00' },
        { name: '1600', y: 1.0, color: '#FBD506' },
        { name: '1700', y: 1.0, color: '#FBD506' },
        { name: '1800', y: 1.0, color: '#A8BF12' },
        { name: '1900', y: 1.0, color: '#A8BF12' },
        { name: '2000', y: 1.0, color: '#00AAB5' },
        { name: '2100', y: 1.0, color: '#00AAB5' },
        { name: '2200', y: 1.0, color: '#A41FF4' },
        { name: '2300', y: 1.0, color: '#A41FF4' }
    ];

    var resourceData = [
        { name: 'Water', y: 1.0, color: '#F41C54' },
        { name: 'Wood', y: 1.0, color: '#FF9F00' },
        { name: 'Wool', y: 1.0, color: '#FBD506' },
        { name: 'Food', y: 1.0, color: '#A8BF12' },
        { name: 'People', y: 1.0, color: '#00AAB5' },
        { name: 'Gold', y: 1.0, color: '#A41FF4' },
        { name: 'Scrap Metal', y: 1.0, color: '#F41C54' },
        { name: 'Fuel', y: 1.0, color: '#FF9F00' },
        { name: 'Rubber', y: 1.0, color: '#FBD506' },
        { name: 'Chemicals', y: 1.0, color: '#A8BF12' },
        { name: 'Plastic', y: 1.0, color: '#00AAB5' },
        { name: 'Chronotons', y: 1.0, color: '#A41FF4' }
    ];

     var knowledgeData = [
        { name: 'Past', y: 1.0, color: '#BFBFBF' },
        { name: 'Present', y: 1.0, color: '#8C8C8C' },
        { name: 'Future', y: 1.0, color: '#3E403F' }
    ];

    var obstacle1Data = [
        { name: 'Castle Wall', y: 1.0, color: '#96ED89' },
        { name: 'Dark Cave', y: 1.0, color: '#6FB066' },
        { name: 'Zombies', y: 1.0, color: '#45BF55' },
        { name: 'Starving<br/>Village', y: 1.0, color: '#168039' },
        { name: 'Pirates', y: 1.0, color: '#044D29' },
        { name: 'Swarm of Bees', y: 1.0, color: '#00261C'  },

        { name: 'Razor Wire<br/>Fence', y: 1.0, color: '#96ED89' },
        { name: 'Dark Cave', y: 1.0, color: '#6FB066' },
        { name: 'Castle Wall', y: 1.0, color: '#45BF55' },
        { name: 'Pirates', y: 1.0, color: '#168039' },
        { name: 'Razor Wire<br/>Fence', y: 1.0, color: '#044D29' },
        { name: 'Zombies', y: 1.0, color: '#00261C' },

        { name: 'Starving<br/>Village', y: 1.0, color: '#96ED89'  },
        { name: 'Dark Cave', y: 1.0, color: '#6FB066' },
        { name: 'Razor Wire<br/>Fence', y: 1.0, color: '#45BF55'  },
        { name: 'Pirates', y: 1.0, color: '#168039' },
        { name: 'Dark Cave', y: 1.0, color: '#044D29' },
        { name: 'Zombies', y: 1.0, color: '#00261C' },

        { name: 'Razor Wire<br/>Fence', y: 1.0, color: '#96ED89' },
        { name: 'Swarm of Bees', y: 1.0, color: '#6FB066' },
        { name: 'Dark Cave', y: 1.0, color: '#45BF55' },
        { name: 'Pirates', y: 1.0, color: '#168039' },
        { name: 'Razor Wire<br/>Fence', y: 1.0, color: '#044D29' },
        { name: 'Starving<br/>Village', y: 1.0, color: '#00261C' }
    ];

    var obstacle2Data = [
        { name: 'Poison Gas<br/>Field', y: 1.0, color: '#ADD5F7' },
        { name: 'Very Dry<br/>Desert', y: 1.0, color: '#7FB2F0' },
        { name: 'Wildfire', y: 1.0, color: '#4E7AC7' },

        { name: 'Security Door', y: 1.0, color: '#4E7AC7' },
        { name: 'Boulders', y: 1.0, color: '#16193B'  },
        { name: 'Rushing River<br/>Rapids', y: 1.0, color: '#0A0C1C' },

        { name: 'Poison Gas<br/>Field', y: 1.0, color: '#ADD5F7' },
        { name: 'Labyrinth', y: 1.0, color: '#16193B' },
        { name: 'Wildfire', y: 1.0, color: '#4E7AC7' },

        { name: 'Arctic Tundra', y: 1.0, color: '#4E7AC7' },
        { name: 'Security Door', y: 1.0, color: '#16193B' },
        { name: 'Hurricane', y: 1.0, color: '#0A0C1C' }
    ];

    var obstacle3Data = [
        { name: 'Mine Field', y: 1.0, color: '#FF1D23' },
        { name: 'Epidemic', y: 1.0, color: '#D40D12' },
        { name: 'Swampy Swamp', y: 1.0, color: '#94090D' },
        { name: 'Cliff', y: 1.0, color: '#5C0002'},

        { name: 'Carnivorous<br/>Vegetation', y: 1.0, color: '#FF1D23' },
        { name: 'Shark', y: 1.0, color: '#D40D12' }
        //{ name: 'Dense Jungle', y: 1.0, color: '#94090D' },
        //{ name: 'Enemy Army', y: 1.0, color: '#5C0002' }
    ];

    var artifactData = [
        { name: '#1', y: 1.0, color: '#9768D1' },
        { name: '#2', y: 1.0, color: '#7B52AB' },
        { name: '#3', y: 1.0, color: '#553285' }
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
                color: 'white',
                distance: -20
            }
        }, {
            name: 'Resource',
            data: resourceData,
            size: '87%',
            innerSize: '80%',
            dataLabels: {
                color: 'white',
                distance: -25
            }
        }, {
            name: 'Knowledge',
            data: knowledgeData,
            size: '77%',
            innerSize: '70%',
            dataLabels: {
                color: 'white',
                distance: -23
            }
        }, {
            name: 'Obstacle1 ',
            data: obstacle1Data,
            size: '67%',
            innerSize: '50%',
            dataLabels: {
                color: 'white',
                distance: -45
            }
        }, {
            name: 'Obstacle2',
            data: obstacle2Data,
            size: '47%',
            innerSize: '30%',
            dataLabels: {
                color: 'white',
                distance: -45
            }
        }, {
            name: 'Obstacle3',
            data: obstacle3Data,
            size: '27%',
            innerSize: '10%',
            dataLabels: {
                color: 'white',
                distance: -45
            }
        }, {
            name: 'Artifacts',
            data: artifactData,
            size: '7%',
            dataLabels: {
                color: 'white',
                distance: -20
            }
        }]
    });
});
