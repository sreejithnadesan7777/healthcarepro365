import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import drilldown from 'highcharts/modules/drilldown.src.js';
drilldown(Highcharts);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild('chartTarget') chartTarget: ElementRef;
  constructor(private http: HttpClient) { }
  showBanner: boolean = true;
  showTable: boolean = false;
  showRating: boolean = false;
  title = 'healcarepro365';
  showChart: boolean = false;
  showSearch: boolean = false;
  Highcharts = Highcharts;
  chartOptions = {
    // series: [{
    //   data: [1, 2, 3]
    // }],
    chart: {
      type: 'column'
    },
    title: {
      text: 'Provider Rating - THOMAS JUDE MD'
    },
    subtitle: {
      text: 'Click the columns to view drill down matrix. Source: healthpro360.d3.ustri.com'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: 'Provider Rating'
      }

    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y:.1f}'
        }
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.1f}</b> of total<br/>'
    },

    'series': [
      {
        'name': 'Provider Rating',
        'colorByPoint': true,
        'data': [
          {
            'name': 'Experience',
            'y': 3,
            'drilldown': 'Experience'
          },
          {
            'name': 'Communication',
            'y': 4,
            'drilldown': 'Communication'
          },
          {
            'name': 'Availability',
            'y': 3,
            'drilldown': 'Availability'
          },
          {
            'name': 'Environment',
            'y': 4,
            'drilldown': 'Environment'
          },
          {
            'name': 'Prescription Behaviour',
            'y': 4.02,
            'drilldown': 'Prescription Behaviour'
          },
          {
            'name': 'Credibility',
            'y': 1.92,
            'drilldown': 'Credibility'
          },
          {
            'name': 'Qualification',
            'y': 4,
            'drilldown': 'Qualification'
          }
        ]
      }


    ],
    'drilldown': {
      'series': [
        {
          'name': 'Communication',
          'id': 'Communication',
          'data': [
            [
              'Quality Time with Patient',
              3
            ],
            [
              'Follow Up',
              4
            ]
          ]
        },
        {
          'name': 'Availability',
          'id': 'Availability',
          'data': [
            [
              'Office scheduling flexibility',
              3
            ]
          ]
        },
        {
          'name': 'Prescription Behaviour',
          'id': 'Prescription Behaviour',
          'data': [
            [
              'Generic/Branded',
              3
            ],
            [
              'Prior Auth Approval (Medication)',
              3
            ]
          ]
        },
        {
          'name': 'Credibility',
          'id': 'Credibility',
          'data': [
            [
              'Claims Approval',
              4
            ],
            [
              'Readdmission Rate',
              3
            ],
            [
              'Data Practioner',
              5
            ]
          ]
        },
        {
          'name': 'Experience',
          'id': 'Experience',
          'data': [
            [
              'Years of Practice-Industry average',
              4
            ],
            [
              'Claims Approval Rate',
              3
            ],
            [
              'Prior Auth Approval Rate',
              5
            ],
            [
              'Certifcations-Industry Avag',
              3
            ],
            [
              'No of Speciality-Industry Avag',
              2
            ],
          ]
        }

      ]
    }
  };

  providerName = '';
  provider = null;
  toggleForm($event) {
    this.showBanner = !this.showBanner;
    this.showSearch = this.showBanner ? false :true;
  }
  getRating($event) {
    this.showChart = true;
    this.showTable = false;
    this.showBanner = false;
    this.showSearch = false;
  }
  backFunction($event) {
    this.showChart = false;
    this.showTable = true;
  }

  getProvider() {
    this.showTable = true;
    this.showSearch = false;
    this.http.get('src/json/provider.json')
      .subscribe(data => {
        this.provider = data;
        this.provider = this.provider.providerList;
        this.showTable = true;
      });
  }
  goToback() {
    this.showTable = false;
    this.showSearch = true;
  }
}
