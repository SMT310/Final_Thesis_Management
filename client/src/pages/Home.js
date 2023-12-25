import React from "react";
import { Typography, Box, Divider } from "@mui/material";
function Notification() {
  return (
    <div>
      <Typography
        sx={{ color: "#00558d", fontSize: "18px", fontWeight: "bold" }}
      >
        Danh sách sinh viên Dự kiến được công nhận tốt nghiệp đợt 2 Tháng
        01/2023_2024 cập nhật ngày 20/12/2023
      </Typography>
      <p>[Ngày đăng: 21/12/2023]</p>
      <Box sx={{ ml: 4, mt: 2, mb: 2 }}>
        <p>
          Sinh viên xem danh sách dự kiến được công nhận tốt nghiệp đợt 2 tháng
          01/2023_2024 cập nhật ngày 20/12/2023 tại đây.
        </p>

        <ul>
          <li>
            Yêu cầu sinh viên tự kiểm tra thông tin cá nhân của mình bao gồm:
          </li>
          <Box sx={{ ml: 3 }}>
            <ul>
              <li>Họ và tên</li>
              <li>Ngày tháng năm sinh</li>
              <li>Nơi sinh (chỉ để tên tỉnh)</li>
              <li>Giới tính</li>
              <li>Quốc tịch</li>
            </ul>
          </Box>
          <li>
            Nếu thông tin chưa đúng yêu cầu, sinh viên liên hệ cô Thảo phòng
            TS&CTSV gmail thanhthao@hcmute.edu.vn để được điều chỉnh thông tin.
          </li>
          <li>
            Sinh viên có tên trong danh sách dự kiến được công nhận tốt nghiệp
            ngày 20/12/2023 tiếp tục theo dõi thông tin trên file danh sách ĐƯỢC
            CÔNG NHẬN TỐT NGHIỆP. Nếu sinh viên có tên trong danh sách này nhưng
            không có tên trong các danh sách ĐƯỢC CÔNG NHẬN TỐT NGHIỆP, liên hệ
            cô Quỳnh PĐT A1-201 qua gmail quynhbt@hcmute.edu.vn TRƯỚC 17H Ngày
            22/12/2023. Mọi phản hồi sau 17h ngày 22/12/2023 sẽ được giải quyết
            vào đợt xét tốt nghiệp tiếp theo.
          </li>
          <li>
            Sinh viên còn nợ sách Thư viện hoàn tất thủ tục trước khi tốt
            nghiệp.
          </li>
        </ul>
      </Box>
      <Divider />
      <Box>
        <div>
          <Typography
            sx={{ color: "#00558d", fontSize: "18px", fontWeight: "bold" }}
          >
            Thông báo mới
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{
              width: '10px',
              height: '10px',
              backgroundColor: '#00558d',
              borderRadius: '50%',
              mr: 2,
            }}>

            </Box>
            <h3>
              Danh sách sinh viên Dự kiến được công nhận tốt nghiệp đợt 2 Tháng
              01/2023_2024 cập nhật ngày 20/12/2023
            </h3>


            {/* Additional details for this notification */}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{
              width: '10px',
              height: '10px',
              backgroundColor: '#00558d',
              borderRadius: '50%',
              mr: 2,
            }}>

            </Box>
            <Box sx={{ display: 'flex' }}>
              Sinh viên xem danh sách dự kiến được công nhận tốt nghiệp đợt 2
              tháng 01/2023_2024 cập nhật ngày 20/12/2023 <Typography sx={{ ml: 1, color: '#00558d', fontWeight: 'bold' }}>tại đây</Typography>.
            </Box>


          </Box>

        </div>
      </Box>
    </div>
  );
}

export default Notification;
