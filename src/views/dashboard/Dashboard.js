import React, { lazy } from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CHeaderNavLink,
  CCol,
  CProgress,
  CRow
} from '@coreui/react'
import {
  CChartBar,
  CChartPie
} from '@coreui/react-chartjs'
import { DocsLink } from 'src/reusable'
import CIcon from '@coreui/icons-react'



const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {

  return (
    <>
      <WidgetsDropdown />


      <CRow>
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
                    data: [80, 10]
                  }
                ]}
                labels={[ 'Present 80%', 'Absent 20%']}
                options={{
                  tooltips: {
                    enabled: true
                  }
                }}
              />

            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard>
            <CCardHeader>
              Leaves
            </CCardHeader>
            <CCardBody>
              <CHeaderNavLink to="/Chartsleave">View More Details</CHeaderNavLink>
              <CRow>
                <CCol xs="12" md="6" xl="6">



                  <hr className="mt-0" />

                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                        Monday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="34" />
                      <CProgress className="progress-xs" color="danger" value="78" />
                      <CProgress className="progress-xs" color="warning" value="34" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Tuesday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="56" />
                      <CProgress className="progress-xs" color="danger" value="94" />
                      <CProgress className="progress-xs" color="warning" value="56" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Wednesday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="12" />
                      <CProgress className="progress-xs" color="danger" value="67" />
                      <CProgress className="progress-xs" color="warning" value="12" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Thursday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="43" />
                      <CProgress className="progress-xs" color="danger" value="91" />
                      <CProgress className="progress-xs" color="warning" value="43" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Friday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="22" />
                      <CProgress className="progress-xs" color="danger" value="73" />
                      <CProgress className="progress-xs" color="warning" value="22" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Saturday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="53" />
                      <CProgress className="progress-xs" color="danger" value="82" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Sunday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="9" />
                      <CProgress className="progress-xs" color="danger" value="69" />
                    </div>
                  </div>
                  <div className="legend text-center">
                    <small>
                      <sup className="px-1"><CBadge shape="pill" color="info">&nbsp;</CBadge></sup>
                      Present Employees
                      &nbsp;
                      <sup className="px-1"><CBadge shape="pill" color="danger">&nbsp;</CBadge></sup>
                      Absent Employees
                      <sup className="px-1"><CBadge shape="pill" color="warning">&nbsp;</CBadge></sup>
                      OT Employees
                    </small>
                  </div>
                </CCol>

              </CRow>

            </CCardBody>

          </CCard>
        </CCol>
      </CRow>



      <CRow>
        <CCol  xs="12" md="6" >
          <CCard>
            <CCardHeader>
              Over Time
              <DocsLink href="https://www.chartjs.org"/>
            </CCardHeader>

            <CCardBody>
              <CHeaderNavLink to="/Chartsot">View More Details</CHeaderNavLink>
              <CChartBar
                datasets={[
                  {
                    label: 'Hours',
                    backgroundColor: '#f87979',
                    data: [40, 20, 12, 39, 10, 0, 39, 0, 0, 20, 12, 11]
                  }
                ]}
                labels="months"
                options={{
                  tooltips: {
                    enabled: true
                  }
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard>
            <CCardHeader>
              Leaves
            </CCardHeader>
            <CCardBody>
              <CHeaderNavLink to="/Chartsleave">View More Details</CHeaderNavLink>
              <CRow>
                <CCol xs="12" md="6" xl="6">



                  <hr className="mt-0" />

                  <div className="progress-group mb-4">
                    <div className="progress-group-header">
                      <CIcon className="progress-group-icon" name="cil-user" />
                      <span className="title">Male</span>
                      <span className="ml-auto font-weight-bold">43%</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="43" />
                    </div>
                  </div>
                  <div className="progress-group mb-5">
                    <div className="progress-group-header">
                      <CIcon className="progress-group-icon" name="cil-user-female" />
                      <span className="title">Female</span>
                      <span className="ml-auto font-weight-bold">37%</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="success" value="37" />
                    </div>
                  </div>



                </CCol>
              </CRow>

            </CCardBody>

          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Leaves
            </CCardHeader>
            <CCardBody>
              <CHeaderNavLink to="/Chartsleave">View More Details</CHeaderNavLink>
              <CRow>
                <CCol xs="12" md="6" xl="6">



                  <hr className="mt-0" />

                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                        Monday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="34" />
                      <CProgress className="progress-xs" color="danger" value="78" />
                      <CProgress className="progress-xs" color="warning" value="34" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Tuesday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="56" />
                      <CProgress className="progress-xs" color="danger" value="94" />
                      <CProgress className="progress-xs" color="warning" value="56" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Wednesday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="12" />
                      <CProgress className="progress-xs" color="danger" value="67" />
                      <CProgress className="progress-xs" color="warning" value="12" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Thursday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="43" />
                      <CProgress className="progress-xs" color="danger" value="91" />
                      <CProgress className="progress-xs" color="warning" value="43" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Friday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="22" />
                      <CProgress className="progress-xs" color="danger" value="73" />
                      <CProgress className="progress-xs" color="warning" value="22" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Saturday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="53" />
                      <CProgress className="progress-xs" color="danger" value="82" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Sunday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="9" />
                      <CProgress className="progress-xs" color="danger" value="69" />
                    </div>
                  </div>
                  <div className="legend text-center">
                    <small>
                      <sup className="px-1"><CBadge shape="pill" color="info">&nbsp;</CBadge></sup>
                      Present Employees
                      &nbsp;
                      <sup className="px-1"><CBadge shape="pill" color="danger">&nbsp;</CBadge></sup>
                      Absent Employees
                      <sup className="px-1"><CBadge shape="pill" color="warning">&nbsp;</CBadge></sup>
                      OT Employees
                    </small>
                  </div>
                </CCol>

                <CCol xs="12" md="6" xl="6">



                  <hr className="mt-0" />

                  <div className="progress-group mb-4">
                    <div className="progress-group-header">
                      <CIcon className="progress-group-icon" name="cil-user" />
                      <span className="title">Male</span>
                      <span className="ml-auto font-weight-bold">43%</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="43" />
                    </div>
                  </div>
                  <div className="progress-group mb-5">
                    <div className="progress-group-header">
                      <CIcon className="progress-group-icon" name="cil-user-female" />
                      <span className="title">Female</span>
                      <span className="ml-auto font-weight-bold">37%</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="success" value="37" />
                    </div>
                  </div>



                </CCol>
              </CRow>

            </CCardBody>

          </CCard>
        </CCol>
      </CRow>



    </>
  )
}

export default Dashboard
