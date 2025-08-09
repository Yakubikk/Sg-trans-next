import { NextRequest, NextResponse } from "next/server";
import { railwayCisterns } from "@/lib/directories";

export async function GET() {
  try {
    const data = await railwayCisterns.getAll();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching railway cisterns:", error);
    return NextResponse.json(
      { error: "Ошибка загрузки цистерн" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Валидация обязательных полей
    const requiredFields = [
      'number', 'manufacturerId', 'buildDate', 'tareWeight', 
      'loadCapacity', 'length', 'axleCount', 'volume', 'typeId',
      'serialNumber', 'registrationNumber', 'registrationDate', 
      'creatorId', 'affiliationId', 'pressure'
    ];
    
    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Обязательные поля отсутствуют: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

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

    const cistern = await railwayCisterns.create(data);
    return NextResponse.json(cistern, { status: 201 });
  } catch (error) {
    console.error("Error creating railway cistern:", error);
    return NextResponse.json(
      { error: "Ошибка создания цистерны" },
      { status: 500 }
    );
  }
}
