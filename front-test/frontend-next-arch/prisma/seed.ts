import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Создаем разрешения
  const perms = [
    "manage.users", 
    "view.reports", 
    "manage.directories", 
    "view.wagons", 
    "edit.wagons",
    "manage.personnel"
  ];
  
  for (const p of perms) {
    await prisma.permissionEntity.upsert({ 
      where: { name: p }, 
      update: {}, 
      create: { name: p } 
    });
  }

  // Создаем роли
  const adminRole = await prisma.role.upsert({ 
    where: { name: "Admin" }, 
    update: {}, 
    create: { name: "Admin" } 
  });
  
  const userRole = await prisma.role.upsert({ 
    where: { name: "User" }, 
    update: {}, 
    create: { name: "User" } 
  });
  
  const operatorRole = await prisma.role.upsert({ 
    where: { name: "Operator" }, 
    update: {}, 
    create: { name: "Operator" } 
  });
  
  const viewerRole = await prisma.role.upsert({ 
    where: { name: "Viewer" }, 
    update: {}, 
    create: { name: "Viewer" } 
  });

  // Назначаем все разрешения администратору
  const permEntities = await prisma.permissionEntity.findMany();
  for (const pe of permEntities) {
    await prisma.rolePermissions.upsert({
      where: { roleId_permissionId: { roleId: adminRole.id, permissionId: pe.id } },
      update: {},
      create: { roleId: adminRole.id, permissionId: pe.id },
    });
  }

  // Создаем пользователя-администратора
  const email = "admin@sg-trans.by";
  const passwordHash = await bcrypt.hash("admin123", 10);
  const user = await prisma.users.upsert({
    where: { email },
    update: { passwordHash },
    create: { 
      email, 
      passwordHash, 
      firstName: "Администратор", 
      lastName: "Системы",
      patronymic: "Главный" 
    },
  });
  
  // Назначаем роль администратора
  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: user.id, roleId: adminRole.id } },
    update: {},
    create: { userId: user.id, roleId: adminRole.id },
  });

  console.log("Seed completed successfully!");
  console.log(`Admin user created: ${email} / admin123`);
  console.log(`Roles created: Admin, User, Operator, Viewer`);
  console.log(`Admin role ID: ${adminRole.id}, User role ID: ${userRole.id}`);
  console.log(`Operator role ID: ${operatorRole.id}, Viewer role ID: ${viewerRole.id}`);
}

main().finally(async () => {
  await prisma.$disconnect();
});
