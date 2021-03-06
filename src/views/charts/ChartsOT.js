import React, {lazy, useState} from 'react'
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
  CProgress,
  CWidgetSimple,
  CRow,
  CBadge,
  CButton,
  CButtonGroup,
  CWidgetProgressIcon,
  CCallout
} from '@coreui/react'
import {
  CChartBar,
  CChartLine,
  CChartDoughnut,
  CChartRadar,
  CChartPie,
  CChartPolarArea
} from '@coreui/react-chartjs'
import { DocsLink } from 'src/reusable'
import ChartLineSimple from '../charts/ChartLineSimple'
import CIcon from '@coreui/icons-react'

import MainChartExample from '../charts/MainChartExample.js'
import axios from "axios";

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {

  const [Daycount, setDaycount] = useState({ lists: [] });
  const [department, setdepartment] = useState({ lists: [] });
  const[leaveAllStats,setleaveAllStats] = useState({ lists: [] });
  const [listData, setListData] = useState({ lists: [] });
  const [flagged, setflagged] = useState();
  const token = localStorage.getItem("Token")
  const orgid = localStorage.getItem("id")
  const headers = {
    headers: {

      "Authorization":`Bearer ${token}`
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/summary`,headers
      );
      setListData({ lists: result.data.data.organization});
      setflagged(result.data.data.organization.flaggedEmployees);
      setDaycount({ lists: result.data.data.organization.dayCounts[0]});
      setleaveAllStats({ lists: result.data.data.organization.leaveAllStats[0]});
      setdepartment({ lists: result.data.data.organization.departmentEmp});

      console.log(result.data.data)
    };
    fetchData();
  }, []);
  return (
    <>
      <h4>Detailed Over Time Dashboard</h4>
      <CHeaderNavLink to="/dashboard"></CHeaderNavLink> <br></br>

      <CRow>
        <CCol >
          <CWidgetSimple header="Total Shifts" text="3" color="success">
          </CWidgetSimple>
        </CCol>
        <CCol sm="4" lg="2">
          <CWidgetSimple header="OT Hours- SHIFT 1" text="11">
          </CWidgetSimple>
        </CCol>
        <CCol sm="4" lg="2">
          <CWidgetSimple header="OT SHIFT 2" text="13">

          </CWidgetSimple>
        </CCol>
        <CCol sm="4" lg="2">
          <CWidgetSimple header="OT SHIFT 3" text="0">

          </CWidgetSimple>
        </CCol>
        <CCol sm="4" lg="2">
          <CWidgetSimple header="Total OT Hours" text="14">

          </CWidgetSimple>
        </CCol>
        <CCol sm="4" lg="2">
          <CWidgetSimple header="Balance OT hours" text="10">

          </CWidgetSimple>
        </CCol>
      </CRow>

      <CCardGroup columns className = "cols-1" >

        <CCard>

          <CCardHeader>
            OT Hours last 7 days
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






        {/* <ccard>
        <CCardHeader>
        </CCardHeader>
        <CCardBody>
          <CChartBar
          labels:labels

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
          </CChartBar>
        </CCardBody>
      </ccard> */}



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

      <CCardGroup columns className="cols-2">
        <CCard>
          <CCardHeader>
            OT Per Month Bar Chart
            <DocsLink href="https://www.chartjs.org"/>
          </CCardHeader>
          <CCardBody>
            <CChartBar
              datasets={[
                {
                  label: 'No of Hours',
                  backgroundColor: '#f87979',
                  data: [40, 20, 12, 39, 10, 40, 39, 20, 40, 20, 12, 11]
                }
              ]}

              labels="months"

              options={{
                //  aspectRatio: 1.0,

                tooltips: {
                  enabled: true
                }
              }}
            />
          </CCardBody>
        </CCard>

        <CCard>
          <CCardHeader>
            Polar Area Chart
          </CCardHeader>
          <CCardBody>
            <CChartPolarArea
              datasets={[

                {
                  label: 'My Second dataset',
                  backgroundColor: 'rgba(255,99,132,0.2)',
                  pointBackgroundColor: 'rgba(255,99,132,1)',
                  pointBorderColor: '#fff',
                  pointHoverBackgroundColor: 'rgba(255,99,132,1)',
                  pointHoverBorderColor: 'rgba(255,99,132,1)',
                  data: [75,  96, 50]
                }
              ]}
              options={{
                aspectRatio: 2.0,
                tooltips: {
                  enabled: true
                }
              }}
              labels={[
                'Shift A', 'Shift B', 'Shift C'
              ]}
            />
          </CCardBody>
        </CCard>

      </CCardGroup>




    </>
  )
}

export default Dashboard

