import { prisma } from "@/server/db";

export interface DirectoryItem {
  id: string;
  name?: string;
  value?: string;
  code?: string | number | null;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DirectoryStats {
  title: string;
  count: number;
  lastUpdate?: Date;
}

// Получить статистику по всем справочникам
export async function getDirectoriesStats(): Promise<DirectoryStats[]> {
  try {
    const [
      affiliationsCount,
      depotsCount,
      locationsCount,
      manufacturersCount,
      ownersCount,
      registrarsCount,
      repairTypesCount,
      stampNumbersCount,
      wagonModelsCount,
      wagonTypesCount,
      railwayCisternsCount,
    ] = await Promise.all([
      prisma.affiliation.count(),
      prisma.depot.count(),
      prisma.location.count(),
      prisma.manufacturer.count(),
      prisma.owner.count(),
      prisma.registrar.count(),
      prisma.repairType.count(),
      prisma.stampNumber.count(),
      prisma.wagonModel.count(),
      prisma.wagonType.count(),
      prisma.railwayCistern.count(),
    ]);

    return [
      { title: "Принадлежности", count: affiliationsCount },
      { title: "Депо", count: depotsCount },
      { title: "Местоположения", count: locationsCount },
      { title: "Производители", count: manufacturersCount },
      { title: "Владельцы", count: ownersCount },
      { title: "Регистраторы", count: registrarsCount },
      { title: "Типы ремонтов", count: repairTypesCount },
      { title: "Номера клейм", count: stampNumbersCount },
      { title: "Модели вагонов", count: wagonModelsCount },
      { title: "Типы вагонов", count: wagonTypesCount },
      { title: "Цистерны", count: railwayCisternsCount },
    ];
  } catch (error) {
    console.error("Error fetching directories stats:", error);
    return [];
  }
}

// Получить последние изменения во всех справочниках
export async function getRecentDirectoryChanges() {
  try {
    const recentChanges = await Promise.all([
      prisma.affiliation.findMany({
        orderBy: { id: "desc" },
        take: 3,
        select: { id: true, value: true },
      }),
      prisma.manufacturer.findMany({
        orderBy: { updatedAt: "desc" },
        take: 3,
        select: { id: true, name: true, updatedAt: true },
      }),
      prisma.repairType.findMany({
        orderBy: { createdAt: "desc" },
        take: 3,
        select: { id: true, name: true, createdAt: true },
      }),
    ]);

    // Объединяем все изменения
    const allChanges = [
      ...recentChanges[0].map((item) => ({ 
        id: item.id, 
        name: item.value, 
        updatedAt: new Date(), // У affiliations нет updatedAt
        type: "Принадлежность" 
      })),
      ...recentChanges[1].map((item) => ({ 
        id: item.id, 
        name: item.name, 
        updatedAt: item.updatedAt,
        type: "Производитель" 
      })),
      ...recentChanges[2].map((item) => ({ 
        id: item.id, 
        name: item.name, 
        updatedAt: item.createdAt, // У RepairType используем createdAt
        type: "Тип ремонта" 
      })),
    ]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5);

    return allChanges;
  } catch (error) {
    console.error("Error fetching recent changes:", error);
    return [];
  }
}

// Специфичные функции для каждого справочника
export const affiliationsService = {
  async getAll() {
    return await prisma.affiliation.findMany({
      orderBy: { value: "asc" }
    });
  },
  
  async getById(id: string) {
    return await prisma.affiliation.findUnique({
      where: { id }
    });
  },
  
  async create(data: { value: string }) {
    return await prisma.affiliation.create({
      data
    });
  },
  
  async update(id: string, data: { value?: string }) {
    return await prisma.affiliation.update({
      where: { id },
      data
    });
  },
  
  async delete(id: string) {
    return await prisma.affiliation.delete({
      where: { id }
    });
  }
};

export const depotsService = {
  async getAll() {
    return await prisma.depot.findMany({
      orderBy: { name: "asc" }
    });
  },
  
  async getById(id: string) {
    return await prisma.depot.findUnique({
      where: { id }
    });
  },
  
  async create(data: { name: string; code: string; location?: string; creatorId: string }) {
    return await prisma.depot.create({
      data: {
        ...data,
        createdAt: new Date()
      }
    });
  },
  
  async update(id: string, data: { name?: string; code?: string; location?: string }) {
    return await prisma.depot.update({
      where: { id },
      data
    });
  },
  
  async delete(id: string) {
    return await prisma.depot.delete({
      where: { id }
    });
  }
};

export const locationsService = {
  async getAll() {
    return await prisma.location.findMany({
      orderBy: { name: "asc" }
    });
  },
  
  async getById(id: string) {
    return await prisma.location.findUnique({
      where: { id }
    });
  },
  
  async create(data: { name: string; type: number; description?: string; creatorId: string }) {
    return await prisma.location.create({
      data: {
        ...data,
        createdAt: new Date()
      }
    });
  },
  
  async update(id: string, data: { name?: string; type?: number; description?: string }) {
    return await prisma.location.update({
      where: { id },
      data
    });
  },
  
  async delete(id: string) {
    return await prisma.location.delete({
      where: { id }
    });
  }
};

