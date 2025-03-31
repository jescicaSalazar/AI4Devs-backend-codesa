import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear una compañía
  const company = await prisma.company.create({
    data: {
      name: 'Tech Solutions Inc.',
    },
  });

  // Crear un empleado
  const employee = await prisma.employee.create({
    data: {
      companyId: company.id,
      name: 'Ana Martínez',
      email: 'ana.martinez@techsolutions.com',
      role: 'Entrevistador Senior',
      isActive: true,
    },
  });

  // Crear un flujo de entrevista
  const interviewFlow = await prisma.interviewFlow.create({
    data: {
      description: 'Proceso de selección estándar',
    },
  });

  // Crear tipos de entrevista
  const technicalInterview = await prisma.interviewType.create({
    data: {
      name: 'Entrevista Técnica',
      description: 'Evaluación de habilidades técnicas',
    },
  });

  const hrInterview = await prisma.interviewType.create({
    data: {
      name: 'Entrevista RRHH',
      description: 'Evaluación de habilidades blandas',
    },
  });

  // Crear pasos de entrevista
  const technicalStep = await prisma.interviewStep.create({
    data: {
      interviewFlowId: interviewFlow.id,
      interviewTypeId: technicalInterview.id,
      name: 'Entrevista Técnica',
      orderIndex: 1,
    },
  });

  const hrStep = await prisma.interviewStep.create({
    data: {
      interviewFlowId: interviewFlow.id,
      interviewTypeId: hrInterview.id,
      name: 'Entrevista RRHH',
      orderIndex: 2,
    },
  });

  // Crear una posición
  const position = await prisma.position.create({
    data: {
      companyId: company.id,
      interviewFlowId: interviewFlow.id,
      title: 'Desarrollador Full Stack Senior',
      description: 'Buscamos un desarrollador full stack con experiencia en Node.js y React',
      status: 'Active',
      isVisible: true,
      location: 'Remoto',
      jobDescription: 'Descripción detallada del puesto',
      requirements: 'Requisitos del puesto',
      responsibilities: 'Responsabilidades del puesto',
      salaryMin: 50000,
      salaryMax: 80000,
      employmentType: 'Full-time',
    },
  });

  // Crear candidatos
  const candidate1 = await prisma.candidate.create({
    data: {
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez@email.com',
      phone: '1234567890',
      address: 'Calle Principal 123',
    },
  });

  const candidate2 = await prisma.candidate.create({
    data: {
      firstName: 'María',
      lastName: 'García',
      email: 'maria.garcia@email.com',
      phone: '0987654321',
      address: 'Avenida Central 456',
    },
  });

  // Crear aplicaciones
  const application1 = await prisma.application.create({
    data: {
      positionId: position.id,
      candidateId: candidate1.id,
      applicationDate: new Date(),
      currentInterviewStep: technicalStep.id,
      notes: 'Candidato prometedor',
    },
  });

  const application2 = await prisma.application.create({
    data: {
      positionId: position.id,
      candidateId: candidate2.id,
      applicationDate: new Date(),
      currentInterviewStep: hrStep.id,
      notes: 'Buen perfil',
    },
  });

  // Crear entrevistas
  await prisma.interview.create({
    data: {
      applicationId: application1.id,
      interviewStepId: technicalStep.id,
      employeeId: employee.id,
      interviewDate: new Date(),
      result: 'Aprobado',
      score: 85,
      notes: 'Buen desempeño técnico',
    },
  });

  await prisma.interview.create({
    data: {
      applicationId: application2.id,
      interviewStepId: technicalStep.id,
      employeeId: employee.id,
      interviewDate: new Date(),
      result: 'Aprobado',
      score: 90,
      notes: 'Excelente desempeño técnico',
    },
  });

  console.log('Datos de prueba creados exitosamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
