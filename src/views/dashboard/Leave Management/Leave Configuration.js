import React, { useEffect, useState} from 'react';
import axios from 'axios';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CButton,
  CForm,
  CSelect,
  CFormGroup,
  CFormText,
  CCardFooter,
  CLabel,
  CRow, CAlert,
} from '@coreui/react'


const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['id','employeeTypeId', 'leavetypeId', 'numberOfDays',{
  key: 'show_details',
  label: 'Action',

  sorter: false,
  filter: false
}]

const Tables = () => {
  const [leavetypeId, setleavetypeId] = useState([]);
  const [otHrsMin, setotHrsMin] = useState([]);
  const [incharge_email, setincharge_email] = useState([]);
  const [employeeTypeId, setemployeeTypeId] = useState([]);
  const [numberOfDays, setnumberOfDays] = useState([]);
  const [err, setErr] = useState();
  const [listData, setListData] = useState({ lists: [] });
  const [listData1, setListData1] = useState({ lists: [] });
  const [listData2, setListData2] = useState({ lists: [] });
  const [leaveTypeList, setLeaveTypeList] = useState([]);
  const token = localStorage.getItem("Token")
  const orgid = localStorage.getItem("id")
  const [data,setdata] = useState([{
    leavetypeId:"",
    numberOfDays:"",


}]);

  const onChangeemploy_type = (e) => {
    setemployeeTypeId( e.target.value );
  };




  const onSelect1Change=(e) =>{
    setdata({
      ...data,
      numberOfDays: e.target.value
    })


  }
  function removeDuplicates(arr) {
    const map = new Map();
    arr.forEach(v => map.set(v.leaveTypeId, v)) // having `departmentName` is always unique
    return [...map.values()];
  }

  const onSelect2Change=(countryId, e)=> {
    setLeaveTypeList([...leaveTypeList, { leaveTypeId: countryId , numberOfDay: e.target.value}]);
  }

  const headers = {
    headers: {

      "Authorization":`Bearer ${token}`
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/LeaveTypes/list`,headers
      );
      setListData({ lists: result.data.data.LeaveTypesDetails });

    };
    const fetchData1 = async () => {
        const result = await axios(
          `https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/emptypelist`,headers
        );
        setListData1({ lists: result.data.data.EmployeeTypeDetails  });
        console.log(result)
    };
    const fetchData2 = async () => {
      const result = await axios(
        `https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/LeaveConfig/list`,headers
      );
      setListData2({ lists: result.data.data.LeaveConfigsDetails});

    };
    fetchData();
    fetchData1();
    fetchData2();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    console.log(leavetypeId, numberOfDays);
    try{
      const returnLeaveTypeList = removeDuplicates(leaveTypeList);
      const body = ({returnLeaveTypeList,employeeTypeId} );
      const loginResponse = await axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/LeaveConfig/create`, body,headers);
      console.log(loginResponse);
      setotHrsMin('')
      setemployeeTypeId('' )
      setincharge_email('')

      window.location.reload();
    } catch(err) {
      console.log(err);
      err.response.data.message && setErr(err.response.data.message)
    }
  };

  const onDelete = async (id) => {


    const body = ({id} );


const headers = {
    headers: {

      "Authorization":`Bearer ${token}`
    }
};

axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/LeaveConfig/Delete`, body, headers)
.then((res) => {
    if (res.status === 200) {
      window.location.reload();
        alert('delete success');

    }
}).catch((err) => {
    console.error(err);
    alert('Error please try again');
});
};

  return (

    <>
    <CRow>
        <CCol xs="12" md="6">
            <CCard>
              <CCardHeader>
                Leave Configuration Form
              </CCardHeader>
              <CCardBody>
                {err ? (
                  <CAlert color="info" closeButton fade={5}>
                    {err}
                  </CAlert>
                ) : null}
                <CForm action="submit" method="post"  className="form-horizontal">

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Employee Type</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                   <CSelect
                  name="Countries"
                  onChange={onChangeemploy_type}
                  value={employeeTypeId}
                  >
                    {listData1.lists.map((country, key) => (
            <option key={key} value={country.id}>
              {country.Employee_type}
            </option>
          ))}
                  </CSelect>
                      <CFormText>Please Select Employee type</CFormText>
                  </CCol>
                </CFormGroup>

                  {listData.lists.map((country, key) => (
                    <>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="select">Leave Type</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect
                        name="Countries"
                        onChange={onSelect1Change}
                        value={leaveTypeList.leavetypeId}
                      >
                        <option value="">Select leave type</option>
                          <option key={key} value={country.id}>
                            {country.LeaveTypeName}
                          </option>

                      </CSelect>
                      <CFormText>Please Select Leave type</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row >
                    <CCol md="3">
                      <CLabel htmlFor="text-input">No of Days</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect custom name="numberOfDays" onChange={(e) => onSelect2Change(country.id, e)} value={leaveTypeList.numberOfDays}>
                        <option value="0">0-20 days</option>
                        <option value="1" >1</option>
                        <option value="2" >2</option>
                        <option value="3" >3</option>
                        <option value="4" >4</option>
                        <option value="5" >5</option>
                        <option value="6" >6</option>
                        <option value="7" >7</option>
                        <option value="8" >8</option>
                        <option value="9" >9</option>
                        <option value="10" >10</option>
                        <option value="11" >11</option>
                        <option value="12" >12</option>
                        <option value="13" >13</option>
                        <option value="14" >14</option>
                        <option value="15" >15</option>
                        <option value="16" >16</option>
                        <option value="17" >17</option>
                        <option value="18" >18</option>
                        <option value="19" >19</option>
                        <option value="20" >20</option>

                      </CSelect>
                      <CFormText>select between 0-30 days</CFormText>
                    </CCol>
                  </CFormGroup>

                    </>
                  ))}


                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton type="submit" size="lg" color="primary" onClick={submit}> Submit</CButton>

              </CCardFooter>
            </CCard>

          </CCol>
    </CRow>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
            All Leave Type Table
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={listData2.lists}
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
                  'show_details':
          (item, index)=>{
            return (

              <td className="py-2">
                <CButton
                  color="danger"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={()=>{onDelete(item.id)}}

                >
                  Delete
                </CButton>
              </td>
            )
          }
              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

    </>
  )
}

export default Tables
