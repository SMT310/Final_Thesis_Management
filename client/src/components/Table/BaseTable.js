// aimport { useState, useEffect, useMemo } from "react";
// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import DebouncedInput from "./DebouncedInput";
// import ToastMessage from "../ToastMessage/ToastMessage.js";
// import userService from "../../services/userServices";
// import thesisService from "../../services/thesisService";
// import AssignLecturerReviewForm from "../Form/AssignLecturerReviewForm.js";
// import { useNavigate } from 'react-router-dom';

// const BaseTable = ({ data, type, setReloadPage }) => {
//   const navigate = useNavigate();
//   // get user
//   const [user, setUser] = useState(localStorage.getItem('account')?JSON.parse(localStorage.getItem('account')):{});
//   const [message, setMessage] = useState('');
//   const [typeMessage, setTypeMessage] = useState('');
//   const columnHelper = createColumnHelper();
//   // initial columns if there is no data
//   const [openAssignLecturerReview, setOpenAssignLecturerReview] =
//     useState(false);
//   const [adviser, setAdviser] = useState();
//   let columns = [
//     columnHelper.accessor("", {
//       id: "No",
//       cell: (info) => <span>{info.row.index + 1}</span>,
//       header: "No",
//     }),
//     ...Object.keys(data[0])?.map((field) => {
//       return columnHelper.accessor(field, {
//         cell: (info) => <span>{info.getValue()}</span>,
//         header: camelToCapitalize(field),
//       });
//     }),
//     columnHelper.accessor("status", {
//       id: "Edit",
//       cell: (info) => (
//         <div>
//           {type === "pendingTheses" && (
//             <div className="flex justify-center space-x-3 ">
//               <button
//                 type="button"
//                 className="bg-green-700  text-white h-[30px] w-[90px] hover:border-3  hover:hover:opacity-80"
//                 onClick={async (e) => {
//                   e.preventDefault();
//                   console.log(info.getValue());
//                   await thesisService.approveThesisById(info.getValue());
//                   setReloadPage((state) => state + 1);
//                 }}
//               >
//                 Approve
//               </button>
//               <button
//                 type="button"
//                 className="bg-gray-700 text-white h-[30px] w-[90px] hover:border-3  hover:opacity-80"
//                 onClick={async (e) => {
//                   e.preventDefault();
//                   await thesisService.declineThesisById(info.getValue());
//                   setReloadPage((state) => state + 1);
//                 }}
//               >
//                 Decline
//               </button>
//             </div>
//           )}
//           {type === "approvedTheses" && (
//             <div className="flex justify-center space-x-3 ">
//               <button
//                 type="button"
//                 className="bg-green-700 text-white h-[50px] w-[200px] hover:border-3  hover:hover:opacity-80"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setOpenAssignLecturerReview(true);
//                   console.log(info.getValue());
//                   setAdviser(info.getValue());
//                 }}
//               >
//                 Assign lecturer reviews
//               </button>
//             </div>
//           )}
//           {type === "students-thesis" && (
//             <div className="flex justify-center space-x-3 ">
//               <button
//                 type="button"
//                 className="bg-green-700 text-white h-[40px] w-[120px] hover:border-3  hover:hover:opacity-80"
//                 onClick={async (e) => {
//                   e.preventDefault();
//                   const respone = await thesisService.registerThesisForStudent(info.getValue(), user);
//                   if (respone?.isFull) {
//                     console.log('full');
//                     setMessage('Thesis đã đủ thành viên');
//                     setTypeMessage('warning');

