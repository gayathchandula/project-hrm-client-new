import {CCard, CCardBody, CCardHeader, CCol, CRow} from "@coreui/react";
import {Calendar, momentLocalizer} from "react-big-calendar";
import React, {useEffect, useState} from "react";
import moment from "moment";
import axios from "axios";

const Tables = () => {
  const localizer = momentLocalizer(moment);
  const [listData, setListData] = useState({ lists: [] });
  const orgid = localStorage.getItem("id")
  const token = localStorage.getItem("Token")
  const headers = {
    headers: {

      "Authorization":`Bearer ${token}`
    }
  };
  useEffect(() => {

    const fetchData = async () => {
      const result = await axios(
        `https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/overtimespecial/list`,headers
      );
      setListData({ lists: result.data.data.OTspecialReferencesDetails  });
      console.log(result)
    };
    fetchData();
  }, []);

  const events= listData.lists.map((appointment)=>{
    return {
      id: appointment.id,
      title: appointment.SpecialName,
      start: new Date(appointment.SpecialDate),
      end: new Date(appointment.SpecialDate),
      allDay: true
    }
  })
  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            Overtime Configuration Table
          </CCardHeader>
          <CCardBody>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor='start'
              endAccessor='end'
              views={['month', 'day', 'week']}
              style={{height: 450}}
            />

          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tables
