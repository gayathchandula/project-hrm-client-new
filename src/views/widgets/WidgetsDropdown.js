import React, { useEffect, useState} from 'react';
import {
  CRow,
  CCol,
  CContainer,
  CWidgetProgress, CCard, CCardHeader, CCardBody, CHeaderNavLink, CProgress, CBadge, CSpinner,
} from '@coreui/react'

import axios from 'axios';
import {CChartPie} from "@coreui/react-chartjs";
const WidgetsDropdown = () => {

  const [listData, setListData] = useState({ lists: [] });
  const [Daycount, setDaycount] = useState({ lists: [] });
  const [Ot, setOt] = useState({ lists: [] } );
  const [department, setdepartment] = useState({ lists: [] });
  const[leaveAllStats,setleaveAllStats] = useState({ lists: [] });
  const [loading, setLoading] = useState(true);
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
      setOt( { lists: result.data.data.organization.overtimeStatics[0]});
      setleaveAllStats({ lists: result.data.data.organization.leaveAllStats[0]});
      setdepartment({ lists: result.data.data.organization.departmentEmp});
      setLoading(false);

      console.log(result.data.data)
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <div style={{ padding: "10px 20px", textAlign: "center"}}>
        <CSpinner />
      </div>
    )
  }
  // render
  return (
    <CContainer>
      <CRow>
      <CCol xs="12" sm="6" lg="3">
        <CWidgetProgress inverse color="success" variant="inverse" value={Daycount.lists.totalEmployees} header={Daycount.lists.totalEmployees} text="Total Employees" footer={
          <CHeaderNavLink style={{ color: "inherit" , textDecoration:"none"} } to="/Empdetails">View More Details</CHeaderNavLink>}/>

      </CCol>
      <CCol xs="12" sm="6" lg="3">
        <CWidgetProgress inverse color="info" variant="inverse" header={Daycount.lists.presentCounts} value={Daycount.lists.presentCounts} text="Total Present" footer={
          <CHeaderNavLink style={{ color: "inherit" , textDecoration:"none"} } to="/Empdetails">View More Details</CHeaderNavLink>}/>
      </CCol>
      <CCol xs="12" sm="6" lg="3">
        <CWidgetProgress inverse color="warning" variant="inverse" value={Daycount.lists.absentCount} header={Daycount.lists.absentCount} text="Total Absent" footer={
          <CHeaderNavLink style={{ color: "inherit" , textDecoration:"none"} } to="/Empdetails">View More Details</CHeaderNavLink>}/>
      </CCol>

      <CCol xs="12" sm="6" lg="3">
        <CWidgetProgress inverse color="danger" variant="inverse" value={flagged} header={flagged}  text="High Temperature Employees" footer="View More Details"/>
      </CCol>
      </CRow>
      <CRow>
      <CCol xs="12" sm="6" lg="3">
        <CWidgetProgress inverse color="danger" variant="inverse" value={listData.lists.unauthorizedCount} header={listData.lists.unauthorizedCount}  text="Unauthorized Leaves" footer={
          <CHeaderNavLink style={{ color: "inherit" , textDecoration:"none"} } to="/Chartsleave">View More Details</CHeaderNavLink>}/>
      </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress inverse color="danger" variant="inverse" value={Ot.lists.accepted} header={listData.lists.unauthorizedCount}  text="Over Time" footer={
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
            <CHeaderNavLink to="/Chartsleave">View More Details</CHeaderNavLink>
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
            <CHeaderNavLink to="/Empdetails">View More Details</CHeaderNavLink>
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
        <CCol >
          <CCard>
            <CCardHeader>
              OverTime stats
            </CCardHeader>
            <CCardBody>
              <CHeaderNavLink to="/Chartsot">View More Details</CHeaderNavLink>
              <CChartPie
                datasets={[
                  {
                    backgroundColor: [

                      '#42ba96',
                      '#df4759',
                      '#ffc107'
                    ],
                    data: [(Ot.lists.accepted), (Ot.lists.declined), (Ot.lists.pending)]
                  }
                ]}
                labels={[ `Accept `+ (Ot.lists.accepted), `Decline ` + (Ot.lists.declined), `Pending ` + (Ot.lists.pending)]}
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


    </CContainer>

  )
}

export default WidgetsDropdown