//                     setTimeout(() => {
//                       setMessage('');
//                       setTypeMessage('');
//                       }, 2000);
//                   }
//                   setReloadPage((state) => state + 1);
//                 }}
//               >
//                 Assign Thesis
//               </button>
//               <button
//                 type="button"
//                 className="bg-gray-700 text-white h-[40px] w-[120px] hover:border-3  hover:opacity-80"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   // console.log(info.getValue());
//                   navigate(`${info.getValue()}`);
//                 }}
//               >
//                 View Thesis
//               </button>
//             </div>
//           )}
//           {type === "students-manage-thesis" && (
//             <div className="flex justify-center space-x-3 ">
//               <button
//                 type="button"
//                 className="bg-green-700 text-white h-[50px] w-[200px] hover:border-3  hover:hover:opacity-80"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   navigate(`${info.getValue()}`);
//                 }}
//               >
//                 Views details
//               </button>
//             </div>
//           )}
//           {type === "theses" && (
//             <div className="flex justify-center space-x-3 ">
//               <button
//                 type="button"
//                 className="bg-green-700 text-white h-[50px] w-[200px] hover:border-3  hover:hover:opacity-80"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   console.log(info.getValue());
//                   navigate(`${info.getValue()}`);
//                 }}
//               >
//                 Views details
//               </button>
//             </div>
//           )}
//         </div>
//       ),
//       header: "status",
//     }),
//   ];
//   // if (type === "theses") {
//   //   const newColumns = columns.filter((column) => column.id !== "Edit");
//   //   columns = [...newColumns];
//   // }
//   if (type === "approvedTheses" || type === "pendingTheses" || type === "students-thesis"
//   || type === "students-manage-thesis" || type === "theses" ) {
//     let newColumns = columns.filter((column) => !(column.header === "Status"));
//     columns = [...newColumns];
//   }
//   // config table
//   const [globalFilter, setGlobalFilter] = useState("");

//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       globalFilter,
//     },
//     getFilteredRowModel: getFilteredRowModel(),
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//   });
//   return (
//     <div className="p-2 max-w-8xl mx-auto text-white fill-gray-400 rounded-lg">
//       <div className="flex justify-between mb-2 rounded-lg" >

//         <div className="w-full flex items-center gap-1">
//           <SearchIcon />

//           <DebouncedInput
//             value={globalFilter ?? ""}
//             onChange={(value) => setGlobalFilter(String(value))}
//             className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-indigo-500"
//             placeholder="Search all columns..."
//           />
//         </div>
//         <ToastMessage message= {message} type={typeMessage}/>
//         {/* {isPT && type === "exercises" && (
//           <div>
//             <button
//               type="reset"
//               className="bg-red-700 text-white h-[40px] w-[120px] hover:border-3  px-2 hover:opacity-80"
//               onClick={() => setOpenAddExerciseModel((state) => !state)}
//             >
//               Add Exercise
//             </button>
//           </div>
//         )}
//         {isAdmin && type === "pts" && (
//           <div>
//             <button
//               type="reset"
//               className="bg-red-700 text-white h-[60px] w-[150px] hover:border-3  px-2 hover:opacity-80"
//               onClick={() => setOpenAddTrainerModal((state) => !state)}
//             >
//               Add Personal Trainer
//             </button>
//           </div>
//         )} */}
//       </div>
//       <table className="border border-gray-700 w-full text-left">
//         <thead className="bg-red-800 text-center">
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th key={header.id} className="capitalize px-3.5 py-2">
//                   {flexRender(
//                     header.column.columnDef.header,
//                     header.getContext()
//                   )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.length ? (
//             table.getRowModel().rows.map((row, i) => (
//               <tr
//                 key={row.id}
//                 className={`
//                 ${i % 2 === 0 ? "bg-gray-900 " : "bg-gray-800"}
//                 `}
//               >
//                 {row.getVisibleCells().map((cell) => (
//                   <td key={cell.id} className=" py-3 text-center">
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))
//           ) : (
//             <tr className="text-center h-32">
//               <td colSpan={12}>No Record Found!</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       {/* pagination */}
//       <div className="flex items-center justify-end mt-2 gap-2">
//         <button
//           onClick={() => {
//             table.previousPage();
//           }}
//           disabled={!table.getCanPreviousPage()}
//           className="p-1 border border-gray-300 px-2 disabled:opacity-30"
//         >
//           {"<"}
//         </button>
//         <button
//           onClick={() => {
//             table.nextPage();
//           }}
//           disabled={!table.getCanNextPage()}
//           className="p-1 border border-gray-300 px-2 disabled:opacity-30"
//         >
//           {">"}
//         </button>

