import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { PositionCandidatesResponseDto, PositionCandidateDto } from '../../domain/dtos/position-candidates.dto';
import { UpdateCandidateStageDto } from '../../domain/dtos/update-candidate-stage.dto';

@Injectable()
export class PositionCandidatesService {
  constructor(private readonly prisma: PrismaService) {}

  async getPositionCandidates(positionId: number): Promise<PositionCandidatesResponseDto> {
    console.log(`Buscando candidatos para la posición ${positionId}`);
    
    // Verificar si la posición existe
    const position = await this.prisma.position.findUnique({
      where: { id: positionId },
    });

    console.log('Posición encontrada:', position);

    if (!position) {
      console.log(`No se encontró la posición con ID ${positionId}`);
      throw new NotFoundException(`Position with ID ${positionId} not found`);
    }

    // Obtener las aplicaciones con sus candidatos y entrevistas
    const applications = await this.prisma.application.findMany({
      where: { positionId },
      include: {
        candidate: true,
        interviewStep: true,
        interviews: true,
      },
    });

    console.log('Aplicaciones encontradas:', applications);

    const candidates: PositionCandidateDto[] = applications.map(application => {
      const averageScore = application.interviews.length > 0
        ? application.interviews.reduce((acc, interview) => acc + (interview.score || 0), 0) / application.interviews.length
        : 0;

      return {
        candidateId: application.candidate.id,
        fullName: `${application.candidate.firstName} ${application.candidate.lastName}`,
        currentInterviewStep: application.interviewStep.name,
        averageScore,
      };
    });

    console.log('Candidatos procesados:', candidates);

    return {
      positionId,
      candidates,
    };
  }

  async updateCandidateStage(candidateId: number, stageId: number): Promise<PositionCandidateDto> {
    console.log(`Actualizando fase del candidato ${candidateId} a la fase ${stageId}`);
    
    // Verificar que el candidato existe
    const candidate = await this.prisma.candidate.findUnique({
      where: { id: candidateId },
      include: {
        applications: {
          include: {
            interviewStep: true
          }
        }
      }
    });

    if (!candidate) {
      console.log(`Candidato ${candidateId} no encontrado`);
      throw new NotFoundException(`Candidato con ID ${candidateId} no encontrado`);
    }

    // Verificar que la fase existe
    const stage = await this.prisma.interviewStep.findUnique({
      where: { id: stageId }
    });

    if (!stage) {
      console.log(`Fase ${stageId} no encontrada`);
      throw new NotFoundException(`Fase con ID ${stageId} no encontrada`);
    }

    // Actualizar la fase en la aplicación más reciente del candidato
    const latestApplication = candidate.applications[0];
    if (!latestApplication) {
      console.log(`No se encontró aplicación para el candidato ${candidateId}`);
      throw new NotFoundException(`No se encontró aplicación para el candidato ${candidateId}`);
    }

    const updatedApplication = await this.prisma.application.update({
      where: { id: latestApplication.id },
      data: {
        currentInterviewStep: stageId
      },
      include: {
        interviewStep: true
      }
    });

    console.log(`Fase actualizada para el candidato ${candidateId}`);
    
    // Obtener la información actualizada del candidato
    const updatedCandidate = await this.prisma.candidate.findUnique({
      where: { id: candidateId },
      include: {
        applications: {
          include: {
            interviewStep: true
          }
        }
      }
    });

    if (!updatedCandidate || !updatedCandidate.applications[0]) {
      throw new NotFoundException(`Error al obtener información actualizada del candidato ${candidateId}`);
    }

    return {
      candidateId: updatedCandidate.id,
      fullName: `${updatedCandidate.firstName} ${updatedCandidate.lastName}`,
      currentInterviewStep: updatedCandidate.applications[0].interviewStep.name,
      averageScore: 0 // Se mantiene en 0 ya que no es relevante para esta operación
    };
  }
} 