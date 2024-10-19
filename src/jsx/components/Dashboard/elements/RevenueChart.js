import React, { useRef } from "react";
import ReactApexChart from "react-apexcharts";
import { Tab, Nav } from 'react-bootstrap';

const series = [
    {
        name: "Revenue",
        type: 'area',
        data: [20, 25, 20, 50, 30, 30, 20,40,40, 20, 35]
    }      
];
const  options = {
    chart: {
        height: 300,
        type: 'area',
        group: 'social',
        toolbar: {
            show: false,
        },
        zoom: {
            enabled: false
        },    
        offsetX:-16,
    },
    colors:['var(--primary)','#FF3D3D'],

    dataLabels: {
        enabled: false,           
    },
      
    stroke: {
        width: [0, 0],
        colors:['var(--primary)','#FF6A59'],
        curve: 'straight'
    },
    legend: {
        show:false,
        tooltipHoverFormatter: function(val, opts) {
          return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
        },
    },
    xaxis: {
        categories: ['Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		labels: {
            style: {
                colors: '#3E4954',
                fontSize: '14px',
                fontFamily: 'Poppins',
                fontWeight: 100,            
            },
		},
        axisBorder:{
            show: false
        },
        axisTicks: {
            show:false,  
        },
    },
	yaxis: {
        
		labels: {
			 offsetX:-16,
			minWidth:40,
			style: {
			    colors: '#3E4954',
			    fontSize: '14px',
			    fontFamily: 'Poppins',
			    fontWeight: 100,			  
			},
		},
	    axisTicks: {
			show: false,
			borderType: 'solid',
			color: '#78909C',
			width: 6,
			offsetX: 0,
			offsetY: 0
		},
	},
    fill: {
        type: 'solid',
        opacity: .9,
    },
    grid: {
      borderColor: '#f1f1f1',
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
    },
    responsive: [{
        breakpoint: 575,
        options: {
            
        }
    }]
    
} 

const  RevenueChart = () => { 
    const chartRef = useRef();
    const dataSeries = (seriesType) =>{   
        var columnData = [];       
        var areaData = [];
        switch(seriesType) {
            case "daily":
                columnData = [20, 25, 20, 50, 30, 30, 20,40,40, 20, 35];            
                break;
            case "week":
                columnData = [20, 50, 40, 52, 10, 50, 20, 30, 70, 10, 60];    
                break;
            case "month":
                columnData = [30, 20, 80, 52, 10, 90, 50, 30, 75, 20, 60];
                break;
            default:
              columnData = [20, 25, 20, 50, 30, 30, 20,40,40, 20, 35];              
            }
        chartRef.current.chart.ctx.updateSeries([
            {
              name: "Revenue",
              type: 'area',
              data: columnData
            },
            {
                name: 'Revenue-2',
                type: 'area',
                data: areaData
            }
        ]);
     }
    
    return (
        <Tab.Container  defaultActiveKey={'Daily'}>
            <div className="card-header border-0 pb-0">
                <h3 className="h-title">Revenue</h3>							
                <Nav as="ul" className="revnue-tab nav nav-tabs" id="myTab" role="tablist">
                    <Nav.Item as="li">
                        <Nav.Link  eventKey="Daily" onClick={()=>dataSeries('daily')}>Daily</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="Weekly" onClick={()=>dataSeries('week')}>Weekly</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link eventKey="Monthly" onClick={()=>dataSeries('month')}>Monthly</Nav.Link>
                    </Nav.Item>
                </Nav>							
            </div>
            <div className="card-body pb-0">
                <div className="d-flex flex-wrap">
                    <span className="d-flex align-items-center me-2">
                        <svg className="me-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.108032" y="0.5" width="13" height="13" rx="4" fill="#1921FA"/>
                        </svg>
                            Income
                        <h5 className="mb-0 mx-2">$23,445</h5>
                        <span className="text-success ">+0.4%</span>
                    </span>
                    <span className="application d-flex align-items-center ms-me-5 ms-0">
                        <svg className="me-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.108032" y="0.5" width="13" height="13" rx="4" fill="#FF3D3D"/>
                        </svg>
                        Expense	
                        <h5 className="mb-0 mx-2">$8,345</h5>
                        <span className="text-danger ">+0.4%</span>
                    </span>
                </div>
                <div id="activityz">
                    <ReactApexChart
                        options={options}
                        series={series}
                        ref={chartRef}
                        type="area"
                        height={300}
                    />
                </div>

            </div>
        </Tab.Container>
        
    );
  
}
export default RevenueChart;
