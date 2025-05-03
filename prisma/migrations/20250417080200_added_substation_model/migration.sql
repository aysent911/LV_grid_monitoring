-- CreateTable
CREATE TABLE "SubStation" (
    "timestamp" TIMESTAMPTZ(3) NOT NULL,
    "sensorId" VARCHAR(10) NOT NULL,
    "Psub" REAL NOT NULL,
    "Qsub" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SubStation_timestamp_sensorId_key" ON "SubStation"("timestamp", "sensorId");

-- AddForeignKey
ALTER TABLE "SubStation" ADD CONSTRAINT "SubStation_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
