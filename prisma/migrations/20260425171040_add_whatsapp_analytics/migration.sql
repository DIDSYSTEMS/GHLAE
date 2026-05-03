-- CreateTable
CREATE TABLE "WhatsAppClick" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT,
    "itemName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "pageUrl" TEXT,
    "userAgent" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