//         <span className="flex items-center gap-1">
//           <div>Page</div>
//           <strong>
//             {table.getState().pagination.pageIndex + 1} of{" "}
//             {table.getPageCount()}
//           </strong>
//         </span>
//         <span className="flex items-center gap-1">
//           | Go to page:
//           <input
//             type="number"
//             defaultValue={table.getState().pagination.pageIndex + 1}
//             onChange={(e) => {
//               const page = e.target.value ? Number(e.target.value) - 1 : 0;
//               table.setPageIndex(page);
//             }}
//             className="border p-1 rounded w-16 bg-transparent"
//           />
//         </span>
//         <select
//           value={table.getState().pagination.pageSize}
//           onChange={(e) => {
//             table.setPageSize(Number(e.target.value));
//           }}
//           className="p-2 bg-transparent"
//         >
//           {[10, 20, 30, 50].map((pageSize) => (
//             <option key={pageSize} value={pageSize}>
//               Show {pageSize}
//             </option>
//           ))}
//         </select>
//       </div>
//       {openAssignLecturerReview && (
//         <AssignLecturerReviewForm
//           currentThesis={adviser}
//           setOpenAssignLecturerReview={setOpenAssignLecturerReview}
//         />
//       )}
//     </div>
//   );
// };
// const SearchIcon = () => {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
//       <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
//     </svg>
//   );
// };
// function camelToCapitalize(inputStr) {
//   return inputStr
//     .replace(/([a-z])([A-Z])/g, "$1 $2")
//     .replace(/^./, (str) => str.toUpperCase());
// }
// function parseDate(string) {
//   const birthday = new Date(string);

//   // Lấy ngày, tháng, năm
//   const day = birthday.getDate();
//   const month = birthday.getMonth() + 1; // Ghi chú: getMonth trả về giá trị từ 0 đến 11
//   const year = birthday.getFullYear();

//   // Tạo chuỗi ngày tháng năm
//   return `${day}/${month}/${year}`;
// }
// export default BaseTable;

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
import ToastMessage from "../ToastMessage/ToastMessage.js";
import userService from "../../services/userServices";
import thesisService from "../../services/thesisService";
import AssignLecturerReviewForm from "../Form/AssignLecturerReviewForm.js";
import { useNavigate } from "react-router-dom";