export const manufacturersService = {
  async getAll() {
    return await prisma.manufacturer.findMany({
      orderBy: { name: "asc" }
    });
  },
  
  async getById(id: string) {
    return await prisma.manufacturer.findUnique({
      where: { id },
      include: { railwayCisterns: true }
    });
  },
  
  async create(data: { name: string; country: string; creatorId: string; shortName?: string; code?: number }) {
    return await prisma.manufacturer.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
  },
  
  async update(id: string, data: { name?: string; country?: string; shortName?: string; code?: number }) {
    return await prisma.manufacturer.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      }
    });
  },
  
  async delete(id: string) {
    return await prisma.manufacturer.delete({
      where: { id }
    });
  }
};

export const ownersService = {
  async getAll() {
    return await prisma.owner.findMany({
      orderBy: { name: "asc" }
    });
  },
  
  async getById(id: string) {
    return await prisma.owner.findUnique({
      where: { id }
    });
  },
  
  async create(data: { 
    name: string; 
    shortName: string;
    treatRepairs: boolean;
    unp?: string; 
    address?: string; 
    code?: number; 
    creatorId?: string;
  }) {
    return await prisma.owner.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
  },
  
  async update(id: string, data: { 
    name?: string; 
    shortName?: string;
    treatRepairs?: boolean;
    unp?: string; 
    address?: string; 
    code?: number;
  }) {
    return await prisma.owner.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      }
    });
  },
  
  async delete(id: string) {
    return await prisma.owner.delete({
      where: { id }
    });
  }
};

// Цистерны
export const railwayCisterns = {
  async getAll() {
    return await prisma.railwayCistern.findMany({
      include: {
        manufacturer: true,
        wagonType: true,
        wagonModel: true,
        registrar: true,
        affiliation: true,
      },
      orderBy: { createdAt: "desc" }
    });
  },
  
  async getById(id: string) {
    return await prisma.railwayCistern.findUnique({
      where: { id },
      include: {
        manufacturer: true,
        wagonType: true,
        wagonModel: true,
        registrar: true,
        affiliation: true,
      }
    });
  },
  
  async create(data: {
    number: string;
    manufacturerId: string;
    buildDate: Date;
    tareWeight: number;
    loadCapacity: number;
    length: number;
    axleCount: number;
    volume: number;
    typeId: string;
    serialNumber: string;
    registrationNumber: string;
    registrationDate: Date;
    creatorId: string;
    affiliationId: string;
    pressure: number;
    modelId?: string;
    registrarId?: string;
    ownerId?: string;
    fillingVolume?: number;
    initialTareWeight?: number;
    commissioningDate?: Date;
    notes?: string;
    techConditions?: string;
    pripiska?: string;
    reRegistrationDate?: Date;
    testPressure?: number;
    rent?: string;
    serviceLifeYears?: number;
    periodMajorRepair?: Date;
    periodPeriodicTest?: Date;
    periodIntermediateTest?: Date;
    periodDepotRepair?: Date;
    dangerClass?: number;
    substance?: string;
    tareWeight2?: number;
    tareWeight3?: number;
  }) {
    return await prisma.railwayCistern.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      include: {
        manufacturer: true,
        wagonType: true,
        wagonModel: true,
        registrar: true,
        affiliation: true,
      }
    });
  },
  
  async update(id: string, data: {
    number?: string;
    manufacturerId?: string;
    buildDate?: Date;
    tareWeight?: number;
    loadCapacity?: number;
    length?: number;
    axleCount?: number;
    volume?: number;
    typeId?: string;
    serialNumber?: string;
    registrationNumber?: string;
    registrationDate?: Date;
    modelId?: string;
    registrarId?: string;
    ownerId?: string;
    fillingVolume?: number;
    initialTareWeight?: number;
    commissioningDate?: Date;
    notes?: string;
    techConditions?: string;
    pripiska?: string;
    reRegistrationDate?: Date;
    testPressure?: number;
    rent?: string;
    affiliationId?: string;
    pressure?: number;
    serviceLifeYears?: number;
    periodMajorRepair?: Date;
    periodPeriodicTest?: Date;
    periodIntermediateTest?: Date;
    periodDepotRepair?: Date;
    dangerClass?: number;
    substance?: string;
    tareWeight2?: number;
    tareWeight3?: number;
  }) {
    return await prisma.railwayCistern.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      },
      include: {
        manufacturer: true,
        wagonType: true,
        wagonModel: true,
        registrar: true,
        affiliation: true,
      }
    });
  },
  
  async delete(id: string) {
    return await prisma.railwayCistern.delete({
      where: { id }
    });
  }
};
