import React, { useEffect, useState} from 'react';
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CWidgetProgress,
} from '@coreui/react'

import axios from 'axios';
const WidgetsDropdown = () => {

  const [listData, setListData] = useState({ lists: [] });
  const [Daycount, setDaycount] = useState({ lists: [] });
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

      console.log(result.data.data.organization.totalEmployees)
    };
    fetchData();
  }, []);

  // render
  return (
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
        <CWidgetProgress inverse color="danger" variant="inverse" value={flagged} header={flagged}  text="OT Employee" footer="View More Details"/>
      </CCol>

      {/* <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={listData.lists.totalEmployees}
          text="Total Employees"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[65, 59, 84, 84, 51, 55, 40]}
              pointHoverBackgroundColor="primary"
              label="Members"
              labels="months"
            />
          }
        >

        </CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header="1"
          text="Total Absent"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[1, 18, 9, 17, 34, 22, 11]}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 }}}}
              label="Members"
              labels="months"
            />
          }
        >

        </CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header={listData.lists.totalEmployees}
          text="Total Present"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{height: '70px'}}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[78, 81, 80, 45, 34, 12, 40]}
              options={{ elements: { line: { borderWidth: 2.5 }}}}
              pointHoverBackgroundColor="warning"
              label="Members"
              labels="months"
            />
          }
        >

        </CWidgetDropdown>
      </CCol>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header="5"
          text="Employees OT"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{height: '70px'}}
              backgroundColor="rgb(250, 152, 152)"
              label="Members"
              labels="months"
            />
          }
        >

        </CWidgetDropdown>
      </CCol> */}
    </CRow>
  )
}

export default WidgetsDropdown
