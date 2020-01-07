-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 05, 2020 at 06:37 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `book_manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `id_seller` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `sl` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `id_seller`, `id_product`, `sl`) VALUES
(7, 1, 2, 2),
(8, 1, 5, 22),
(9, 1, 7, 33);

-- --------------------------------------------------------

--
-- Table structure for table `ct_donhang`
--

CREATE TABLE `ct_donhang` (
  `id_donhang` int(11) NOT NULL,
  `id_sanpham` int(11) NOT NULL,
  `sl` int(11) DEFAULT NULL,
  `thanhtien` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `donhang`
--

CREATE TABLE `donhang` (
  `id` int(11) NOT NULL,
  `ngaylap` datetime DEFAULT NULL,
  `tongtien` float DEFAULT NULL,
  `thue` float DEFAULT NULL,
  `id_seller` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `donhang`
--

INSERT INTO `donhang` (`id`, `ngaylap`, `tongtien`, `thue`, `id_seller`) VALUES
(1, '2019-12-18 08:30:00', 175000, 17.5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `loai_member`
--

CREATE TABLE `loai_member` (
  `id` int(11) NOT NULL,
  `tenloai` varchar(50) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `loai_member`
--

INSERT INTO `loai_member` (`id`, `tenloai`) VALUES
(1, 'admin'),
(2, 'seller'),
(3, 'warehouse');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(5000) COLLATE utf8_unicode_ci NOT NULL,
  `ten` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `loai` int(11) DEFAULT NULL,
  `ngaysinh` date DEFAULT NULL,
  `diachi` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `sdt` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `luong` float DEFAULT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gioitinh` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `username`, `password`, `ten`, `loai`, `ngaysinh`, `diachi`, `sdt`, `luong`, `email`, `gioitinh`) VALUES
(1, 'mtp', '123456', 'Nguyễn Quang Hải', 1, '1999-05-27', '227 nguyễn văn cừ quận 5', '0981937907', 30000000, 'lequanghai540@gmail.com', NULL),
(2, '333', '12345', 'Nguyễn Văn Toàn', 2, '1999-04-16', '245 phan đình phùng tân bình', '0132486412', 15000000, 'nguyenvantoan@gmail.com', NULL),
(10, 'trinh', '$2a$10$pQv8KxsCz0iyJfmhA7sYOe4YWkmVKO6sNRMDb/UnPhAGLD4mQEPb2', 'LÊ QUANG HẢI', 1, '2019-12-09', 'ktx khu B Đại Học Quốc Gia tp Hồ Chí Minh, linh trung, Thủ Đức', NULL, NULL, 'lequanghai540@gmail.com', 'Nữ'),
(11, 'quanghaitt', '$2a$10$DWwpvOIoAEamk8dvzXkWc.P0mYwa1dQq8Wyp8q.1Zy41yrHnXgVRG', 'LÊ QUANG HẢI', 2, '2019-12-08', 'ktx khu B Đại Học Quốc Gia tp Hồ Chí Minh, linh trung, Thủ Đức', NULL, NULL, 'lequanghai540@gmail.com', 'Nam');

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

