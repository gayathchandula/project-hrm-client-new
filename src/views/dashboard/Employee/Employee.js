import React, { useState, useEffect } from 'react';
import axios from "axios";
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
  CInputCheckbox,
  CSpinner,
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
const fields = ['id','firstName', 'lastName', 'shift','rfid','phone','gender','DOB', {
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
  const [accountNumber, setaccountNumber] = useState("");
    const [employeeTypeId, setemployeeTypeId] = useState("");
    const [rfid, setrfid] = useState("");
  const [employeeEmail, setemail] = useState("");
  const [departmentName, setdepartmentName] = useState("");
  const [designationName, setdesignationName] = useState("");
  const [accountHolderName, setaccountHolderName] = useState("");
  const [branchName, setbranchName] = useState("");
  const [bankName, setbankName] = useState("");
  const [epf, setepf] = useState("");
  const [gender, setgender] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [DOB, setDOB] = useState("");
  const [checkbox, setcheckbox] = useState(false);
  const [err, setErr] = useState();
    const [listData, setListData] = useState({ lists: [] });
  const [listData1, setListData1] = useState({ lists: [] });
  const [listData2, setListData2] = useState({ lists: [] });
  const [listData3, setListData3] = useState({ lists: [] });
  const [listData4, setListData4] = useState({ lists: [] });
    const [loading, setLoading] = useState(true);

  const orgid = localStorage.getItem("id")

  function removeDuplicates(arr) {
    const map = new Map();
    arr.forEach(v => map.set(v.departmentName, v)) // having `departmentName` is always unique
    return [...map.values()];
  }
    const handlefile = (e) => {
      setFile(e.target.files[0]);

    };
    const onChangefirstName = (e) => {
        setfirstName(e.target.value);
    };
  const onChangebankName = (e) => {
    setbankName(e.target.value);
  };
  const onChangeaddress = (e) => {
    setaddress(e.target.value);
  };
  const onChangephone = (e) => {
    setphone(e.target.value);
  };
  const onChangeDOB = (e) => {
    setDOB(e.target.value);
  };
  const onChangegender = (e) => {
    setgender(e.target.value);
  };
  const onChangebranchName = (e) => {
    setbranchName(e.target.value);
  };
  const onChangeaccountHolderName = (e) => {
    setaccountHolderName(e.target.value);
  };
  const onChangeepf = (e) => {
    setepf(e.target.value);
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
  const onChangeaccountNumber = (e) => {
    setaccountNumber( e.target.value );
  };
  const onChangeDesignation = (e) => {
    setdesignationName( e.target.value );
  };
  const onChangecheckbox = function(){
    const checkbox = document.getElementById('checkbox');
    if(checkbox.checked == true){
        setcheckbox(true);
      }
      if(checkbox.checked == false){
        setcheckbox(false);
      }


  };
  const onChangedepartmant = (e) => {
    e.preventDefault();
    setdepartmentName( e.target.value )
    const departmentName = (e.target.value )
    const fetchData = async () => {
        try {
          const body = ({departmentName});
          const loginResponse = await axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/department/getDesignations`, body, headers);
          console.log(loginResponse);
          setListData4({lists: loginResponse.data.data.departmentsDetails});

        } catch (err) {
          err.response.data.message&& setErr(err.response.data.message)
        }
      }
      fetchData();

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
        console.log(result)
    };
      const fetchData3 = async () => {
        const result = await axios(
          `https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/department/get`,headers
        );
        setListData3({ lists:  removeDuplicates(result.data.data.departmentsDetails) });
        setLoading(false);
      };

      fetchData();
      fetchData1();
      fetchData2();
      fetchData3();
  }, []);

    const onSubmit = async (data) => {

      setErr("");
        const body = ({firstName, lastName,rfid,shiftId,employeeTypeId,employeeEmail,accountNumber,checkbox,departmentName,designationName,accountHolderName,bankName,branchName,epf,gender,phone,address,DOB} );


    axios.post(`https://hrm-innovigent.herokuapp.com/api/v1/organizations/${orgid}/employees`, body, headers)
    .then((res) => {
        if (res.status === 200) {
          window.location.reload();
            alert('upload success');
        }
    }).catch((err) => {
        console.error(err);
      err.response.data.message && setErr(err.response.data.message)
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
      err.response.data.message && setErr(err.response.data.message)

  });
  };


    const onDelete = async (rfid) => {


      const body = ({rfid} );




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
        <CCol xs="12" md="8">
            <CCard>
              <CCardHeader>
                Employee Form
              </CCardHeader>
              <CCardBody>
                {err ? (
                  <CAlert color="info" closeButton Time={5}>
                    {err}
                  </CAlert>
                ) : null}
                <CForm action="submit" method="post"  className="form-horizontal">



                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">First Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="text-input" placeholder="First Name" value={firstName} onChange={onChangefirstName} required/>
                      <CFormText>Type your first name</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Last Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="text-input" placeholder="Last Name" value={lastName} onChange={onChangelastName} required/>
                      <CFormText>Type your last name</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Gender</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect
                        name="Countries"
                        onChange={onChangegender}
                        value={gender}
                        required
                      >
                        <option selected>Select the Gender type</option>
                        <option selected>Male</option>
                        <option selected>Female</option>

                      </CSelect>
                      <CFormText>Select your Gender type</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Mobile No</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" type="tel" pattern="[0-7]{3}-[0-9]{4}-[0-9]{2}" required name="phone" placeholder="Mobile" value={phone} onChange={onChangephone} required />
                      <CFormText>Type your Phone Number (format: 07x-xxxx-xxx)</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Address</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="text-input" type="address" autoComplete="address" placeholder="Address" value={address} onChange={onChangeaddress} required/>
                      <CFormText>Type your Address</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Date of Birth</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="text-input" type="date" placeholder="Address" value={DOB} onChange={onChangeDOB} required/>
                      <CFormText>Date of Birth</CFormText>
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
                  required
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
                  required
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
                  <CInput id="text-input" name="text-input" placeholder="RFID" value={rfid} onChange={onChangerfid} required/>
                      <CFormText>Type your RFID</CFormText>
                  </CCol>
                </CFormGroup>
                  <CFormGroup varient="checkbox" row>
                    <CCol md="3">
                      <CLabel htmlFor="select">Enable employee profile</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInputCheckbox
                        id="checkbox"
                        onChange={onChangecheckbox}
                      />
                    </CCol>
                  </CFormGroup>
                  {checkbox &&
                  <CFormGroup row>

                    <CCol md="3">
                      <CLabel htmlFor="select">Employee Email</CLabel>
                    </CCol>

                    <CCol xs="12" md="9">
                      <CInput id="text-input"  type="email" name="text-input" placeholder="email" value={employeeEmail}
                              onChange={onChangeemail}/>
                      <CFormText>Type your Email</CFormText>
                    </CCol>
                  </CFormGroup>
                  }


                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton data-testid="toggle" type="submit" size="lg" color="primary" onClick={onSubmit}>Submit</CButton>

              </CCardFooter>
            </CCard>

          </CCol>
      <CCol >
        <CCard>
          <CCardHeader>
            Department Form
          </CCardHeader>
          <CCardBody>
            <CForm action="submit" method="post"  className="form-horizontal">

              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">EPF No</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput id="text-input" name="text-input" placeholder="EPF No" value={epf} onChange={onChangeepf}/>
                  <CFormText>Type your EPF No</CFormText>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Department Type</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CSelect
                    name="Countries"
                    onChange={onChangedepartmant}
                    value={departmentName}
                  >
                    <option selected>Select the Department</option>
                    {listData3.lists.map((country, key) => (
                      <option key={key} value={country.id}>
                        {country.departmentName}
                      </option>
                    ))}
                  </CSelect>
                  <CFormText>Select your Department</CFormText>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Designation</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CSelect
                    name="Countries"
                    onChange={onChangeDesignation}
                    value={designationName}
                  >
                    <option selected>Select the Designation</option>
                    {listData4.lists.map((country, key) => (
                      <option key={key} value={country.id}>
                        {country.designationName}
                      </option>
                    ))}
                  </CSelect>
                  <CFormText>Select your Designation</CFormText>
                </CCol>
              </CFormGroup>
            </CForm>
          </CCardBody>
        </CCard>
        <CRow>
          <CCol>
          <CCard>
            <CCardHeader>
              Bank Details Form
            </CCardHeader>
            <CCardBody>
              <CForm action="submit" method="post"  className="form-horizontal">

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Account Holder Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" name="text-input" placeholder="accountHolderName" value={accountHolderName} onChange={onChangeaccountHolderName}/>
                    <CFormText>Type Account Holder Name</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Bank Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" name="text-input" placeholder="Bank Name" value={bankName} onChange={onChangebankName}/>
                    <CFormText>Type Bank Name</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Account Number</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" name="text-input" placeholder="accountNumber" value={accountNumber} onChange={onChangeaccountNumber}/>
                    <CFormText>Type Account Number</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Branch Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" name="text-input" placeholder="branchName" value={branchName} onChange={onChangebranchName}/>
                    <CFormText>Type Branch Name</CFormText>
                  </CCol>
                </CFormGroup>

              </CForm>
            </CCardBody>
          </CCard>
          </CCol>
        </CRow>

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
                'shift':
                  (item) => (
                    <td> {item.shift.shiftName} </td>
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
