import { NextRequest, NextResponse } from "next/server";
import { railwayCisterns } from "@/lib/directories";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const cistern = await railwayCisterns.getById(id);
    
    if (!cistern) {
      return NextResponse.json(
        { error: "Цистерна не найдена" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(cistern);
  } catch (error) {
    console.error("Error fetching railway cistern:", error);
    return NextResponse.json(
      { error: "Ошибка загрузки цистерны" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const data = await request.json();

    // Преобразование дат из строк
    if (data.buildDate) data.buildDate = new Date(data.buildDate);
    if (data.registrationDate) data.registrationDate = new Date(data.registrationDate);
    if (data.commissioningDate) data.commissioningDate = new Date(data.commissioningDate);
    if (data.reRegistrationDate) data.reRegistrationDate = new Date(data.reRegistrationDate);
    if (data.periodMajorRepair) data.periodMajorRepair = new Date(data.periodMajorRepair);
    if (data.periodPeriodicTest) data.periodPeriodicTest = new Date(data.periodPeriodicTest);
    if (data.periodIntermediateTest) data.periodIntermediateTest = new Date(data.periodIntermediateTest);
    if (data.periodDepotRepair) data.periodDepotRepair = new Date(data.periodDepotRepair);

    // Преобразование чисел
    if (data.tareWeight) data.tareWeight = parseFloat(data.tareWeight);
    if (data.loadCapacity) data.loadCapacity = parseFloat(data.loadCapacity);
    if (data.volume) data.volume = parseFloat(data.volume);
    if (data.pressure) data.pressure = parseFloat(data.pressure);
    if (data.fillingVolume) data.fillingVolume = parseFloat(data.fillingVolume);
    if (data.initialTareWeight) data.initialTareWeight = parseFloat(data.initialTareWeight);
    if (data.testPressure) data.testPressure = parseFloat(data.testPressure);
    if (data.tareWeight2) data.tareWeight2 = parseFloat(data.tareWeight2);
    if (data.tareWeight3) data.tareWeight3 = parseFloat(data.tareWeight3);
    if (data.length) data.length = parseInt(data.length);
    if (data.axleCount) data.axleCount = parseInt(data.axleCount);
    if (data.serviceLifeYears) data.serviceLifeYears = parseInt(data.serviceLifeYears);
    if (data.dangerClass) data.dangerClass = parseInt(data.dangerClass);

    const cistern = await railwayCisterns.update(id, data);
    return NextResponse.json(cistern);
  } catch (error) {
    console.error("Error updating railway cistern:", error);
    return NextResponse.json(
      { error: "Ошибка обновления цистерны" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await railwayCisterns.delete(id);
    return NextResponse.json({ message: "Цистерна удалена" });
  } catch (error) {
    console.error("Error deleting railway cistern:", error);
    return NextResponse.json(
      { error: "Ошибка удаления цистерны" },
      { status: 500 }
    );
  }
}
