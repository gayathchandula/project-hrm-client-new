import React, { lazy } from 'react'
import {  useContext , useEffect} from 'react';
import UserContext from '../../userContext';
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCardFooter,
  CHeaderNavLink,
  CCol,
  CRow,
  CWidgetProgressIcon,
} from '@coreui/react'
import {
  CChartBar,
  CChartLine,
  CChartDoughnut,
  CChartPie,
} from '@coreui/react-chartjs'
import { DocsLink } from 'src/reusable'
import CIcon from '@coreui/icons-react'
import { Line } from 'react-chartjs-2';

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '2020',
      data: [30, 39, 10, 50, 30, 70, 35],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(228,102,81,0.9)',
    },
    {
      label: '2021',
      data: [80, 39, 40, 35, 40, 20, 45],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const Dashboard = () => {
  return (
    <>
      <h4>Detailed Attendence Dashboard</h4>
      <CHeaderNavLink to="/dashboard"></CHeaderNavLink> <br></br>

      <CRow>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="150"
            text="Employees"
            color="gradient-info"
            inverse
          >
            <CIcon name="cil-people" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="100"
            text="Total Present"
            color="gradient-success"
            inverse
          >
            <CIcon name="cil-userFollow" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="10"
            text="Authorized Leaves"
            color="gradient-warning"
            inverse
          >
            <CIcon name="cil-basket" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="5"
            text="Sick Leaves"
            color="gradient-primary"
            inverse
          >
            <CIcon name="cil-chartPie" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="5"
            text="Unauthorized Leaves"
            color="gradient-danger"
            inverse
          >
            <CIcon name="cil-speedometer" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol sm="6" md="2">
          <CWidgetProgressIcon
            header="50"
            text="Work from Home"
            color="gradient-info"
            inverse
          >
            <CIcon name="cil-speech" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
      </CRow>


      <CCardGroup columns className = "cols-1" >

        <CCard>

          <CCardHeader>
            Absentism last 7 days
          </CCardHeader>
          <CCardBody>
            <CChartPie
              datasets={[
                {
                  backgroundColor: [
                    '#41B883',
                    '#E46651',
                    '#00D8FF',
                    '#DD1B16'
                  ],
                  data: [4, 2, 8, 1]
                }
              ]}
              labels={['6th June', '5th June', '4th June', '3rd June']}
              options={{
                tooltips: {
                  enabled: true
                }
              }}
            />
          </CCardBody>
        </CCard>


        <CCard>
          <CCardHeader>
            Leave Per Month Bar Chart
          </CCardHeader>
          <CCardBody>
            <CChartBar
              datasets={[
                {
                  label: 'No of leaves',
                  backgroundColor: '#f87979',
                  data: [40, 20, 12, 39, 10, 40, 39, 20, 40, 20, 12, 11]
                }
              ]}
              labels="months"
              options={{
                tooltips: {
                  enabled: true
                }
              }}
            />
          </CCardBody>
        </CCard>

        <CCard>
          <CCardHeader>
            Leave Per Month Bar Chart
          </CCardHeader>
          <CCardBody>
            <Line data={data} options={options} />
          </CCardBody>
        </CCard>

        <CCard>
        <CCardHeader>
          No of Leaves
        </CCardHeader>
        <CCardBody>
          <CChartBar
            labels="months"

          datasets={[
            {

              label: 'No of leaves',
              backgroundColor: '#f87979',
              data: [40, 20, 12, 39, 10, 40, 39, 200, 40, 20, 12, 11]
            },
            {
              label: 'No of something',
              backgroundColor: '#00D8FF',
              data: [40, 20, 12, 39, 10, 40, 39, 200, 40, 20, 12, 11]
            }
          ]}
          labels="months"
          options={{
            tooltips: {
              enabled: true
            }
          }}
          />
        </CCardBody>
      </CCard>


        <CCard>
          <CCardHeader>
            Pie Chart
          </CCardHeader>
          <CCardBody>
            <CChartPie
              datasets={[
                {
                  backgroundColor: [
                    '#41B883',
                    '#E46651',
                    '#00D8FF',
                    '#DD1B16'
                  ],
                  data: [40, 20, 80, 10]
                }
              ]}
              labels={['VueJs', 'EmberJs', 'ReactJs', 'AngularJs']}
              options={{
                tooltips: {
                  enabled: true
                }
              }}
            />
          </CCardBody>
        </CCard>
        <CCard>
          <CCardHeader>
            Leave Comparison Line Chart
          </CCardHeader>
          <CCardBody>
            <CChartLine
              datasets={[
                {
                  label: '2020',
                  backgroundColor: 'rgb(228,102,81,0.9)',
                  data: [30, 39, 10, 50, 30, 70, 35]
                },
                {
                  label: '2021',
                  backgroundColor: 'rgb(0,216,255,0.9)',
                  data: [80, 39, 40, 35, 40, 20, 45]
                }
              ]}
              options={{
                tooltips: {
                  enabled: true
                }
              }}
              labels="months"
            />
          </CCardBody>
        </CCard>
        <CCard>
          <CCardHeader>
            Doughnut Chart
          </CCardHeader>
          <CCardBody>
            <CChartDoughnut
              datasets={[
                {
                  backgroundColor: [
                    '#41B883',
                    '#E46651',
                    '#00D8FF',
                    '#DD1B16'
                  ],
                  data: [40, 20, 80, 10]
                }
              ]}
              labels={['Paid Leaves', 'On Site', 'Work from home', 'Unpaid Leaves']}
              options={{
                tooltips: {
                  enabled: true
                }
              }}
            />
          </CCardBody>
        </CCard>

      </CCardGroup>
    </>
  )
}

export default Dashboard
