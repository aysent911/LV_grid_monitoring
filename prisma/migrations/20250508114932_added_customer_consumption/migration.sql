-- CreateTable
CREATE TABLE "CustomerConsumption" (
    "timestamp" TIMESTAMPTZ(3) NOT NULL,
    "sensorId" VARCHAR(10) NOT NULL,
    "P" REAL NOT NULL,
    "Q" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerConsumption_timestamp_sensorId_key" ON "CustomerConsumption"("timestamp", "sensorId");

-- AddForeignKey
ALTER TABLE "CustomerConsumption" ADD CONSTRAINT "CustomerConsumption_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
