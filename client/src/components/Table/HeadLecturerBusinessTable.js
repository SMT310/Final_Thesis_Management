import { useState, useEffect, useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import DebouncedInput from "./DebouncedInput.jsx";
import userService from "../../services/userServices.js";
import BaseTable from "./BaseTable.js";
import thesisService from "../../services/thesisService.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Table = ({ type }) => {
  // initial columns if there is no data
  const [reloadPage, setReloadPage] = useState(0);

  const [data, setData] = useState(() => {
    switch (type) {
      case "theses":
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
      case "pendingTheses":
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
      case "approvedTheses":
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
        case "theses":
          console.log("da vo day");
          result = await thesisService.getThesisByLecturerId(account._id);
          console.log(result.length);

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
        case "pendingTheses":
          console.log(account.major);
          result = await thesisService.getPendingThesisByMajor(account.major);
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
              },
            ]);
          }

          break;
        case "approvedTheses":
          result = await thesisService.getApprovedThesisByMajor(account.major);
          result = result.filter((thesis) => thesis.panelists.length === 0);
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
              },
            ]);
          }

          break;

        default:
          break;
      }
    } catch (err) {
      toast.error("Load Thesis Failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useMemo(() => {
    loadPage();
  }, [type, reloadPage]);

  return (
    <div className="p-2 max-w-8xl mx-auto text-white fill-gray-400 bg-gray-800 rounded-lg">
      <BaseTable data={data} type={type} setReloadPage={setReloadPage} />
      <ToastContainer limit={2} />
    </div>
  );
};

export default Table;
