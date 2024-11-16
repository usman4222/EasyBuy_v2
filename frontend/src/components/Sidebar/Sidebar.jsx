import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import Logo from "../../assets/images/logo.png";
import { RxDashboard } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";
import { MdChecklist } from "react-icons/md";
import { TbArticle } from "react-icons/tb";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const [adminOpen, setAdminOpen] = useState(false);
  const [examOpen, setExamOpen] = useState(false);
  const [academicsOpen, setAcademicsOpen] = useState(false);
  const [accountsOfficeOpen, setAccountsOfficeOpen] = useState(false);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen]);

  const adminDropdown = [
    {
      id: "classManagement",
      label: "Class Management",
      path: "/admin/class-management",
    },
    {
      id: "sectionManagement",
      label: "Section Management",
      path: "/admin/section-management",
    },
    {
      id: "subjectManagement",
      label: "Subject Management",
      path: "/admin/subject-management",
    },
    {
      id: "teacherManagement",
      label: "Teacher Management",
      path: "/admin/teacher-management",
    },
    {
      id: "studentReport",
      label: "Student Report",
      path: "/admin/student-report",
    },
  ];

  const academicsDropdown = [
    { id: "students", label: "Students", path: "/academics/students" },
    {
      id: "pendingStudent",
      label: "Pending Student",
      path: "/academics/pending-students",
    },
  ];

  const examDropdown = [
    { id: "result", label: "Results", path: "/exam-department/result" },
    {
      id: "sittingArrangement",
      label: "Sitting Arrangement",
      path: "/exam-department/sitting-arrangement",
    },
    {
      id: "examAttendanceSheet",
      label: "Exam Attendance Sheet",
      path: "/exam-department/exam-attendance-sheet",
    },
    {
      id: "dateSheet",
      label: "Date Sheet",
      path: "/exam-department/date-sheet",
    },
  ];

  const accountsOfficeDropdown = [
    {
      id: "feeStructure",
      label: "Fee Structure",
      path: "/accounts-office/fee-structure",
    },
    {
      id: "feeCollection",
      label: "Fee Collection",
      path: "/accounts-office/fee-collection",
    },
    { id: "report", label: "Report", path: "/accounts-office/report" },
  ];

  const hostelDropdown = [
    {
      id: "pendingStudents",
      label: "Pending Students",
      path: "/hostel-management/pending-student",
    },
    {
      id: "students",
      label: "Students",
      path: "/hostel-management/students",
    },
    { id: "rooms", label: "Romms", path: "/hostel-management/rooms" },
  ];

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 border-r border-[#E2E8F0] z-40 flex h-screen w-[262px] flex-col overflow-y-hidden bg-[#fff] duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between mt-5 gap-2 pr-[10px] pl-[18px]">
        <NavLink to="/dashboard">
          <img src={Logo} alt="Logo"  className="w-32"/>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="px-[10px] py-[34px]">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/" || pathname.includes("dashboard")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        className={`group relative flex items-center gap-2.5 rounded-[9px] font-montserrat p-[14px] text-[14px] font-medium text-bodydark1 duration-300 ease-in-out   ${
                          (pathname === "/" ||
                            pathname.includes("dashboard")) &&
                          "bg-[#F3F6FA] custom-gradient"
                        }`}
                        to="/"
                      >
                        <RxDashboard />
                        Dashboard
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup activeCondition={adminOpen}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <button
                        onClick={handleClick}
                        className={`group relative flex w-full items-center gap-2.5 rounded-[9px] p-[14px] font-montserrat font-medium text-bodydark1 duration-300 ease-in-out hover:bg-[#F3F6FA] ${
                          pathname.includes("/admin") &&
                          "bg-[#F3F6FA] custom-gradient"
                        }`}
                      >
                        <FaRegUser />
                        Admin
                      </button>
                      <ul
                        className={`ml-4 flex flex-col ${
                          open ? "block" : "hidden"
                        }`}
                      >
                        {adminDropdown.map(({ id, label, path }) => (
                          <li key={id}>
                            <NavLink
                              to={path}
                              className={`block rounded-[9px] p-[10px] font-medium text-bodydark1  font-montserrat duration-300 ease-in-out hover:bg-[#F3F6FA] ${
                                pathname.includes(path) && "bg-[#F3F6FA]"
                              }`}
                            >
                              {label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <li>
                <NavLink
                  to="/enrollment"
                  className={`flex items-center gap-2.5 rounded-[9px] p-[14px] font-medium text-bodydark1 font-montserrat duration-300 ease-in-out hover:bg-[#F3F6FA] ${
                    pathname === "/enrollment" && "bg-[#F3F6FA] custom-gradient"
                  }`}
                >
                  <TbArticle />
                  Enrolment Form
                </NavLink>
              </li>

              <SidebarLinkGroup activeCondition={academicsOpen}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <button
                        onClick={handleClick}
                        className={`group relative flex w-full items-center gap-2.5 rounded-[9px] p-[14px] font-montserrat font-medium text-bodydark1 duration-300 ease-in-out hover:bg-[#F3F6FA] ${
                          pathname.includes("/academics") &&
                          "bg-[#F3F6FA] custom-gradient"
                        }`}
                      >
                        <HiOutlineUsers />
                        Academics
                      </button>
                      <ul
                        className={`ml-4 flex flex-col ${
                          open ? "block" : "hidden"
                        }`}
                      >
                        {academicsDropdown.map(({ id, label, path }) => (
                          <li key={id}>
                            <NavLink
                              to={path}
                              className={`block rounded-[9px] p-[10px] font-medium text-bodydark1 font-montserrat duration-300 ease-in-out hover:bg-[#F3F6FA] ${
                                pathname.includes(path) && "bg-[#F3F6FA]"
                              }`}
                            >
                              {label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup activeCondition={accountsOfficeOpen}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <button
                        onClick={handleClick}
                        className={`group relative flex w-full items-center gap-2.5 rounded-[9px] p-[14px] font-montserrat font-medium text-bodydark1 duration-300 ease-in-out hover:bg-[#F3F6FA] ${
                          pathname.includes("/accounts-office") &&
                          "bg-[#F3F6FA] custom-gradient"
                        }`}
                      >
                        <RiMoneyDollarCircleLine />
                        Accounts Office
                      </button>
                      <ul
                        className={`ml-4 flex flex-col ${
                          open ? "block" : "hidden"
                        }`}
                      >
                        {accountsOfficeDropdown.map(({ id, label, path }) => (
                          <li key={id}>
                            <NavLink
                              to={path}
                              className={`block rounded-[9px] p-[10px] font-medium text-bodydark1 font-montserrat duration-300 ease-in-out hover:bg-[#F3F6FA] ${
                                pathname.includes(path) && "bg-[#F3F6FA] "
                              }`}
                            >
                              {label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup activeCondition={examOpen}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <button
                        onClick={handleClick}
                        className={`group relative flex w-full items-center gap-2.5 rounded-[9px] p-[14px] font-montserrat font-medium text-bodydark1 duration-300 ease-in-out hover:bg-[#F3F6FA] ${
                          pathname.includes("/exam-department") &&
                          "bg-[#F3F6FA] custom-gradient"
                        }`}
                      >
                        <HiOutlineUsers />
                        Exams Department
                      </button>
                      <ul
                        className={`ml-4 flex flex-col ${
                          open ? "block" : "hidden"
                        }`}
                      >
                        {examDropdown.map(({ id, label, path }) => (
                          <li key={id}>
                            <NavLink
                              to={path}
                              className={`block rounded-[9px] p-[10px] font-medium text-bodydark1 font-montserrat duration-300 ease-in-out hover:bg-[#F3F6FA] ${
                                pathname.includes(path) && "bg-[#F3F6FA]"
                              }`}
                            >
                              {label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup activeCondition={hostelDropdown}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <button
                        onClick={handleClick}
                        className={`group relative flex w-full items-center gap-2.5 rounded-[9px] p-[14px] font-montserrat font-medium text-bodydark1 duration-300 ease-in-out hover:bg-[#F3F6FA] ${
                          pathname.includes("/hostel-management") &&
                          "bg-[#F3F6FA] custom-gradient"
                        }`}
                      >
                        <RiMoneyDollarCircleLine />
                        Hostel Management
                      </button>
                      <ul
                        className={`ml-4 flex flex-col ${
                          open ? "block" : "hidden"
                        }`}
                      >
                        {hostelDropdown.map(({ id, label, path }) => (
                          <li key={id}>
                            <NavLink
                              to={path}
                              className={`block rounded-[9px] p-[10px] font-medium text-bodydark1 font-montserrat duration-300 ease-in-out hover:bg-[#F3F6FA] ${
                                pathname.includes(path) && "bg-[#F3F6FA] "
                              }`}
                            >
                              {label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
