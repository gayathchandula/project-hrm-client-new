import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import {Link,useHistory } from 'react-router-dom';
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CButton,
    CTabs,
    CTabContent,
    CNavItem,
    CNavLink,
    CNav,
    CTabPane,
    CForm,
    CSelect,
    CFormGroup,
    CFormText,
    CCardFooter,
    CInput,
    CInputFile,
  CSpinner,
    CLabel,
    CRow,
} from '@coreui/react'
import { DocsLink } from 'src/reusable'
import UserContext from '../../../userContext';
import usersData from '../../users/UsersData'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['id','firstName', 'lastName', 'shiftId','rfid', {
  key: 'show_details',
  label: 'Action',

  sorter: false,
  filter: false
}]

const Tables = () => {
  const [file, setFile] = useState("");
  const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [shiftId, setshiftId] = useState("");
    const [employeeTypeId, setemployeeTypeId] = useState("");
    const [rfid, setrfid] = useState("");
  const [employeeEmail, setemail] = useState("");
    const [listData, setListData] = useState({ lists: [] });
  const [listData1, setListData1] = useState({ lists: [] });
  const [listData2, setListData2] = useState({ lists: [] });
    const [loading, setLoading] = useState(true);
    const { userData, setUserData } = useContext(UserContext);
  const orgid = localStorage.getItem("id")

    const handlefile = (e) => {
      setFile(e.target.files[0]);

    };
    const onChangefirstName = (e) => {
        setfirstName(e.target.value);
    };
    const onChangelastName = (e) => {
        setlastName(e.target.value );
    };
    const onChangerfid = (e) => {
        setrfid( e.target.value );
    };
    const onChangeshiftId = (e) => {
        setshiftId( e.target.value );
    };
    const onChangeemployeeTypeId = (e) => {
        setemployeeTypeId( e.target.value );
    };
  const onChangeemail = (e) => {
    setemail( e.target.value );
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
            `https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/employeeslist`,headers
          );
          setListData({ lists: result.data.data.EmployeeList });
          console.log(result)
      };
       const fetchData1 = async () => {
        const result = await axios(
          `https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/emptypelist`,headers
        );
        setListData1({ lists: result.data.data.EmployeeTypeDetails });
        console.log(result)
    };
      const fetchData2 = async () => {
        const result = await axios(
          `https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/shifttypes`,headers
        );
        setListData2({ lists: result.data.data.shiftDetails });
        setLoading(false);
        console.log(result)
    };

      fetchData();
      fetchData1();
      fetchData2();
  }, []);
    const onSubmit = async (data) => {


        const body = ({firstName, lastName,rfid,shiftId,employeeTypeId,employeeEmail} );


    const headers = {
        headers: {

          "Authorization":`Bearer ${token}`
        }
    };

    axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/employees`, body, headers)
    .then((res) => {
        if (res.status === 200) {
          window.location.reload();
            alert('upload success');
        }
    }).catch((err) => {
        console.error(err);
        alert('Error please try again');
    });
    };
    const onFileSubmit = async () => {
      const data = new FormData()
      data.append('file', file)
  const headers = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
  };

  axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/upload`, data, headers)
  .then((res) => {
      if (res.status === 200) {
        window.location.reload();
          alert('upload success');
      }
  }).catch((err) => {
      console.error(err);
      alert('Error please try again');
  });
  };


    const onDelete = async (rfid) => {


      const body = ({rfid} );


  const headers = {
      headers: {

        "Authorization":`Bearer ${token}`
      }
  };

  axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/employeeslist/delete`, body, headers)
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

   if (loading) {
    return (
      <div style={{ padding: "10px 20px", textAlign: "center"}}>
    <CSpinner />
    </div>
    )
  }
  return (

    <>
     <CTabs activeTab="Employeeform">
      <CNav variant="tabs">
        <CNavItem>
          <CNavLink data-tab="Employeeform">
            Employee
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink data-tab="file">
            Employee upload
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent>
      <CTabPane data-tab="Employeeform">
    <CRow>
        <CCol xs="12" md="10">
            <CCard>
              <CCardHeader>
                Employee Form
              </CCardHeader>
              <CCardBody>
                <CForm action="submit" method="post"  className="form-horizontal">



                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">First Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="text-input" placeholder="First Name" value={firstName} onChange={onChangefirstName}/>
                      <CFormText>Type your first name</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Last Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="text-input" placeholder="Last Name" value={lastName} onChange={onChangelastName} />
                      <CFormText>Type your last name</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Employee Type</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <CSelect
                  name="Countries"
                  onChange={e => onChangeemployeeTypeId(e)}
                  value={employeeTypeId}
                  >
                  <option selected>Select the Employee type</option>
                    {listData1.lists.map((country, key) => (
            <option key={key} value={country.id}>
              {country.Employee_type}
            </option>
          ))}
                  </CSelect>
                      <CFormText>Select your Employee type</CFormText>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Shift Type</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <CSelect
                  name="Countries"
                  onChange={onChangeshiftId}
                  value={shiftId}
                  >
                  <option selected>Select the Shift</option>
                    {listData2.lists.map((country, key) => (
            <option key={key} value={country.id}>
              {country.shiftName}
            </option>
          ))}
                  </CSelect>
                      <CFormText>Select your shift type</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">RFID</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <CInput id="text-input" name="text-input" placeholder="RFID" value={rfid} onChange={onChangerfid} />
                      <CFormText>Type your RFID</CFormText>
                  </CCol>
                </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="select">Password</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="text-input" placeholder="email" value={employeeEmail} onChange={onChangeemail} />
                      <CFormText>Type your Email</CFormText>
                    </CCol>
                  </CFormGroup>



                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton type="submit" size="lg" color="primary" onClick={onSubmit}> Submit</CButton>

              </CCardFooter>
            </CCard>

          </CCol>

        <CCol >
          <Link to="/AddEmployeeType">
            <CButton color="primary" className="mt-3" active tabIndex={-1}>Add New Employee Catergory </CButton>
          </Link>
        </CCol>

    </CRow>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Employee Table
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
                  'show_details':
          (item, index)=>{
            return (

              <td className="py-2">
                <CButton
                  color="danger"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={()=>{onDelete(item.rfid)}}

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
      </CTabPane>
      <CTabPane data-tab="file">
      <CRow>
        <CCol xs="12" md="10">
            <CCard>
              <CCardHeader>
                Employee File Upload
              </CCardHeader>
              <CCardBody>
                <CForm action="submit" method="post"  className="form-horizontal">
                <CFormGroup row>
                  <CLabel col md={3}>Custom file input</CLabel>
                  <CCol xs="12" md="9">
                    <CInputFile custom id="custom-file-input" variant="custom-file" type="file" placeholder="Choose your CSV"   onChange={handlefile}/>
                    <CLabel htmlFor="custom-file-input" variant="custom-file" type="file" >
                      {file.name}
                    </CLabel>
                  </CCol>
                </CFormGroup>

                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton type="submit" size="lg" color="primary" onClick={onFileSubmit}> Submit</CButton>

              </CCardFooter>
            </CCard>

          </CCol>
          </CRow>
      </CTabPane>
      </CTabContent>
    </CTabs>
    </>
  )
}

export default Tables
