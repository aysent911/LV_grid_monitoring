-- CreateTable
CREATE TABLE "Sensor" (
    "id" VARCHAR(10) NOT NULL,
    "type" VARCHAR(10) NOT NULL,
    "feeder" VARCHAR(10) NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION
);

-- CreateTable
CREATE TABLE "VoltageCurrent" (
    "timestamp" TIMESTAMPTZ(3) NOT NULL,
    "sensorId" VARCHAR(10) NOT NULL,
    "Va" REAL NOT NULL,
    "Vb" REAL NOT NULL,
    "Vc" REAL NOT NULL,
    "Ia" REAL NOT NULL,
    "Ib" REAL NOT NULL,
    "Ic" REAL NOT NULL,
    "faultType" SMALLINT
);

-- CreateTable
CREATE TABLE "Power" (
    "timestamp" TIMESTAMPTZ(3) NOT NULL,
    "sensorId" VARCHAR(10) NOT NULL,
    "Pfeed" REAL NOT NULL,
    "Qfeed" REAL NOT NULL,
    "Pagg" REAL NOT NULL,
    "Qagg" REAL NOT NULL,
    "faultType" SMALLINT
);

-- CreateIndex
CREATE UNIQUE INDEX "Sensor_id_key" ON "Sensor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "VoltageCurrent_timestamp_sensorId_key" ON "VoltageCurrent"("timestamp", "sensorId");

-- CreateIndex
CREATE UNIQUE INDEX "Power_timestamp_sensorId_key" ON "Power"("timestamp", "sensorId");

-- AddForeignKey
ALTER TABLE "VoltageCurrent" ADD CONSTRAINT "VoltageCurrent_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Power" ADD CONSTRAINT "Power_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
