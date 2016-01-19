var serie1 = [['share 1',25],['share 2',75]];
var serie2 = [['share 1',10],['share 2',30],['share 3',60]];

var serieToDisplay= 1;

function buildData(){
    return serieToDisplay === 1?serie1:serie2;
}

Template.ChartWithDifferentSeries.helpers({
    chartMultiSeries: function () {
        return {
            series: [{
                type: 'pie',
                data: buildData()
            }]
        };
    }
})

Template.ChartWithDifferentSeries.events({
    "click .displaySerie1": function () {
        serieToDisplay=1;
        var series =$('#chart').highcharts().series[0];
        series.setData(buildData());
    },
    "click .displaySerie2": function () {
        serieToDisplay=2;
        var series =$('#chart').highcharts().series[0];
        series.setData(buildData());
    }
})