CREATE TABLE `sanpham` (
  `id` int(11) NOT NULL,
  `tensanpham` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `sl` int(11) DEFAULT NULL,
  `tentacgia` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `nxb` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `id_theloai` int(11) DEFAULT NULL,
  `dongia` float DEFAULT NULL,
  `img` longtext COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sanpham`
--

INSERT INTO `sanpham` (`id`, `tensanpham`, `sl`, `tentacgia`, `nxb`, `id_theloai`, `dongia`, `img`) VALUES
(2, 'Đắc nhân tâm', 2, 'Dale Carnegie', 'nhà xuất bản tổng hơp thành phố HCM', 1, 57000, 'https://bookmart.vn/wp-content/uploads/sach-dac-nhan-tam.jpg'),
(3, 'Tuổi trẻ đáng giá bao nhiêu', 50, 'Rosie Nguyễn', 'nhà xuất bản hội nhà văn', 1, 58000, 'https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_180164_2_287.jpg'),
(4, 'Chạm tới giấc mơ', 100, 'Sơn Tùng MTP', 'nhà xuất bản Hà Nội', 1, 60000, 'https://salt.tikicdn.com/cache/550x550/media/catalog/product/p/h/photo_2017-09-29_14-07-40.u5567.d20170929.t140824.120862.jpg'),
(5, 'Tuổi trẻ chúng ta sẽ xanh mãi mãi', 20, 'Jinie Lynk', 'Nhà Xuất Bản Văn Học', 2, 65000, 'https://salt.tikicdn.com/cache/550x550/ts/product/80/42/a3/f0c11d1d1328bc6a1bd05c93fae6be07.jpg'),
(6, 'Yêu đi đừng sợ', 30, 'Kim Oanh', 'Nhà Xuất Bản Phụ Nữ', 2, 48000, 'https://salt.tikicdn.com/cache/550x550/ts/product/a3/9e/8a/f882cd9601f509c666eb4ce51f7dc830.jpg'),
(7, 'Mặn Béo Chua Nóng', 5, 'Samin Nosrat', 'Nhà Xuất Bản Phụ Nữ', 4, 360000, 'https://salt.tikicdn.com/cache/w1200/ts/product/fc/55/35/f8cc09b40d5e6c04a0337dc5de9274e5.jpg'),
(8, 'Nấu Ăn Thông Minh - Tập 2', 55, ' Nguyễn Quốc Thục Phương', 'Nhà Xuất Bản Thế Giới', 4, 105000, 'https://cf.shopee.vn/file/fde7f31072295c7bbda2ca4442df3dcc'),
(9, '90% Trẻ Thông Minh Nhờ ', 32, 'Urako Kanamori', 'Nhà Xuất Bản Kim Đồng', 6, 25000, 'https://salt.tikicdn.com/cache/550x550/ts/product/8c/da/cf/a05e93cfaf55e7917ef565717d581770.jpg'),
(122, '111111', 111, '111111', '111111111', 3, 111, '');

-- --------------------------------------------------------

--
-- Table structure for table `theloai`
--

CREATE TABLE `theloai` (
  `id_theloai` int(11) NOT NULL,
  `ten` varchar(50) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `theloai`
--

INSERT INTO `theloai` (`id_theloai`, `ten`) VALUES
(1, 'kĩ năng'),
(2, 'tình cảm'),
(3, 'tiểu thuyết'),
(4, 'nấu ăn'),
(5, 'sách tham khảo'),
(6, 'sách dạy trẻ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `donhang`
--
ALTER TABLE `donhang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_donhang_members_idx` (`id_seller`);

--
-- Indexes for table `loai_member`
--
ALTER TABLE `loai_member`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username_UNIQUE` (`username`),
  ADD KEY `FK_member_loaimember_idx` (`loai`);

--
-- Indexes for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_sanpham_theloai_idx` (`id_theloai`);

--
-- Indexes for table `theloai`
--
ALTER TABLE `theloai`
  ADD PRIMARY KEY (`id_theloai`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `donhang`
--
ALTER TABLE `donhang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `loai_member`
--
ALTER TABLE `loai_member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1223;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ct_donhang`
--
ALTER TABLE `ct_donhang`
  ADD CONSTRAINT `FK_ct_donhang_donhang` FOREIGN KEY (`id_donhang`) REFERENCES `donhang` (`id`);

--
-- Constraints for table `donhang`
--
ALTER TABLE `donhang`
  ADD CONSTRAINT `FK_donhang_members` FOREIGN KEY (`id_seller`) REFERENCES `members` (`id`);

--
-- Constraints for table `members`
--
ALTER TABLE `members`
  ADD CONSTRAINT `FK_member_loaimember` FOREIGN KEY (`loai`) REFERENCES `loai_member` (`id`);

--
-- Constraints for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `FK_sanpham_theloai` FOREIGN KEY (`id_theloai`) REFERENCES `theloai` (`id_theloai`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
