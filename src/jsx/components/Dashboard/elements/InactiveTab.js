import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { IMAGES, SVGICON } from "../../../constant/theme";
import { Dropdown } from "react-bootstrap";

const tableData = [
  {
    id: "1",
    image: IMAGES.contact9,
    name: "Emilio Fernandez",
    location: "Mexican",
    amount: "126,45",
    lastorder: "154",
  },
  {
    id: "2",
    image: IMAGES.contact1,
    name: "Luca Ferrari",
    location: "Italian",
    amount: "924,23",
    lastorder: "125",
  },
  {
    id: "3",
    image: IMAGES.contact9,
    name: "Ingrid Jensen",
    location: "Norwegian",
    amount: "478,25",
    lastorder: "258",
  },
  {
    id: "4",
    image: IMAGES.contact6,
    name: "Isabela Silva",
    location: "Portuguese",
    amount: "784,35",
    lastorder: "654",
  },
  {
    id: "5",
    image: IMAGES.contact3,
    name: "Ahmed Hassan",
    location: "Egyptian",
    amount: "654,23",
    lastorder: "771",
  },
  {
    id: "6",
    image: IMAGES.contact5,
    name: "Hiroshi Tanaka",
    location: "Japanese",
    amount: "745,38",
    lastorder: "368",
  },
  {
    id: "7",
    image: IMAGES.contact8,
    name: "Amara Desai",
    location: "Indian",
    amount: "365,41",
    lastorder: "368",
  },
  {
    id: "8",
    image: IMAGES.contact7,
    name: "Karl Schmidt ",
    location: "German",
    amount: "987,54",
    lastorder: "741",
  },
  {
    id: "9",
    image: IMAGES.contact2,
    name: "Anna Petrova",
    location: "Russian",
    amount: "854,71",
    lastorder: "985",
  },
];

const InactiveTab = () => {
  const [data, setData] = useState(
    document.querySelectorAll("#inactive-table tbody tr")
  );
  const sort = 10;
  const activePag = useRef(0);
  const [test, settest] = useState(0);
  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove("d-none");
      } else {
        data[i].classList.add("d-none");
      }
    }
  };

  useEffect(() => {
    setData(document.querySelectorAll("#inactive-table tbody tr"));
  }, [test]);

  activePag.current === 0 && chageData(0, sort);
  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1);
  const onClick = (i) => {
    activePag.current = i;
    chageData(activePag.current * sort, (activePag.current + 1) * sort);
    settest(i);
  };

  const checkboxFun = (type) => {
    setTimeout(() => {
      const checkbox = document.querySelectorAll(".sorting_2 input");
      const motherCheckBox = document.querySelector(".sorting_asc_2 input");
      for (let i = 0; i < checkbox.length; i++) {
        const element = checkbox[i];
        if (type === "all") {
          if (motherCheckBox.checked) {
            element.checked = true;
          } else {
            element.checked = false;
          }
        } else {
          if (!element.checked) {
            motherCheckBox.checked = false;
            break;
          } else {
            motherCheckBox.checked = true;
          }
        }
      }
    }, 100);
  };
  return (
    <div className="card mt-2">
      <div className="card-body p-0">
        <div className="table-responsive active-projects style-1 ItemsCheckboxSec shorting ">
          <div id="inactive-table" className="dataTables_wrapper no-footer">
            <table id="empoloyees-tbl" className="table dataTable no-footer">
              <thead>
                <tr>
                  <th className="sorting_asc_2">
                    <div className="form-check custom-checkbox ms-0">
                      <input
                        type="checkbox"
                        className="form-check-input checkAllInput"
                        id="checkAll2"
                        required=""
                        onClick={() => checkboxFun("all")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="checkAll2"
                      ></label>
                    </div>
                  </th>
                  <th>Customer</th>
                  <th>Join Date</th>

                  <th>Location</th>
                  <th>Total Spendings</th>
                  <th>Last Order</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => (
                  <tr key={index}>
                    <td className="sorting_2">
                      <div className="form-check custom-checkbox">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          required=""
                          onClick={() => checkboxFun()}
                          id={`customer${index + 11}`}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`customer${index + 11}`}
                        ></label>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.image}
                          className="avatar avatar-xxs rounded"
                          alt=""
                        />
                        <p className="mb-0 ms-2">
                          
                        </p>
                      </div>
                    </td>

                    <td>
                      <span>Nov 21th 2023 09:21 AM</span>
                    </td>

                    <td>
                      <span>{item.location}</span>
                    </td>
                    <td>
                      <span className="badge badge-rounded badge-outline-primary badge-lg">
                        $ {item.amount}
                      </span>
                    </td>
                    <td>
                      <span className="text-primary font-w500">
                        $ {item.lastorder}
                      </span>
                    </td>
                    <td>
                      <Dropdown className="dropdown">
                        <Dropdown.Toggle as="div" className="btn-link i-false">
                          {SVGICON.ThreeDot}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu-right">
                          <Dropdown.Item>Edit</Dropdown.Item>
                          <Dropdown.Item className="text-danger">
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-sm-flex text-center justify-content-between align-items-center">
              <div className="dataTables_info">
                Showing {activePag.current * sort + 1} to{" "}
                {data.length > (activePag.current + 1) * sort
                  ? (activePag.current + 1) * sort
                  : data.length}{" "}
                of {data.length} entries
              </div>
              <div
                className="dataTables_paginate paging_simple_numbers justify-content-center"
                id="example2_paginate"
              >
                <Link
                  className="paginate_button previous disabled"
                  to="#"
                  onClick={() =>
                    activePag.current > 0 && onClick(activePag.current - 1)
                  }
                >
                  Prev
                </Link>
                <span>
                  {paggination.map((number, i) => (
                    <Link
                      key={i}
                      to="#"
                      className={`paginate_button  ${
                        activePag.current === i ? "current" : ""
                      } `}
                      onClick={() => onClick(i)}
                    >
                      {number}
                    </Link>
                  ))}
                </span>
                <Link
                  className="paginate_button next"
                  to="#"
                  onClick={() =>
                    activePag.current + 1 < paggination.length &&
                    onClick(activePag.current + 1)
                  }
                >
                  Next
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InactiveTab;
