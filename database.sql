-- MySQL dump 10.13  Distrib 5.5.46, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: project
-- ------------------------------------------------------
-- Server version	5.5.46-0ubuntu0.14.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `disease`
--

DROP TABLE IF EXISTS `disease`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `disease` (
  `dno` int(11) NOT NULL AUTO_INCREMENT,
  `dname` varchar(50) DEFAULT NULL,
  `dval` int(255) NOT NULL,
  `description` text,
  `remedy` text,
  PRIMARY KEY (`dno`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disease`
--

LOCK TABLES `disease` WRITE;
/*!40000 ALTER TABLE `disease` DISABLE KEYS */;
INSERT INTO `disease` VALUES (1,'anemia',37,'Coming Soon','Dont lose hope');
/*!40000 ALTER TABLE `disease` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `region` (
  `rno` int(11) NOT NULL AUTO_INCREMENT,
  `rname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`rno`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region`
--

LOCK TABLES `region` WRITE;
/*!40000 ALTER TABLE `region` DISABLE KEYS */;
INSERT INTO `region` VALUES (1,'head'),(2,'righthand'),(3,'lefthand');
/*!40000 ALTER TABLE `region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regionsymptom`
--

DROP TABLE IF EXISTS `regionsymptom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `regionsymptom` (
  `rsid` int(11) NOT NULL AUTO_INCREMENT,
  `rno` int(11) NOT NULL,
  `sno` int(11) NOT NULL,
  PRIMARY KEY (`rsid`),
  KEY `rno` (`rno`),
  KEY `sno` (`sno`),
  CONSTRAINT `regionsymptom_ibfk_1` FOREIGN KEY (`rno`) REFERENCES `region` (`rno`),
  CONSTRAINT `regionsymptom_ibfk_2` FOREIGN KEY (`sno`) REFERENCES `symptom` (`sno`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regionsymptom`
--

LOCK TABLES `regionsymptom` WRITE;
/*!40000 ALTER TABLE `regionsymptom` DISABLE KEYS */;
INSERT INTO `regionsymptom` VALUES (1,1,1),(2,1,2),(3,2,3),(4,2,4),(5,3,3),(6,3,4);
/*!40000 ALTER TABLE `regionsymptom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `symptom`
--

DROP TABLE IF EXISTS `symptom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `symptom` (
  `sno` int(11) NOT NULL AUTO_INCREMENT,
  `sname` varchar(50) DEFAULT NULL,
  `sval` int(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`sno`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `symptom`
--

LOCK TABLES `symptom` WRITE;
/*!40000 ALTER TABLE `symptom` DISABLE KEYS */;
INSERT INTO `symptom` VALUES (1,'headache',134,'Painfull feeling inside the head'),(2,'Dizzines',20,'A terrible horrible'),(3,'Rashes',89,'A condition which causes itching sensation'),(4,'Swelling',100,'an abnormal enlargement of a part of the body, typically as a result of an accumulation of fluid');
/*!40000 ALTER TABLE `symptom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `uno` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `type` char(1) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uno`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Roshin Mohanadas','B','roshinm.mec@gmail.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-01-12  9:03:52
