-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "customerEmail" TEXT,
ADD COLUMN     "customerName" TEXT,
ADD COLUMN     "customerPhone" TEXT,
ADD COLUMN     "shippingAddress" TEXT,
ADD COLUMN     "shippingCity" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "benefits" TEXT,
ADD COLUMN     "highlights" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "sourcing" TEXT,
ADD COLUMN     "usage" TEXT;
