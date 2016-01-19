var displayDetails = false;

var periodToDisplay = 'month';
var groupPeriodExpression = 'MM/YYYY';

var expenses;

var periodsSerie;
var historicalGlobalSerie;
var historicalDetailedSerie;

Template.ExpensesStats.events({
    'click .displayDetails': function (event) {
        displayDetails = !displayDetails;
        Session.set("displayDetailsActive",true);
        SetHistoricalData();
    },
    'click .hideDetails': function (event) {
        displayDetails = !displayDetails;
        Session.set("displayDetailsActive",false);
        SetHistoricalData();
    },
    'click .displayByMonth': function (event) {
        periodToDisplay = 'month';
        groupPeriodExpression = 'MM/YYYY';
        Session.set("displayByMonthActive",true);

        SetHistoricalData();

    },
    'click .displayByTrismester': function (event) {
        periodToDisplay = 'trimester';
        Session.set("displayByTrimesterActive",true);

    },
    'click .displayByYear': function (event) {
        periodToDisplay = 'year';
        groupPeriodExpression = 'YYYY';
        Session.set("displayByYearActive",true);

        SetHistoricalData();
    }
});

Template.ExpensesStats.helpers({

    displayByMonthActive:function(){
        return Session.get("displayByMonthActive");
    },
    displayByTrimesterActive:function(){
        return Session.get("displayByTrimesterActive");
    },
    displayByYearActive:function(){
        return Session.get("displayByYearActive");
    },
    displayDetailsActive:function(){
        return Session.get("displayDetailsActive");
    },

    globalRepartitionChartOptions: function () {

        var groups = _(expenses).groupBy('category');

        var out = _(groups).map(function (g, key) {
            return [key,
                _(g).reduce(function (m, x) {
                    return m + x.amount;
                }, 0)];
        });

        return {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: "Répartition des dépenses"
            },
            tooltip: {
                pointFormat: '<b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        },
                        connectorColor: 'silver'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'répartition',
                data: out
            }]
        };
    },

    historicalByPeriodChartOptions: function () {

        BuildHistoricalData();

        var chartOptions = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Dépenses par catégorie'
            },
            xAxis: {
                crosshair: true,
                categories: periodsSerie
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Montant en €'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} €</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            colors:['#434348','#90ED7D','#AA4643','#80699B','#3D96AE','#DB843D'],
            series: [{
                name:"Total",
                data:historicalGlobalSerie,
                color:'#434348'
            }]
        };

        return chartOptions
    }
})

Template.ExpensesStats.onCreated(function () {
    expenses = Expenses.find({}, {sort: {date: 1}}).fetch();

    BuildHistoricalPeriods();
    BuildHistoricalData();
})

function SetHistoricalData() {

    BuildHistoricalPeriods();

    BuildHistoricalData();

    var chart = $('#historicalByPeriodChart').highcharts();

    chart.xAxis[0].setCategories(periodsSerie);

    while (chart.series.length > 0) {
        chart.series[0].remove(false);
    }

    chart.addSeries({name:"Total",data:historicalGlobalSerie,color:'#434348'},false,true);

    for (var i = 0; i < historicalDetailedSerie.length; i++) {
        chart.addSeries({name: historicalDetailedSerie[i].name, data: historicalDetailedSerie[i].data, color:historicalDetailedSerie[i].color}, false, true);
    }
    chart.redraw();
}

function BuildHistoricalPeriods() {

    var groupsByMonth = _(expenses).groupBy(function (item) {
        return moment(item.date).format(groupPeriodExpression);
    });

    periodsSerie =  _(groupsByMonth).map(function (g, key) {
        return key;
    });
}

function BuildHistoricalData() {

    historicalDetailedSerie = [];

    var groupsByMonth = _(expenses).groupBy(function (item) {
        return moment(item.date).format(groupPeriodExpression);
    });


    historicalGlobalSerie = _(groupsByMonth).map(function (g) {
        return _(g).reduce(function (m, x) {
            return m + x.amount;
        }, 0);
    });


    if (displayDetails) {
        BuildHistoricalDetailedData(groupsByMonth);
    }
}


function BuildHistoricalDetailedData(groupsByMonth) {

    function getGroupsByCategory(category) {
        return _(groupsByMonth).map(function (g) {
            return _(g).reduce(function (m, x) {
                return x.category === category ? m + x.amount : m;
            }, 0);
        });
    }
    var groupsByCategoryDeplacement = getGroupsByCategory(CATEGORY_DEPLACEMENT);
    var groupsByCategoryEmballage = getGroupsByCategory(CATEGORY_EMBALLAGE);
    var groupsByCategoryLocation = getGroupsByCategory(CATEGORY_LOCATION);
    var groupsByCategoryMatierePremiere = getGroupsByCategory(CATEGORY_MATIEREPREMIERE);


    var groupsByCategoryStand = getGroupsByCategory(CATEGORY_STAND);

    historicalDetailedSerie.push({
            name: 'Déplacements',
            data: groupsByCategoryDeplacement,
            color:'#90ED7D'
        },
        {
            name: 'Emballage',
            data: groupsByCategoryEmballage,
            color:'#AA4643'
        },
        {
            name: 'Location',
            data: groupsByCategoryLocation,
            color:'#80699B'
        },
        {
            name: 'Matières premières',
            data: groupsByCategoryMatierePremiere,
            color:'#3D96AE'
        },
        {
            name: 'Stand',
            data: groupsByCategoryStand,
            color:'#DB843D'
        });
}