const BaseTable = ({ data, type, setReloadPage }) => {
  const navigate = useNavigate();
  // get user
  const [user, setUser] = useState(
    localStorage.getItem("account")
      ? JSON.parse(localStorage.getItem("account"))
      : {}
  );
  const [message, setMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState("");
  const columnHelper = createColumnHelper();
  // initial columns if there is no data
  const [openAssignLecturerReview, setOpenAssignLecturerReview] =
    useState(false);
  const [adviser, setAdviser] = useState();
  let columns = [
    columnHelper.accessor("", {
      id: "No",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "No",
    }),
    ...Object.keys(data[0])?.map((field) => {
      return columnHelper.accessor(field, {
        cell: (info) => <span>{info.getValue()}</span>,
        header: camelToCapitalize(field),
      });
    }),
    columnHelper.accessor("status", {
      id: "Edit",
      cell: (info) => (
        <div>
          {type === "pendingTheses" && (
            <div className="flex justify-center space-x-3 ">
              <button
                type="button"
                className="bg-green-700  text-white h-[30px] w-[90px] hover:border-3  hover:hover:opacity-80"
                onClick={async (e) => {
                  e.preventDefault();
                  console.log(info.getValue());
                  await thesisService.approveThesisById(info.getValue());
                  setReloadPage((state) => state + 1);
                }}
              >
                Approve
              </button>
              <button
                type="button"
                className="bg-gray-700 text-white h-[30px] w-[90px] hover:border-3  hover:opacity-80"
                onClick={async (e) => {
                  e.preventDefault();
                  await thesisService.declineThesisById(info.getValue());
                  setReloadPage((state) => state + 1);
                }}
              >
                Decline
              </button>
            </div>
          )}
          {type === "approvedTheses" && (
            <div className="flex justify-center space-x-3 ">
              <button
                type="button"
                className="bg-green-700 text-white h-[50px] w-[200px] hover:border-3  hover:hover:opacity-80"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenAssignLecturerReview(true);
                  console.log(info.getValue());
                  setAdviser(info.getValue());
                }}
              >
                Assign lecturer reviews
              </button>
            </div>
          )}
          {type === "students-thesis" && (
            <div className="flex justify-center space-x-3 ">
              <button
                type="button"
                className="bg-green-700 text-white h-[40px] w-[120px] hover:border-3  hover:hover:opacity-80"
                onClick={async (e) => {
                  e.preventDefault();
                  const respone = await thesisService.registerThesisForStudent(
                    info.getValue(),
                    user
                  );
                  if (respone?.isFull) {
                    console.log("full");
                    setMessage("Thesis đã đủ thành viên");
                    setTypeMessage("warning");

                    setTimeout(() => {
                      setMessage("");
                      setTypeMessage("");
                    }, 2000);
                  }
                  setReloadPage((state) => state + 1);
                }}
              >
                Assign Thesis
              </button>
              <button
                type="button"
                className="bg-gray-700 text-white h-[40px] w-[120px] hover:border-3  hover:opacity-80"
                onClick={(e) => {
                  e.preventDefault();
                  // console.log(info.getValue());
                  navigate(`${info.getValue()}`);
                }}
              >
                View Thesis
              </button>
            </div>
          )}
          {type === "students-manage-thesis" && (
            <div className="flex justify-center space-x-3 ">
              <button
                type="button"
                className="bg-green-700 text-white h-[50px] w-[200px] hover:border-3  hover:hover:opacity-80"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`${info.getValue()}`);
                }}
              >
                Views details
              </button>
            </div>
          )}
          {type === "theses" && (
            <div className="flex justify-center space-x-3 ">
              <button
                type="button"
                className="bg-green-700 text-white h-[50px] w-[200px] hover:border-3  hover:hover:opacity-80"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(info.getValue());
                  navigate(`${info.getValue()}`);
                }}
              >
                Views details
              </button>
            </div>
          )}
        </div>
      ),
      header: "status",
    }),
  ];
  // if (type === "theses") {
  //   const newColumns = columns.filter((column) => column.id !== "Edit");
  //   columns = [...newColumns];
  // }
  if (
    type === "approvedTheses" ||
    type === "pendingTheses" ||
    type === "students-thesis" ||
    type === "students-manage-thesis" ||
    type === "theses"
  ) {
    let newColumns = columns.filter((column) => !(column.header === "Status"));
    columns = [...newColumns];
  }
  // config table
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div className="p-2 max-w-8xl mx-auto text-white fill-gray-400 rounded-lg">
      <div className="flex justify-between mb-2 rounded-lg">
        <div className="w-full flex items-center gap-1">
          <SearchIcon />

          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-indigo-500"
            placeholder="Search all columns..."
          />
        </div>
        <ToastMessage message={message} type={typeMessage} />
        {/* {isPT && type === "exercises" && (
          <div>
            <button
              type="reset"
              className="bg-red-700 text-white h-[40px] w-[120px] hover:border-3  px-2 hover:opacity-80"
              onClick={() => setOpenAddExerciseModel((state) => !state)}
            >
              Add Exercise
            </button>
          </div>
        )}
        {isAdmin && type === "pts" && (
          <div>
            <button
              type="reset"
              className="bg-red-700 text-white h-[60px] w-[150px] hover:border-3  px-2 hover:opacity-80"
              onClick={() => setOpenAddTrainerModal((state) => !state)}
            >
              Add Personal Trainer
            </button>
          </div>
        )} */}
      </div>
      <table className="border border-gray-700 w-full text-left">
        <thead className="bg-red-800 text-center">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="capitalize px-4.5 py-3">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className={`
                ${i % 2 === 0 ? "bg-gray-900 " : "bg-gray-800"}
                `}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className=" px-2.5 py-3 text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="text-center h-32">
              <td colSpan={12}>No Record Found!</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* pagination */}
      <div className="flex items-center justify-end mt-2 gap-2">
        <button
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30"
        >
          {"<"}
        </button>
        <button
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30"
        >
          {">"}
        </button>

        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16 bg-transparent"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="p-2 bg-transparent"
        >
          {[10, 20, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      {openAssignLecturerReview && (
        <AssignLecturerReviewForm
          currentThesis={adviser}
          setOpenAssignLecturerReview={setOpenAssignLecturerReview}
        />
      )}
    </div>
  );
};
const SearchIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
    </svg>
  );
};
function camelToCapitalize(inputStr) {
  return inputStr
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (str) => str.toUpperCase());
}
function parseDate(string) {
  const birthday = new Date(string);

  // Lấy ngày, tháng, năm
  const day = birthday.getDate();
  const month = birthday.getMonth() + 1; // Ghi chú: getMonth trả về giá trị từ 0 đến 11
  const year = birthday.getFullYear();

  // Tạo chuỗi ngày tháng năm
  return `${day}/${month}/${year}`;
}
export default BaseTable;
