-- CreateEnum
CREATE TYPE "VehicleTypeEnums" AS ENUM ('CART', 'TRUCK', 'TOCO');

-- CreateEnum
CREATE TYPE "VehicleStatusEnums" AS ENUM ('ACTIVE', 'INACTIVE', 'MAINTENANCE');

-- CreateTable
CREATE TABLE "tbl_vehicle" (
    "id_Vehicle" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "mark" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "type" "VehicleTypeEnums" NOT NULL,
    "chassis" TEXT NOT NULL,
    "status" "VehicleStatusEnums" NOT NULL,
    "dateAcquisition" TIMESTAMP(3) NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_vehicle_pkey" PRIMARY KEY ("id_Vehicle")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_vehicle_plate_key" ON "tbl_vehicle"("plate");
