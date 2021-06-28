import React, {lazy, useState,useEffect} from 'react'
import {groupBy, intersection,map}  from  'lodash'
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
  CLabel,
  CWidgetBrand,
  CCallout, CSpinner
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
import ChartLineSimple from '../../charts/ChartLineSimple'
import CIcon from '@coreui/icons-react'

import MainChartExample from '../../charts/MainChartExample.js'
import axios from "axios";
import {Line} from "react-chartjs-2";

const WidgetsDropdown = lazy(() => import('../../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../../widgets/WidgetsBrand.js'))

const Dashboard = () => {

  const [Daycount, setDaycount] = useState({ lists: [] });
  const [department, setdepartment] = useState([] );
  const[leaveAllStats,setleaveAllStats] = useState({ lists: [] });
  const [departmentName, setdepartmentName] = useState([] );
  const [departmentcount, setdepartmentcount] = useState([] );
  const [shiftcount, setshiftcount] = useState([] );
  const [shiftName, setshiftName] = useState([] );
  const [listData, setListData] = useState({ lists: [] });
  const [empshift, setempshift] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unauthorizedCount, setunauthorizedCount] = useState([]);
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
      const x = result.data.data.organization.departmentEmp;
      const y = result.data.data.organization.shiftEmp;
      let chartshiftData = [];
      let chartshiftlabel = [];
      let chartData = [];
      let chartlabel = [];
      x.forEach(element => {
        chartData.push(element.departmentName);
      });
      x.forEach(element => {
        chartlabel.push(element.DepTotalCount);
      });
      y.forEach(element => {
        chartshiftlabel.push(element.shiftName);
      });
      y.forEach(element => {
        chartshiftData.push(element.ShiftPresent);
      });
      console.log(result.data.data.organization)
      setListData({ lists: result.data.data.organization});
      setempshift(result.data.data.organization.shiftEmp);
      setDaycount({ lists: result.data.data.organization.dayCounts[0]});
      setleaveAllStats({ lists: result.data.data.organization.leaveAllStats[0]});
      setdepartment(  result.data.data.organization.departmentEmp);
      setunauthorizedCount(  result.data.data.organization.unauthorizedCount);
      setdepartmentName(chartData);
      setdepartmentcount(chartlabel);
      setshiftName(chartshiftlabel);
      setshiftcount(chartshiftData);
      console.log(chartlabel)
      setLoading(false);
    };
    fetchData();
  }, []);





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

  if (loading) {
    return (
      <div style={{ padding: "10px 20px", textAlign: "center"}}>
        <CSpinner />
      </div>
    )
  }
  return (
    <>
      <h4>Detailed Attendence Dashboard</h4>
      <CHeaderNavLink to="/dashboard"></CHeaderNavLink> <br></br>

      <CRow>
        <CCol>
          <CWidgetProgressIcon
            header={Daycount.lists.totalEmployees}
            text="Employees"
            color="gradient-info"
            inverse
          >
            <CIcon name="cil-people" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol >
          <CWidgetProgressIcon
            header={Daycount.lists.presentCounts}
            text="Total Present"
            color="gradient-success"
            inverse
          >
            <CIcon name="cil-userFollow" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol >
          <CWidgetProgressIcon
            header={leaveAllStats.lists.accepted}
            text="Authorized Leaves"
            color="gradient-warning"
            inverse
          >
            <CIcon name="cil-basket" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
        <CCol >
          <CWidgetProgressIcon
            header={unauthorizedCount}
            text="Unauthorized Leaves"
            color="gradient-danger"
            inverse
          >
            <CIcon name="cil-speedometer" height="36"/>
          </CWidgetProgressIcon>
        </CCol>
      </CRow>

      <CCard>

        <CCardHeader>
          Employees on Departments
        </CCardHeader>
        <CCardBody>
          <CRow>
            {department.map((country, key) => (
              <CCol sm="4" lg="2">
                <CWidgetBrand color="linkedin" rightHeader={country.DepTotalCount} rightFooter="Total" leftHeader={country.DepPresentCount} leftFooter="Present">
                  <CLabel>{country.departmentName}</CLabel>
                </CWidgetBrand>
              </CCol>
            ))}
          </CRow>
        </CCardBody>

      </CCard>

      <CCard>
        <CCardHeader>
          Employees on Shift
        </CCardHeader>
        <CCardBody>
          <CRow>
            {empshift.map((country, key) => (
              <CCol sm="4" lg="2">
                <CWidgetBrand color="linkedin" rightHeader={country.empTotalCount} rightFooter="Total" leftHeader={country.ShiftPresent} leftFooter="Present">
                  <CLabel>{country.shiftName}</CLabel>
                </CWidgetBrand>
              </CCol>
            ))}
          </CRow>
        </CCardBody>
      </CCard>

      {/*<CCardGroup columns className = "cols-1" >*/}

      {/*  <CCard>*/}

      {/*    <CCardHeader>*/}
      {/*      Absentism last 7 days*/}
      {/*    </CCardHeader>*/}
      {/*    <CCardBody>*/}
      {/*      <CChartPie*/}
      {/*        datasets={[*/}
      {/*          {*/}
      {/*            backgroundColor: [*/}
      {/*              '#41B883',*/}
      {/*              '#E46651',*/}
      {/*              '#00D8FF',*/}
      {/*              '#DD1B16'*/}
      {/*            ],*/}
      {/*            data: [4, 2, 8, 1]*/}
      {/*          }*/}
      {/*        ]}*/}
      {/*        labels={['6th June', '5th June', '4th June', '3rd June']}*/}
      {/*        options={{*/}
      {/*          tooltips: {*/}
      {/*            enabled: true*/}
      {/*          }*/}
      {/*        }}*/}
      {/*      />*/}
      {/*    </CCardBody>*/}
      {/*  </CCard>*/}


        <CCard>
          <CCardHeader>
            Employees on Departments
          </CCardHeader>
          <CCardBody>
            <CChartBar
              datasets={[
                {
                  label: 'Total Employees on Department',
                  backgroundColor: '#3f83ef',
                  data: departmentcount
                }
              ]}
              labels={departmentName}
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
          Employees on Shifts
        </CCardHeader>
        <CCardBody>
          <CChartBar
            datasets={[
              {
                label: 'Total Employees on Shifts',
                backgroundColor: '#175087',
                data: shiftcount
              }
            ]}
            labels={shiftName}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>

      {/*  <CCard>*/}
      {/*    <CCardHeader>*/}
      {/*      Leave Per Month Bar Chart*/}
      {/*    </CCardHeader>*/}
      {/*    <CCardBody>*/}
      {/*      <Line data={data} options={options} />*/}
      {/*    </CCardBody>*/}
      {/*  </CCard>*/}

      {/*  <CCard>*/}
      {/*    <CCardHeader>*/}
      {/*      No of Leaves*/}
      {/*    </CCardHeader>*/}
      {/*    <CCardBody>*/}
      {/*      <CChartBar*/}
      {/*        labels="months"*/}

      {/*        datasets={[*/}
      {/*          {*/}

      {/*            label: 'No of leaves',*/}
      {/*            backgroundColor: '#f87979',*/}
      {/*            data: [40, 20, 12, 39, 10, 40, 39, 200, 40, 20, 12, 11]*/}
      {/*          },*/}
      {/*          {*/}
      {/*            label: 'No of something',*/}
      {/*            backgroundColor: '#00D8FF',*/}
      {/*            data: [40, 20, 12, 39, 10, 40, 39, 200, 40, 20, 12, 11]*/}
      {/*          }*/}
      {/*        ]}*/}
      {/*        labels="months"*/}
      {/*        options={{*/}
      {/*          tooltips: {*/}
      {/*            enabled: true*/}
      {/*          }*/}
      {/*        }}*/}
      {/*      />*/}
      {/*    </CCardBody>*/}
      {/*  </CCard>*/}


      {/*  <CCard>*/}
      {/*    <CCardHeader>*/}
      {/*      Pie Chart*/}
      {/*    </CCardHeader>*/}
      {/*    <CCardBody>*/}
      {/*      <CChartPie*/}
      {/*        datasets={[*/}
      {/*          {*/}
      {/*            backgroundColor: [*/}
      {/*              '#41B883',*/}
      {/*              '#E46651',*/}
      {/*              '#00D8FF',*/}
      {/*              '#DD1B16'*/}
      {/*            ],*/}
      {/*            data: [40, 20, 80, 10]*/}
      {/*          }*/}
      {/*        ]}*/}
      {/*        labels={['VueJs', 'EmberJs', 'ReactJs', 'AngularJs']}*/}
      {/*        options={{*/}
      {/*          tooltips: {*/}
      {/*            enabled: true*/}
      {/*          }*/}
      {/*        }}*/}
      {/*      />*/}
      {/*    </CCardBody>*/}
      {/*  </CCard>*/}
      {/*  <CCard>*/}
      {/*    <CCardHeader>*/}
      {/*      Leave Comparison Line Chart*/}
      {/*    </CCardHeader>*/}
      {/*    <CCardBody>*/}
      {/*      <CChartLine*/}
      {/*        datasets={[*/}
      {/*          {*/}
      {/*            label: '2020',*/}
      {/*            backgroundColor: 'rgb(228,102,81,0.9)',*/}
      {/*            data: [30, 39, 10, 50, 30, 70, 35]*/}
      {/*          },*/}
      {/*          {*/}
      {/*            label: '2021',*/}
      {/*            backgroundColor: 'rgb(0,216,255,0.9)',*/}
      {/*            data: [80, 39, 40, 35, 40, 20, 45]*/}
      {/*          }*/}
      {/*        ]}*/}
      {/*        options={{*/}
      {/*          tooltips: {*/}
      {/*            enabled: true*/}
      {/*          }*/}
      {/*        }}*/}
      {/*        labels="months"*/}
      {/*      />*/}
      {/*    </CCardBody>*/}
      {/*  </CCard>*/}
      {/*  <CCard>*/}
      {/*    <CCardHeader>*/}
      {/*      Doughnut Chart*/}
      {/*    </CCardHeader>*/}
      {/*    <CCardBody>*/}
      {/*      <CChartDoughnut*/}
      {/*        datasets={[*/}
      {/*          {*/}
      {/*            backgroundColor: [*/}
      {/*              '#41B883',*/}
      {/*              '#E46651',*/}
      {/*              '#00D8FF',*/}
      {/*              '#DD1B16'*/}
      {/*            ],*/}
      {/*            data: [40, 20, 80, 10]*/}
      {/*          }*/}
      {/*        ]}*/}
      {/*        labels={['Paid Leaves', 'On Site', 'Work from home', 'Unpaid Leaves']}*/}
      {/*        options={{*/}
      {/*          tooltips: {*/}
      {/*            enabled: true*/}
      {/*          }*/}
      {/*        }}*/}
      {/*      />*/}
      {/*    </CCardBody>*/}
      {/*  </CCard>*/}

      {/*</CCardGroup>*/}
    </>
  )
}

export default Dashboard

