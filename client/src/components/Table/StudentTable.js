import { useState, useEffect, useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DebouncedInput from "./DebouncedInput";
import userService from "../../services/userServices";
import thesisService from "../../services/thesisService.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BaseTable from "./BaseTable.js";

const Table = ({ type }) => {
  const [reloadPage, setReloadPage] = useState(0);
  // initial columns if there is no data
  const [data, setData] = useState(() => {
    switch (type) {
      case "students-thesis":
        return [
          {
            title: "Thesis Title",
            description: "Thesis Description",
            major: "613b0c5eabf2c3001f4b4d6a", // ObjectId của Major
            students: 2, // Mảng ObjectId của Student
            adviser: "613b0c5eabf2c3001f4b4d6d", // ObjectId của Faculty
            lecturerReviews: 2, // Mảng ObjectId của Faculty
            remarks: "Thesis Remarks",
            status: "New",
          },
        ];
        break;
      case "students-manage-thesis":
        return [
          {
            title: "Thesis Title",
            description: "Thesis Description",
            major: "613b0c5eabf2c3001f4b4d6a", // ObjectId của Major
            students: 2, // Mảng ObjectId của Student
            adviser: "613b0c5eabf2c3001f4b4d6d", // ObjectId của Faculty
            lecturerReviews: 2, // Mảng ObjectId của Faculty
            remarks: "Thesis Remarks",
            status: "New",
          },
        ];
        break;
    }
  });
  const loadPage = async () => {
    const account = JSON.parse(localStorage.getItem("account"));
    try {
      let result;
      switch (type) {
        case "students-thesis":
          console.log("da vo day");
          result = await thesisService.getApprovedThesisByMajor(account.major);
          console.log(result);

          if (result.length !== 0) {
            console.log("vo day 1");
            const processedResults = result.map((element) => ({
              title: element.title,
              description: element.description,
              major: element.major.name, // ObjectId của Major
              students: element.authors.length, // Mảng ObjectId của Student
              adviser: element.adviser.firstName, // ObjectId của Faculty
              lecturerReviews: element.panelists.length, // Mảng ObjectId của Faculty
              remarks: element.remarks,
              status: element._id,
            }));
            setData([...processedResults]);
          } else {
            console.log("vo day 2");
            setData([
              {
                title: "Thesis Title",
                description: "Thesis Description",
                major: "613b0c5eabf2c3001f4b4d6a", // ObjectId của Major
                students: 2, // Mảng ObjectId của Student
                adviser: "613b0c5eabf2c3001f4b4d6d", // ObjectId của Faculty
                lecturerReviews: 2, // Mảng ObjectId của Faculty
                remarks: "Thesis Remarks",
                status: "New",
              },
            ]);
          }

          break;
        case "students-manage-thesis":
          result = await thesisService.getAllThesisByStudentId(account._id);
          console.log(result);

          if (result.length !== 0) {
            console.log("vo day 1");
            const processedResults = result.map((element) => ({
              title: element.title,
              description: element.description,
              major: element.major.name, // ObjectId của Major
              students: element.authors.length, // Mảng ObjectId của Student
              adviser: element.adviser.firstName, // ObjectId của Faculty
              lecturerReviews: element.panelists.length, // Mảng ObjectId của Faculty
              remarks: element.remarks,
              status: element._id,
            }));
            setData([...processedResults]);
          } else {
            console.log("vo day 2");
            setData([
              {
                title: "Thesis Title",
                description: "Thesis Description",
                major: "613b0c5eabf2c3001f4b4d6a", // ObjectId của Major
                students: 2, // Mảng ObjectId của Student
                adviser: "613b0c5eabf2c3001f4b4d6d", // ObjectId của Faculty
                lecturerReviews: 2, // Mảng ObjectId của Faculty
                remarks: "Thesis Remarks",
                status: "New",
              },
            ]);
          }

          break;

        default:
          break;
      }
    } catch (err) {
      toast.error("Load Table failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useMemo(() => {
    loadPage();
  }, [type, reloadPage]);

  return (
    <div>
      <BaseTable data={data} type={type} setReloadPage={setReloadPage} />
      <ToastContainer limit={2} />
    </div>
  );
};

function parseDate(string) {
  const birthday = new Date(string);

  // Lấy ngày, tháng, năm
  const day = birthday.getDate();
  const month = birthday.getMonth() + 1; // Ghi chú: getMonth trả về giá trị từ 0 đến 11
  const year = birthday.getFullYear();

  // Tạo chuỗi ngày tháng năm
  return `${day}/${month}/${year}`;
}
export default Table;
