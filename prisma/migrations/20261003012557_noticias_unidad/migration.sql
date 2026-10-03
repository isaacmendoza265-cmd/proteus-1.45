-- CreateTable
CREATE TABLE "NoticiasUnidad" (
    "id" TEXT NOT NULL,
    "unidadId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "datos" JSONB NOT NULL,
    "buscadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "buscadoPor" TEXT,

    CONSTRAINT "NoticiasUnidad_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "NoticiasUnidad_unidadId_buscadoEn_idx" ON "NoticiasUnidad"("unidadId", "buscadoEn");
