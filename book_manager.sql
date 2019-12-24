-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: book_manager
-- ------------------------------------------------------
-- Server version	5.7.28-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ct_donhang`
--

DROP TABLE IF EXISTS `ct_donhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ct_donhang` (
  `id_donhang` int(11) NOT NULL,
  `id_sanpham` int(11) NOT NULL,
  `sl` int(11) DEFAULT NULL,
  `thanhtien` float DEFAULT NULL,
  PRIMARY KEY (`id_donhang`,`id_sanpham`),
  CONSTRAINT `FK_ct_donhang_donhang` FOREIGN KEY (`id_donhang`) REFERENCES `donhang` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ct_donhang`
--

LOCK TABLES `ct_donhang` WRITE;
/*!40000 ALTER TABLE `ct_donhang` DISABLE KEYS */;
/*!40000 ALTER TABLE `ct_donhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donhang`
--

DROP TABLE IF EXISTS `donhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donhang` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ngaylap` datetime DEFAULT NULL,
  `tongtien` float DEFAULT NULL,
  `thue` float DEFAULT NULL,
  `id_seller` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_donhang_members_idx` (`id_seller`),
  CONSTRAINT `FK_donhang_members` FOREIGN KEY (`id_seller`) REFERENCES `members` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donhang`
--

LOCK TABLES `donhang` WRITE;
/*!40000 ALTER TABLE `donhang` DISABLE KEYS */;
INSERT INTO `donhang` VALUES (1,'2019-12-18 08:30:00',175000,17.5,2);
/*!40000 ALTER TABLE `donhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loai_member`
--

DROP TABLE IF EXISTS `loai_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loai_member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tenloai` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loai_member`
--

LOCK TABLES `loai_member` WRITE;
/*!40000 ALTER TABLE `loai_member` DISABLE KEYS */;
INSERT INTO `loai_member` VALUES (1,'admin'),(2,'seller'),(3,'warehouse');
/*!40000 ALTER TABLE `loai_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(5000) COLLATE utf8_unicode_ci NOT NULL,
  `ten` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `loai` int(11) DEFAULT NULL,
  `ngaysinh` date DEFAULT NULL,
  `diachi` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `sdt` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `luong` float DEFAULT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gioitinh` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `FK_member_loaimember_idx` (`loai`),
  CONSTRAINT `FK_member_loaimember` FOREIGN KEY (`loai`) REFERENCES `loai_member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,'mtp','12345','Nguyễn Quang Hải',1,'1999-05-27','227 nguyễn văn cừ quận 5','0981937907',30000000,'lequanghai540@gmail.com',NULL),(2,'333','12345','Nguyễn Văn Toàn',2,'1999-04-16','245 phan đình phùng tân bình','0132486412',15000000,'nguyenvantoan@gmail.com',NULL),(10,'trinh','$2a$10$pQv8KxsCz0iyJfmhA7sYOe4YWkmVKO6sNRMDb/UnPhAGLD4mQEPb2','LÊ QUANG HẢI',1,'2019-12-09','ktx khu B Đại Học Quốc Gia tp Hồ Chí Minh, linh trung, Thủ Đức',NULL,NULL,'lequanghai540@gmail.com','Nữ'),(11,'quanghaitt','$2a$10$DWwpvOIoAEamk8dvzXkWc.P0mYwa1dQq8Wyp8q.1Zy41yrHnXgVRG','LÊ QUANG HẢI',2,'2019-12-08','ktx khu B Đại Học Quốc Gia tp Hồ Chí Minh, linh trung, Thủ Đức',NULL,NULL,'lequanghai540@gmail.com','Nam');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanpham` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tensanpham` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `sl` int(11) DEFAULT NULL,
  `tentacgia` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `nxb` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `id_theloai` int(11) DEFAULT NULL,
  `dongia` float DEFAULT NULL,
  `img` longtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `FK_sanpham_theloai_idx` (`id_theloai`),
  CONSTRAINT `FK_sanpham_theloai` FOREIGN KEY (`id_theloai`) REFERENCES `theloai` (`id_theloai`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham`
--

LOCK TABLES `sanpham` WRITE;
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT INTO `sanpham` VALUES (1,'Nhà giả kim',10,'Paulo Coelho','nhà xuất bản văn học',1,59000,'https://salt.tikicdn.com/cache/550x550/ts/product/66/5f/5a/312bac222584d52fea5e9d644369b254.jpg'),(2,'Đắc nhân tâm',2,'Dale Carnegie','nhà xuất bản tổng hơp thành phố HCM',1,57000,'https://bookmart.vn/wp-content/uploads/sach-dac-nhan-tam.jpg'),(3,'Tuổi trẻ đáng giá bao nhiêu',50,'Rosie Nguyễn','nhà xuất bản hội nhà văn',1,58000,'https://cdn0.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/i/m/image_180164_2_287.jpg'),(4,'Chạm tới giấc mơ',100,'Sơn Tùng MTP','nhà xuất bản Hà Nội',1,60000,'https://salt.tikicdn.com/cache/550x550/media/catalog/product/p/h/photo_2017-09-29_14-07-40.u5567.d20170929.t140824.120862.jpg'),(5,'Tuổi trẻ chúng ta sẽ xanh mãi mãi',20,'Jinie Lynk','Nhà Xuất Bản Văn Học',2,65000,'https://salt.tikicdn.com/cache/550x550/ts/product/80/42/a3/f0c11d1d1328bc6a1bd05c93fae6be07.jpg'),(6,'Yêu đi đừng sợ',30,'Kim Oanh','Nhà Xuất Bản Phụ Nữ',2,48000,'https://salt.tikicdn.com/cache/550x550/ts/product/a3/9e/8a/f882cd9601f509c666eb4ce51f7dc830.jpg'),(7,'Mặn Béo Chua Nóng',5,'Samin Nosrat','Nhà Xuất Bản Phụ Nữ',4,360000,'https://salt.tikicdn.com/cache/w1200/ts/product/fc/55/35/f8cc09b40d5e6c04a0337dc5de9274e5.jpg'),(8,'Nấu Ăn Thông Minh - Tập 2',55,' Nguyễn Quốc Thục Phương','Nhà Xuất Bản Thế Giới',4,105000,'https://cf.shopee.vn/file/fde7f31072295c7bbda2ca4442df3dcc'),(9,'90% Trẻ Thông Minh Nhờ ',32,'Urako Kanamori','Nhà Xuất Bản Kim Đồng',6,25000,'https://salt.tikicdn.com/cache/550x550/ts/product/8c/da/cf/a05e93cfaf55e7917ef565717d581770.jpg'),(10,'Nuôi Con Không Phải Là Cuộc Chiến (Tái Bản)',70,'Mẹ Ong Bông','Nhà Xuất Bản Lao Động',6,69000,'https://salt.tikicdn.com/cache/550x550/ts/product/73/f8/56/2f60cf49537bc17bc3e18a67a172099f.jpg');
/*!40000 ALTER TABLE `sanpham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `theloai`
--

DROP TABLE IF EXISTS `theloai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `theloai` (
  `id_theloai` int(11) NOT NULL,
  `ten` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id_theloai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `theloai`
--

LOCK TABLES `theloai` WRITE;
/*!40000 ALTER TABLE `theloai` DISABLE KEYS */;
INSERT INTO `theloai` VALUES (1,'kĩ năng'),(2,'tình cảm'),(3,'tiểu thuyết'),(4,'nấu ăn'),(5,'sách tham khảo'),(6,'sách dạy trẻ');
/*!40000 ALTER TABLE `theloai` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-24 17:11:52
