import React, { useEffect, useState} from "react";
import axios from "axios";
import {
  CBadge,
  CCard,
  CCardBody,
  CButton,
  CCardHeader,
  CCol,
  CSpinner,
  CDataTable,
  CRow
} from '@coreui/react'


const getBadge = reviewstatusId => {
  switch (reviewstatusId) {
    case 1 : return 'success'
    case 2 : return 'danger'
    case 3 : return 'warning'

    default: return 'primary'
  }
}

const fields = ['leavetype',{
  key:'employeeName',
  label: 'Name'
},{
  key:'employeeepf',
  label: 'EPF No'
},'leaveRequestedDate','numberOfDays','reason',{
  key: 'show_details',
  label: 'Action',

  sorter: false,
  filter: false
}]
const fields1 = [{
  key:'employeeName',
  label: 'Name'
},{
  key:'employeeepf',
  label: 'EPF No'
},'leavetype','leaveRequestedDate','numberOfDays','reason','reviewstatusId']
const Tables = () => {
  const [listData, setListData] = useState({ lists: [] });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("Token")
  const orgid = localStorage.getItem("id")
  const headers = {
      headers: {

          "Authorization":`Bearer ${token}`
      }
  };

  useEffect(() => {
      const fetchData = async () => {
          const result = await axios.get(
            `https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/leaveRequests/pending`,headers
          );
          setListData({ lists: result.data.data.allPendingDetails });
          setLoading(false);
      };


    fetchData();

  }, []);

  const Submit = async (OTLogId) => {
    const reviewStatus = 1 ;


    try{
        const body = ({reviewStatus,OTLogId});
        const loginResponse = await axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/leaveRequests/update`, body,headers);
        console.log(loginResponse);
      window.location.reload();

    } catch(err) {
        //err.response.data.message&& setErr(err.response.data.message)
    }

};
const SubmitDecline = async (OTLogId) => {
    const reviewStatus = 2 ;


    try{
        const body = ({reviewStatus,OTLogId});
        const loginResponse = await axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/leaveRequests/update`, body,headers);
        console.log(loginResponse);
      window.location.reload();

    } catch(err) {
        //err.response.data.message&& setErr(err.response.data.message)
    }

};

if (loading) {
    return <CSpinner />
  }
  return (
    <>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Leave Acceptance Table
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={listData.lists}
              fields={fields}
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              scopedSlots = {{
                'status':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  ),
                'leavetype':
                  (item) => (
                    <td> {item.leavetypes.LeaveTypeName} </td>
                  ),
                  'show_details':
          (item, index)=>{
            return (
            <tr>
              <td className="py-2">
                <CButton
                  data-testid="toggle"
                  color="success"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={()=>{Submit(item.id)}}

                >
                  Accept
                </CButton>
              </td>
                <td className="py-2">
                <CButton
                  color="danger"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={()=>{SubmitDecline(item.id)}}

                >
                  Decline
                </CButton>
             </td>
             </tr>
              )
          },
              }}

            ></CDataTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>


    </>
  )
}

export default Tables
