import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Highcharts from 'highcharts';
import drilldown from 'highcharts/modules/drilldown.src.js';
import * as shape from 'd3-shape';
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
  showModel: boolean = true;
  showTable: boolean = false;
  showResult: boolean = false;
  showDetails: boolean = false;
  showRating: boolean = false;
  title = 'healcarepro365';
  showChart: boolean = false;
  showSearch: boolean = true;
  iceCall: boolean = true;
  Highcharts = Highcharts;
  professional = 'Doctor/Medical Professional';
  specialty = 'Family Practice';
  distance = '20';
  zipcode = '43085';
  myFile;
  usemock = false;
  textquery = '';
  showSearchforKYD = false;
  providerDetails = {};
  curve = shape.curveBundle.beta(1);
  selectedType = '';
  providerName = '';
  chartOptions = {};
  provider = null;
  toggleForm(type: string) {
    this.showBanner = !this.showBanner;
    this.showModel = false;
    this.showResult = true;
    this.selectedType = type;
    if (type === 'FAD') {
      this.showSearch = this.showBanner ? false : true;
    } else {
      this.showSearchforKYD = this.showBanner ? false : true;
    }
  }
  getRating($event, provider) {
    this.chartOptions = {
      // series: [{
      //   data: [1, 2, 3]
      // }],
      chart: {
        type: 'column'
      },
      title: {
        text: 'HealthPro *360 Score ' + provider.providername
      },
      subtitle: {
        text: 'Click the columns to view drill down matrix. Source: healthpro360.d3.ustri.com'
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'HealthPro Score'
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

      series: [
        {
          'name': 'HealthPro* Score',
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
              'name': 'Qualification',
              'y': 4,
              'drilldown': 'Qualification'
            },
            {
              'name': 'Availability',
              'y': 3,
              'drilldown': 'Availability'
            },

            {
              'name': 'Credibility',
              'y': 3,
              'drilldown': 'Credibility'
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
              'name': 'Online Reviews',
              'y': 4,
              'drilldown': 'Online Reviews'
            }
          ]
        }


      ],
      drilldown: {
        series: [

          {
            'name': 'Qualification',
            'id': 'Qualification',
            'data': [
              [
                'Medical school Score ',
                3
              ],
              [
                'Certifications',
                4
              ],
              [
                'Medical Credentaial Records',
                4
              ]
            ]
          },
          {
            'name': 'Credibility',
            'id': 'Credibility',
            'data': [
              [
                'Rate of Prior Authorization Approval  for Procedure ',
                4
              ],
              [
                'Readdmission Rate',
                3
              ],
              [
                'National Data Practioner Records',
                1
              ],
              [
                'Member Review comments',
                4
              ]
            ]
          },
          {
            'name': 'Communication',
            'id': 'Communication',
            'data': [
              [
                'Quality Time with Patient',
                3
              ],
              [
                'Effective Follow Up',
                4
              ],
              [
                'Explains medical condition',
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
              ],
              [
                'Total Wait Time',
                3
              ],
              [
                'Easy of scheduling flexibility',
                3
              ]
            ]
          },
          {
            'name': 'Prescription Behaviour',
            'id': 'Prescription Behaviour',
            'data': [
              [
                'Rate of Prior Authorization Approval foMediations ',
                3
              ],
              [
                'Rate of generic Drugs Vs Branded Drug',
                3
              ]
            ]
          },
          {
            'name': 'Environment',
            'id': 'Environment',
            'data': [
              [
                'Reachability of Provider locations',
                3
              ],
              [
                'Office cleanliness',
                4
              ],
              [
                'Area',
                4
              ]
            ]
          },
          {
            'name': 'Experience',
            'id': 'Experience',
            'data': [
              [
                'Years of Practice',
                4
              ],
              [
                'No of Speciality',
                3.5
              ],
              [
                'medical Credential',
                4
              ],
              [
                'No Of Affiliations',
                2.9
              ]
            ]
          }

        ]
      }
    };
    this.providerDetails = provider
    this.showResult = false;
    this.showDetails = true;
    this.showChart = true;
    this.showTable = false;
    this.showBanner = false;
    this.showSearch = false;
    this.showSearchforKYD = false;
    this.http.get('http://localhost:8081/getRating', {
      params: {
        providerid: provider.providerid
      }
    }).subscribe(data => {
      this.provider = data;
      this.provider = this.provider.providerList;
      this.showTable = true;
    });
  }
  backFunction($event) {
    this.showDetails = false;
    this.showResult = true;
    this.getProvider();
  }

  getProvider() {

    this.showTable = true;
    this.showSearch = false;
    this.showBanner = false;
    this.showSearchforKYD = false;
    this.http.get('http://localhost:8081/getProvider', {
      params: {
        professional: this.professional,
        specialty: this.specialty,
        distance: this.distance,
        zipcode: this.zipcode,
        usemock: this.usemock.toString()
      }
    }).subscribe(data => {
      this.provider = data;
      this.provider = this.provider.providerList;
      this.showResult = true;

    });
  }

  getProviderByName() {
    this.showTable = true;
    this.showSearch = false;
    this.showSearchforKYD = false;
    this.http.get('https://localhost:3443/getProviderByName', {
      params: {
        providerName: this.providerName.toUpperCase(),
        zipcode: this.zipcode,
        usemock: this.usemock.toString()
      }
    }).subscribe(data => {
      this.provider = data;
      this.provider = this.provider.providerList;
      this.showTable = true;
    });
  }
  goToback() {

    if (this.selectedType === 'KYD') {
      this.showTable = false;
      this.showSearch = false;
      this.showSearchforKYD = true;
    } else {
      this.showTable = false;
      this.showSearch = true;
      this.showSearchforKYD = false;
    }

  }
  getIceResponce($event, query) {
    this.http.get('http://localhost:8081/ice/findprovider', {
      params: {
        textquery: this.textquery
      }
    }).subscribe(data => {
      this.provider = data;
      this.provider = this.provider.providerList;
      this.iceCall = false;
      this.showBanner = false;
      this.showResult = true;

    });

  }

  uploadFile($event) {
    alert("upload file"+this.myFile);
  }

  nodes = [
    {
      id: 'start',
      label: 'scan',
      position: 'x0'
    }, {
      id: '1',
      label: 'Event#a',
      position: 'x1'
    }, {
      id: '2',
      label: 'Event#x',
      position: 'x2'
    }, {
      id: '3',
      label: 'Event#b',
      position: 'x3'
    }, {
      id: '4',
      label: 'Event#c',
      position: 'x4'
    }, {
      id: '5',
      label: 'Event#y',
      position: 'x5'
    }, {
      id: '6',
      label: 'Event#z',
      position: 'x6'
    }
  ];

  links = [
    {
      source: 'start',
      target: '1',
      label: 'Process#1'
    }, {
      source: 'start',
      target: '2',
      label: 'Process#2'
    }, {
      source: '1',
      target: '3',
      label: 'Process#3'
    }, {
      source: '2',
      target: '4',
      label: 'Process#4'
    }, {
      source: '2',
      target: '6',
      label: 'Process#6'
    }, {
      source: '3',
      target: '5'
    }
  ];

}
