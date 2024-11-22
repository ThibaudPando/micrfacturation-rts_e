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
    "clientId" TEXT,
    CONSTRAINT "Commande_commande_DateId_fkey" FOREIGN KEY ("commande_DateId") REFERENCES "Commande_Date" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Commande_chauffeurId_fkey" FOREIGN KEY ("chauffeurId") REFERENCES "Chauffeur" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Commande_vehiculeId_fkey" FOREIGN KEY ("vehiculeId") REFERENCES "Vehicule" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Commande_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Commande_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Commande" ("chauffeurId", "commande_DateId", "contactId", "id", "name", "vehiculeId") SELECT "chauffeurId", "commande_DateId", "contactId", "id", "name", "vehiculeId" FROM "Commande";
DROP TABLE "Commande";
ALTER TABLE "new_Commande" RENAME TO "Commande";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
