# ManageProduct

- Sơ lược:
+ Ban đầu đường dẫn mặc định là localhost:3000 sẽ dẫn tới trang đăng nhập, người dùng buộc phải đăng nhập tài khoản vào để 
phân biệt loại người dùng hiển thị trang cho phù hợp
+ routes: sẽ có 3 routes chính là admin , seller, và warehouse


LINK IMPORT / EXPORT DATA USE MYSQL WORKBENCH
https://dev.mysql.com/doc/workbench/en/wb-admin-export-import-management.html

Công việc chính phải làm:

- Phân quyền: phân quyền phân view cho admin, seller, bidder
+ Chức năng admin:
	. Tạo được tài khoản cho thành viên còn lại
	. Xem thống kê doanh thu theo tháng
	. Xem thông tin member, xóa member
+ Chức năng seller:
	. Tìm kiếm sách theo mã , theo thể loại , xắp xếp được
theo giá tăng dần
	. Tạo được đơn hàng, xóa được đơn hàng
	. Xem danh sách đơn hàng
+ Chức năng warehouse:(vẫn có chức năng tìm kiếm sách như seller)
	. Thêm/xóa được sách vào kho
	. Sửa được thông tin sách
