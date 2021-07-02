import React from 'react'
import CIcon from '@coreui/icons-react'
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import ContactMailOutlinedIcon from '@material-ui/icons/ContactMailOutlined';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import SwapHorizOutlinedIcon from '@material-ui/icons/SwapHorizOutlined';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import SecurityOutlinedIcon from '@material-ui/icons/SecurityOutlined';
import TimerOffOutlinedIcon from '@material-ui/icons/TimerOffOutlined';
import SpellcheckOutlinedIcon from '@material-ui/icons/SpellcheckOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import CancelPresentationOutlinedIcon from '@material-ui/icons/CancelPresentationOutlined';
import DepartureBoardOutlinedIcon from '@material-ui/icons/DepartureBoardOutlined';

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Company Calender',
    to: '/Companycalender',
    icon: <CIcon name="cil-calendar" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Admin',
    to: '/Admin',
    icon: <CIcon name="cil-shield-alt" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Admin']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Attendance Management',
    icon: <FingerprintIcon className="c-sidebar-nav-icon"/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'RFID check',
        to: '/',
        icon: <ContactMailOutlinedIcon className="c-sidebar-nav-icon"/>,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Attendence Log',
        to: '/attendence',
        icon: <BookOutlinedIcon className="c-sidebar-nav-icon"/>,
      }
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Shift Management',
    icon: <AddAlertOutlinedIcon className="c-sidebar-nav-icon"/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Shift Configuration',
        to: '/Shift Configuration',
        icon: <SettingsOutlinedIcon className="c-sidebar-nav-icon"/>,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Shift Swaps',
        to: '/Leaveswap',
        icon: <SwapHorizOutlinedIcon className="c-sidebar-nav-icon"/>,
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Employee Management',
    icon: <SupervisorAccountOutlinedIcon className="c-sidebar-nav-icon"/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Employee',
        to: '/Employee',
        icon: <GroupAddOutlinedIcon className="c-sidebar-nav-icon"/>,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Employee Type',
        to: '/AddEmployeeType',
        icon: <AccountBoxOutlinedIcon className="c-sidebar-nav-icon"/>,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Department',
        to: '/Department',
        icon: <SecurityOutlinedIcon
                     className="c-sidebar-nav-icon"/>,
        badge: {
          color: 'info',
        }
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Over Time Management',
    icon: <TimerOffOutlinedIcon className="c-sidebar-nav-icon"/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Overtime Logs',
        to: '/Overtime logs',
        icon: <BookOutlinedIcon className="c-sidebar-nav-icon"/>,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Overtime Configuration',
        to: '/Overtime Configuration',
        icon: <SettingsOutlinedIcon className="c-sidebar-nav-icon"/>,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Overtime Acceptance',
        to: '/Overtime Acceptance',
        icon: <SpellcheckOutlinedIcon className="c-sidebar-nav-icon"/>,
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Leave Management',
    route: '/buttons',
    icon: <ExitToAppOutlinedIcon className="c-sidebar-nav-icon"/>,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Leave Logs',
        to: '/leavelogs',
        icon: <BookOutlinedIcon className="c-sidebar-nav-icon"/>,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Leave Types',
        to: '/Leave Types',
        icon: <AccountBoxOutlinedIcon className="c-sidebar-nav-icon"/>,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Leave Configuration',
        to: '/Leave Configuration',
        icon: <SettingsOutlinedIcon className="c-sidebar-nav-icon"/>,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Leave Acceptance',
        to: '/Leave Acceptance',
        icon: <SpellcheckOutlinedIcon className="c-sidebar-nav-icon"/>,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'UnAuthorized Leaves',
        to: '/Unauthleave',
        icon: <CancelPresentationOutlinedIcon className="c-sidebar-nav-icon"/>,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Leave Application(employee)',
        to: '/Leave Application',
        icon: <DepartureBoardOutlinedIcon className="c-sidebar-nav-icon"/>,
      },
    ],
  },


]

export default _nav
