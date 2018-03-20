-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 25, 2017 at 08:26 AM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 7.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `playlist`
--

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

CREATE TABLE `playlists` (
  `id` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET hp8 COLLATE hp8_bin NOT NULL,
  `image` varchar(1000) CHARACTER SET hp8 COLLATE hp8_bin NOT NULL,
  `songs` text CHARACTER SET hp8 COLLATE hp8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `playlists`
--

INSERT INTO `playlists` (`id`, `name`, `image`, `songs`) VALUES
(1, 'uks finest', 'images/uk.jpg', '[{\"url\":\"songs\\/AdinaHoward-FreakLikeMe.mp3\",\"name\":\"Adina howard -freak like me\"},{\"url\":\"songs\\/Endor-TellMeImTheOne.mp3\",\"name\":\"Endor -the one\"},{\"url\":\"songs\\/Endor&TRUConcept-Intentions(Ft.Romany).mp3\",\"name\":\"Endor & Truconcept -intentions\"},{\"url\":\"songs\\/HotSource-LovinYouFeatChrystalVIPMix.mp3\",\"name\":\"hotsource-lovingyou\"},{\"url\":\"songs\\/Skream-InForTheKill(Endor Remix).mp3\",\"name\":\"skream - in for the kill\"}]'),
(2, 'nightcore', 'images/nightcore2.jpg', '[{\"url\":\"songs\\/nightcore-callfrombabylon.mp3\",\"name\":\"nightcore - call from babylon\"},{\"url\":\"songs\\/89ers-GoGoGo.mp3\",\"name\":\"89ers-go go go\"},{\"url\":\"songs\\/Kisu-CottonEyeJoe.mp3\",\"name\":\"kisu - cotton eye joe\"},{\"url\":\"songs\\/Nightcore-Bailando.mp3\",\"name\":\"paradisio - bailando\"},{\"url\":\"songs\\/Nightcore-Lambada.mp3\",\"name\":\"nightcore - lambada\"},{\"url\":\"songs\\/nightcore-Summertime.mp3\",\"name\":\"k391 - summertime\"},{\"url\":\"songs\\/Nightcore-Imanalbatraoz.mp3\",\"name\":\"nightcore - im an albatros\"}]'),
(3, 'house', 'images/house.jpg', '[{\"url\":\"songs\\/Alcatraz-GiveMeLove(1995).mp3\",\"name\":\"alcatraz - give me luv\"},{\"url\":\"songs\\/sisyey-doitgood.mp3\",\"name\":\"sisyey-do it good\"},{\"url\":\"songs\\/Oliver$&JimiJulesPushingOn.mp3\",\"name\":\"oliver$&jimijules-pushin on\"},{\"url\":\"songs\\/JuniorJack-Stupidisco.mp3\",\"name\":\"junior jack-stupidisco\"},{\"url\":\"songs\\/JuniorJackESamba.mp3\",\"name\":\"junior jack-E samba\"},{\"url\":\"songs\\/Smurf & Perry ft. The Voice of Concha Buika - Lovin You (Vincenzo\'s Classic Club Mix).mp3\",\"name\":\"smurfandperry - loving you\"}]'),
(221, 'kiwi', 'images/kiwi.jpg', '[{\"url\":\"songs\\/Sean&Bobo - 119.mp3\",\"name\":\"sean and bobo -119\"},{\"url\":\"songs\\/TheFatRat - Monody (ft. Laura Brehm).mp3\",\"name\":\"the fat rat - monody\"}]'),
(222, 'new', 'images/spiral2.jpg', '[{\"url\":\"songs\\/CORE - Dead Feelings.mp3\",\"name\":\"core -dead feelings\"},{\"url\":\"songs\\/BRD - Chm2Word [Chiptune].mp3\",\"name\":\"brd -chm2word\"}]'),
(223, 'galaxy', 'images/galaxy.jpg', '[{\"url\":\"songs\\/X-COM UFO Defense PSX - 01 - Geoscape1.mp3\",\"name\":\"geospace1\"},{\"url\":\"songs\\/X-COM UFO Defense PSX - 02 - Geoscape2.mp3\",\"name\":\"geospace2\"},{\"url\":\"songs\\/X-COM UFO Defense PSX - 03 - Geoscape3.mp3\",\"name\":\"geospace3\"}]'),
(224, 'empty', 'images/spiral.jpg', '[{\"url\":\"aaa.mp3\",\"name\":\"aaa\"}]'),
(225, 'fractal', 'images/fractal.jpg', '[{\"url\":\"songs\\/Little Big Adventure (LBA\'s Theme).mp3\",\"name\":\"lbas theme\"}]'),
(226, 'zzz zzz', 'images/spiral5.png', '[{\"url\":\"aaa.mp3\",\"name\":\"aaa\"},{\"name\":\"ccc\",\"url\":\"zzz.mp3\"}]'),
(227, 'aaa', 'images/spiral.png', '[{\"url\":\"aaa.mp3\",\"name\":\"aaa\"},{\"url\":\"aa.mp3\",\"name\":\"aa\"},{\"url\":\"bbcd.mp3\",\"name\":\"bbcd\"},{\"url\":\"bbbbb.mp3\",\"name\":\"bbbbb\"}]'),
(228, 'aaa', 'images/spiral.png', '[{\"url\":\"aaa.mp3\",\"name\":\"aaa\"},{\"url\":\"aa.mp3\",\"name\":\"aa\"},{\"url\":\"bbcd.mp3\",\"name\":\"bbcd\"},{\"url\":\"bbbbb.mp3\",\"name\":\"bbbbb\"}]'),
(229, 'aaa', 'images/spiral.png', '[{\"url\":\"aaa.mp3\",\"name\":\"aaa\"},{\"url\":\"aa.mp3\",\"name\":\"aa\"},{\"url\":\"bbcd.mp3\",\"name\":\"bbcd\"},{\"url\":\"bbbbb.mp3\",\"name\":\"bbbbb\"}]'),
(231, 'zzzz', 'images\\spiral.gif', '[{\"url\":\"one.mp3\",\"name\":\"one\"},{\"url\":\"two.mp3\",\"name\":\"two\"}]'),
(233, 'azbz', 'images\\spiral.gif', '[{\"url\":\"aazzz.mp3\",\"name\":\"aazz\"}]'),
(234, 'zazaza', 'images/spiral2.jpg', '[{\"url\":\"zazaza.mp3\",\"name\":\"zazaza\"}]'),
(268, 'zuzubuzu', 'images/spiral.jpg', '[{\"url\":\"qqq.mp3\",\"name\":\"aaa\"}]'),
(269, 'a', 'images/spiral.png', '[{\"url\":\"s.mp3\",\"name\":\"s\"},{\"url\":\"a.mp3\",\"name\":\"y\"}]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `playlists`
--
ALTER TABLE `playlists`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `playlists`
--
ALTER TABLE `playlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=270;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
