/*
  Warnings:

  - You are about to drop the `SubStation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubStation" DROP CONSTRAINT "SubStation_sensorId_fkey";

-- DropTable
DROP TABLE "SubStation";

-- CreateTable
CREATE TABLE "SubStationPower" (
    "timestamp" TIMESTAMPTZ(3) NOT NULL,
    "sensorId" VARCHAR(10) NOT NULL,
    "Psub" REAL NOT NULL,
    "Qsub" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SubStationPower_timestamp_sensorId_key" ON "SubStationPower"("timestamp", "sensorId");

-- AddForeignKey
ALTER TABLE "SubStationPower" ADD CONSTRAINT "SubStationPower_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
