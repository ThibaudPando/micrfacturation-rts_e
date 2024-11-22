-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Commande" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "chauffeurId" TEXT,
    "vehiculeId" TEXT,
    "contactId" TEXT,
    "commande_DateId" TEXT,
    CONSTRAINT "Commande_commande_DateId_fkey" FOREIGN KEY ("commande_DateId") REFERENCES "Commande_Date" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Commande_chauffeurId_fkey" FOREIGN KEY ("chauffeurId") REFERENCES "Chauffeur" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Commande_vehiculeId_fkey" FOREIGN KEY ("vehiculeId") REFERENCES "Vehicule" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Commande_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Commande" ("chauffeurId", "commande_DateId", "id", "name", "vehiculeId") SELECT "chauffeurId", "commande_DateId", "id", "name", "vehiculeId" FROM "Commande";
DROP TABLE "Commande";
ALTER TABLE "new_Commande" RENAME TO "Commande";
CREATE TABLE "new_Commande_Service_Price" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "price" REAL NOT NULL,
    "serviceId" TEXT NOT NULL,
    "commandeId" TEXT,
    CONSTRAINT "Commande_Service_Price_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Commande_Service_Price_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "Commande" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Commande_Service_Price" ("id", "price", "serviceId") SELECT "id", "price", "serviceId" FROM "Commande_Service_Price";
DROP TABLE "Commande_Service_Price";
ALTER TABLE "new_Commande_Service_Price" RENAME TO "Commande_Service_Price";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
