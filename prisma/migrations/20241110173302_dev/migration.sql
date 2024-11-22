-- CreateTable
CREATE TABLE "Commande" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "chauffeurId" TEXT,
    "vehiculeId" TEXT,
    "commande_DateId" TEXT,
    CONSTRAINT "Commande_commande_DateId_fkey" FOREIGN KEY ("commande_DateId") REFERENCES "Commande_Date" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Commande_chauffeurId_fkey" FOREIGN KEY ("chauffeurId") REFERENCES "Chauffeur" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Commande_vehiculeId_fkey" FOREIGN KEY ("vehiculeId") REFERENCES "Vehicule" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Commande_Service_Price" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "price" REAL NOT NULL,
    "serviceId" TEXT NOT NULL,
    CONSTRAINT "Commande_Service_Price_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Commande_Date" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "debut" DATETIME NOT NULL,
    "fin" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Vehicule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Chauffeur" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin'
);
