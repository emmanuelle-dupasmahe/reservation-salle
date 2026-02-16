-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 16, 2026 at 02:40 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `resa-salle`
--

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `date_resa` date NOT NULL,
  `heure_debut` time NOT NULL,
  `heure_fin` time NOT NULL,
  `objet` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `user_id`, `date_resa`, `heure_debut`, `heure_fin`, `objet`) VALUES
(3, 1, '2026-02-13', '11:00:00', '13:00:00', 'ESSAI'),
(10, 1, '2026-02-13', '18:00:00', '19:00:00', 'ESSAI56'),
(16, 1, '2026-02-17', '10:00:00', '12:00:00', 'réunion d\'information'),
(18, 5, '2026-02-13', '17:00:00', '18:00:00', 'réunion de fin de semaine'),
(19, 7, '2026-02-13', '19:00:00', '20:00:00', 'reunion avant la nuit'),
(20, 7, '2026-02-18', '10:00:00', '11:00:00', 'reunion'),
(21, 5, '2026-02-16', '14:00:00', '18:00:00', 'réunion très longue'),
(25, 5, '2026-02-18', '08:00:00', '09:00:00', 'réunion essai'),
(26, 5, '2026-02-20', '14:00:00', '16:00:00', 'Objet modifié par Postman'),
(27, 5, '2026-02-17', '09:00:00', '10:00:00', 'réunion à modifier'),
(28, 5, '2026-02-24', '10:00:00', '11:00:00', 'réunion prévue dans longtemps'),
(30, 5, '2026-02-19', '08:00:00', '09:00:00', 'reunion 2');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `firstname` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `lastname` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `firstname`, `lastname`, `created_at`, `updated_at`) VALUES
(1, 'jane@techspace.com', '$2b$10$Q.yOGHRSIUU.pivTxfvyPeDqqNHvb/rQtUksU8EIbOJa6csEPSgBy', 'Jane', 'Doe', '2026-02-10 13:39:47', '2026-02-10 13:39:47'),
(2, 'rosina_dickens@yahoo.com', '$2b$10$i5Kcwqie2I00d0tXUJhQgunTcZGJyX.1voR5XaPnWOkuiUPDN2ZUa', 'Tyrique', '{{$randowLastName}}', '2026-02-10 15:25:52', '2026-02-10 15:25:52'),
(3, 'wilmer.adams95@hotmail.com', '$2b$10$jCE9Qc0sQjdssBw6iDjOtuZZu2y177X32NxG1XmrbQUvg85KbdjAO', 'Porter', 'Rowe', '2026-02-10 15:28:24', '2026-02-10 15:28:24'),
(4, 'nat.dickens70@gmail.com', '$2b$10$GHJT1PJzfF9BDBp6XWb9f.VYK1Iv3FLqN.27ek5JqRBgaWosOsYfC', 'Evert', 'Schumm', '2026-02-11 13:44:35', '2026-02-11 13:44:35'),
(5, 'manux@gmail.com', '$2b$10$xuBJE.3H4X0AjmGTMLBOWudzZv.x8/ikLMIGFLAqIxhKosJ/dJfz2', 'Manux', 'De', '2026-02-11 13:53:25', '2026-02-11 13:53:25'),
(6, 'tony.bechtelar25@yahoo.com', '$2b$10$5fCeSYzmFZ9N45TSYXuhDuGZLiOVRM8j.TuFg2WFEQwCCM7psrS5q', 'Marques', 'Cassin', '2026-02-12 08:27:57', '2026-02-12 08:27:57'),
(7, 'alfred@gmail.com', '$2b$10$pvSv8ijcBlFFH8hnkSlwDuzbfT1SSZfPGhhfSs1.czdTnjWI.TIyS', 'Alfred', 'chat', '2026-02-13 13:55:33', '2026-02-13 13:55:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
