import React, { useEffect, useState} from 'react';
import {
  CRow,
  CCol,
  CContainer,
  CWidgetProgress, CCard, CCardHeader, CCardBody, CHeaderNavLink, CProgress, CBadge,
} from '@coreui/react'

import axios from 'axios';
import {CChartPie} from "@coreui/react-chartjs";
const WidgetsDropdown = () => {

  const [listData, setListData] = useState({ lists: [] });
  const [Daycount, setDaycount] = useState({ lists: [] });
  const [department, setdepartment] = useState({ lists: [] });
  const[leaveAllStats,setleaveAllStats] = useState({ lists: [] });
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

  // render
  return (
    <CContainer>
      <CRow>
      <CCol xs="12" sm="6" lg="3">
        <CWidgetProgress inverse color="success" variant="inverse" value={Daycount.lists.totalEmployees} header={Daycount.lists.totalEmployees} text="Total Employees" footer="View More Details"/>
      </CCol>
      <CCol xs="12" sm="6" lg="3">
        <CWidgetProgress inverse color="info" variant="inverse" header={Daycount.lists.presentCounts} value={Daycount.lists.presentCounts} text="Total Present" footer="View more Details"/>
      </CCol>
      <CCol xs="12" sm="6" lg="3">
        <CWidgetProgress inverse color="warning" variant="inverse" value={Daycount.lists.absentCount} header={Daycount.lists.absentCount} text="Total Absent" footer="View More Details"/>
      </CCol>

      <CCol xs="12" sm="6" lg="3">
        <CWidgetProgress inverse color="danger" variant="inverse" value={flagged} header={flagged}  text="High Temperature Employees" footer="View More Details"/>
      </CCol>
      </CRow>
      <CRow>
      <CCol xs="12" sm="6" lg="3">
        <CWidgetProgress inverse color="danger" variant="inverse" value={listData.lists.unauthorizedCount} header={listData.lists.unauthorizedCount}  text="Unauthorized Leaves" footer="View More Details"/>
      </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress inverse color="danger" variant="inverse" value={listData.lists.unauthorizedCount} header={listData.lists.unauthorizedCount}  text="Over Time" footer={
            <CHeaderNavLink style={{ color: "inherit" , textDecoration:"none"} } to="/Chartsot">View More Details</CHeaderNavLink>}/>
        </CCol>
      </CRow>
      <CRow>
      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            Leave stats
          </CCardHeader>
          <CCardBody>
            <CHeaderNavLink to="/Chartsattendence">View More Details</CHeaderNavLink>
            <CChartPie
              datasets={[
                {
                  backgroundColor: [

                    '#42ba96',
                    '#df4759',
                    '#ffc107'
                  ],
                  data: [(leaveAllStats.lists.accepted), (leaveAllStats.lists.rejected), (leaveAllStats.lists.pending)]
                }
              ]}
              labels={[ `Accept `+ (leaveAllStats.lists.accepted), `Absent ` + (leaveAllStats.lists.rejected), `Pending ` + (leaveAllStats.lists.pending)]}
              options={{
                tooltips: {
                  enabled: true
                }
              }}
            />

          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            Attendence
          </CCardHeader>
          <CCardBody>
            <CHeaderNavLink to="/Chartsattendence">View More Details</CHeaderNavLink>
            <CChartPie
              datasets={[
                {
                  backgroundColor: [

                    '#00D8FF',
                    '#DD1B16'
                  ],
                  data: [(Daycount.lists.presentCounts), (Daycount.lists.absentCount)]
                }
              ]}
              labels={[ `Present `+ (Daycount.lists.presentCounts), `Absent ` + (Daycount.lists.absentCount)]}
              options={{
                tooltips: {
                  enabled: true
                }
              }}
            />

          </CCardBody>
        </CCard>
      </CCol>
        </CRow>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Departments
            </CCardHeader>
            <CCardBody>
              <CHeaderNavLink to="/Chartsleave">View More Details</CHeaderNavLink>
              <CRow>
                <CCol xs="12" md="6" xl="6">

                  <hr className="mt-0" />
                  {department.lists.map((country, key) => (
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                      <span className="progress-group-text">
                        {country.departmentName}
                      </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="info" value={country.DepTotalCount} />
                        <CProgress className="progress-xs" color="success" value={country.DepPresentCount} />
                        <CProgress className="progress-xs" color="warning" value={(country.DepTotalCount)-(country.DepPresentCount)}/>
                      </div>
                    </div>
                  ))}

                  <div className="legend text-center">
                    <small>
                      <sup className="px-1"><CBadge shape="pill" color="info">&nbsp;</CBadge></sup>
                      Total Employees
                      &nbsp;
                      <sup className="px-1"><CBadge shape="pill" color="success" >&nbsp;</CBadge></sup>
                      Present Employees
                      <sup className="px-1"><CBadge shape="pill" color="warning">&nbsp;</CBadge></sup>
                      Absent Employees
                    </small>
                  </div>
                </CCol>

              </CRow>

            </CCardBody>

          </CCard>
        </CCol>
      </CRow>


    </CContainer>

  )
}

export default WidgetsDropdown
