# Migration `20200828115413-add-url-to-company`

This migration has been generated by Gabriel Chertok at 8/28/2020, 8:54:13 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "url" TEXT NOT NULL DEFAULT '',
    "hasOffices" BOOLEAN NOT NULL,
    "allowsFullRemote" BOOLEAN NOT NULL
);
INSERT INTO "new_Company" ("id", "createdAt", "updatedAt", "name", "description", "logo", "hasOffices", "allowsFullRemote") SELECT "id", "createdAt", "updatedAt", "name", "description", "logo", "hasOffices", "allowsFullRemote" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200827175642-remove-auth..20200828115413-add-url-to-company
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = ["sqlite", "postgres"]
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -18,7 +18,8 @@
   updatedAt        DateTime @updatedAt
   name             String
   description      String
   logo             String
+  url              String   @default("")
   hasOffices       Boolean
   allowsFullRemote Boolean
 }
```

