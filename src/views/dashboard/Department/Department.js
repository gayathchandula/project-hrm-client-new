import React, { useState, useEffect } from 'react';
import axios from "axios";
import CreatableSelect from 'react-select/creatable';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CButton,
  CForm,
  CFormGroup,
  CFormText,
  CCardFooter,
  CInput,
  CLabel,
  CRow, CAlert, CSpinner,
} from '@coreui/react'
import moment from 'moment';
const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['id', 'departmentName', 'createdAt', {
  key: 'show_details',
  label: 'Action',

  sorter: false,
  filter: false
}]

const Tables = () => {

  const [designationName, setDesignation] = useState("");
  const [departmentName, setDepartment] = useState("");
  const [Inchargemail, setInchargemail] = useState("");
  const [err, setErr] = useState();
  const [loading, setLoading] = useState(true);
  const [listData, setListData] = useState({ lists: [] });
  function removeDuplicates(arr) {
    const map = new Map();
    arr.forEach(v => map.set(v.departmentName, v)) // having `departmentName` is always unique
    return [...map.values()];
  }
  const orgid = localStorage.getItem("id")
  const components = {
    DropdownIndicator: null,
  };
   const onChangeDepartment = (e) => {
    setDepartment( e.target.value );
  };
  const onChangeInchargemail = (e) => {
    setDepartment( e.target.value );
  };
  const handleChange = (newValue: any, actionMeta: any) => {
    console.group('Value Changed');
    console.log(newValue);
    setDesignation( newValue );
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();

  };



  const token = localStorage.getItem("Token")
  const headers = {
    headers: {

      "Authorization":`Bearer ${token}`
    }
  };
  useEffect(() => {

    const fetchData = async () => {
      const result = await axios(
        `https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/department/get`,headers
      );
      setListData({ lists: removeDuplicates(result.data.data.departmentsDetails) });
      setLoading(false);
      console.log(result)
    };


    fetchData();


  }, []);


  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try{
      const body = ({departmentName, designationName,Inchargemail} );
      const loginResponse = await axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/department/create`, body,headers);
      console.log(loginResponse);
      const departmentId = loginResponse.data.data.savedOt.id;
      const loginResponse1 = await axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/${departmentId}/designation/create`, body,headers);
      console.log(loginResponse1);
      setDesignation('')
      setDepartment('')

    } catch(err) {
      err.response.data.message && setErr(err.response.data.message)
    }
  };

  const onDelete = async (id) => {
    const body = ({id} );


    axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/department/Delete`, body, headers)
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
          alert('delete success');
        }
      }).catch((err) => {
      console.error(err);
      err.response.data.message && setErr(err.response.data.message)

    });
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
      <CRow>
        <CCol xs="12" >
          <CCard>
            <CCardHeader align='center'>
              <b> Add Department</b>
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
                    <CLabel htmlFor="text-input">Department Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="6">
                    <CInput id="text-input" name="text-input" placeholder="Employee Type Name" value={departmentName} onChange={onChangeDepartment}/>
                    <CFormText>Enter New Department</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Department Incharge Email</CLabel>
                  </CCol>
                  <CCol xs="12" md="6">
                    <CInput id="text-input" name="text-input" placeholder="Department Email" value={Inchargemail} onChange={onChangeInchargemail}/>
                    <CFormText>Enter New Department Incharge mail</CFormText>
                  </CCol>
                </CFormGroup>
                {/*<CFormGroup row>*/}
                {/*  <CCol md="3">*/}
                {/*    <CLabel htmlFor="text-input">Designation</CLabel>*/}
                {/*  </CCol>*/}
                {/*  <CCol xs="12" md="6">*/}
                {/*    <CInput id="text-input" name="text-input" placeholder="Employee Type Name" value={designationName} onChange={onChangedesignation}/>*/}
                {/*    <CFormText>Enter New Designation</CFormText>*/}
                {/*  </CCol>*/}
                {/*</CFormGroup>*/}

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Designation</CLabel>
                  </CCol>
                  <CCol xs="12" md="6">
                    <CreatableSelect
                      isMulti
                      onChange={handleChange}

                      placeholder="Type Designation and press enter..."
                      components={components}
                    />
                    <CFormText>Enter New Designation</CFormText>
                  </CCol>
                </CFormGroup>


              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit"  size="lg" color="primary" onClick={onSubmit}> Submit</CButton>

            </CCardFooter>
          </CCard>

        </CCol>

      </CRow>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Department Table
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={listData.lists}
                fields={fields}
                columnFilter
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
                  'createdAt':
                    (item) => (
                      <td> {moment(item.createdAt).format("MMM Do YY")} </td>
                    ),
                  'updatedAt':
                    (item) => (
                      <td> {moment(item.updatedAt).format("MMM Do YY")} </td>
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
