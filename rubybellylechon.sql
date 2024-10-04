-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 29, 2024 at 06:32 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rubybellylechon`
--

-- --------------------------------------------------------

--
-- Table structure for table `acustomer`
--

CREATE TABLE `acustomer` (
  `customerid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `contactNumber` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `acustomer`
--

INSERT INTO `acustomer` (`customerid`, `name`, `address`, `contactNumber`) VALUES
(3, 'frrf', 'frrfrf', 2147483647);

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `Id` int(11) UNSIGNED NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `pin` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`Id`, `username`, `password`, `pin`) VALUES
(1, 'admin', 'admin123', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `aproduct`
--

CREATE TABLE `aproduct` (
  `productid` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `aproduct`
--

INSERT INTO `aproduct` (`productid`, `name`, `price`, `description`) VALUES
(2, 'Product 2', 29.99, 'Description for product 2'),
(3, 'Product 3', 39.99, 'Description for product 3'),
(4, 'Product 4', 49.99, 'Description for product 4'),
(14, 'liempo', 4000.00, '5kilos'),
(16, 'liempo', 0.00, 'liempo'),
(17, 'dwawadwda', 0.00, 'wadwadwad'),
(18, 'awdwdadwa', 0.00, 'wadwaddwa');

-- --------------------------------------------------------

--
-- Table structure for table `astaff`
--

CREATE TABLE `astaff` (
  `staffid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `contact` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `astaff`
--

INSERT INTO `astaff` (`staffid`, `name`, `position`, `contact`) VALUES
(2, 'dwaawdwad', 'wwwwwww', 1421424);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `acustomer`
--
ALTER TABLE `acustomer`
  ADD PRIMARY KEY (`customerid`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `aproduct`
--
ALTER TABLE `aproduct`
  ADD PRIMARY KEY (`productid`);

--
-- Indexes for table `astaff`
--
ALTER TABLE `astaff`
  ADD PRIMARY KEY (`staffid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `acustomer`
--
ALTER TABLE `acustomer`
  MODIFY `customerid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `Id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `aproduct`
--
ALTER TABLE `aproduct`
  MODIFY `productid` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `astaff`
--
ALTER TABLE `astaff`
  MODIFY `staffid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
