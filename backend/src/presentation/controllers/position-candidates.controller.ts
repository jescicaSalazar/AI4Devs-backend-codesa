import { Controller, Get, Put, Param, Body, ParseIntPipe, Logger } from '@nestjs/common';
import { PositionCandidatesService } from '../../application/services/position-candidates.service';
import { PositionCandidatesResponseDto } from '../../domain/dtos/position-candidates.dto';
import { UpdateCandidateStageDto } from '../../domain/dtos/update-candidate-stage.dto';

/**
 * Controlador que maneja las operaciones relacionadas con los candidatos de una posición
 */
@Controller('positions')
export class PositionCandidatesController {
  private readonly logger = new Logger(PositionCandidatesController.name);

  constructor(private readonly positionCandidatesService: PositionCandidatesService) {}

  /**
   * Obtiene todos los candidatos asociados a una posición específica
   * @param positionId - ID de la posición
   * @returns Lista de candidatos con sus detalles y puntuaciones
   */
  @Get(':id/candidates')
  async getPositionCandidates(
    @Param('id', ParseIntPipe) positionId: number,
  ): Promise<PositionCandidatesResponseDto> {
    this.logger.log(`Obteniendo candidatos para la posición ${positionId}`);
    try {
      const result = await this.positionCandidatesService.getPositionCandidates(positionId);
      this.logger.log(`Candidatos encontrados para la posición ${positionId}`);
      return result;
    } catch (error) {
      this.logger.error(`Error al obtener candidatos de la posición ${positionId}:`, error);
      throw error;
    }
  }

  /**
   * Actualiza la fase actual del proceso de entrevista de un candidato
   * @param candidateId - ID del candidato
   * @param updateStageDto - DTO con el ID de la nueva fase
   * @returns Información actualizada del candidato
   */
  @Put(':positionId/candidates/:candidateId/stage')
  async updateCandidateStage(
    @Param('candidateId', ParseIntPipe) candidateId: number,
    @Body() updateStageDto: UpdateCandidateStageDto
  ): Promise<PositionCandidatesResponseDto> {
    this.logger.log(`Actualizando fase del candidato ${candidateId}`);
    this.logger.log('Body recibido:', updateStageDto);

    if (!updateStageDto || typeof updateStageDto.stageId !== 'number') {
      this.logger.error('Body inválido:', updateStageDto);
      throw new Error('El body debe contener un stageId válido');
    }

    try {
      const result = await this.positionCandidatesService.updateCandidateStage(
        candidateId,
        updateStageDto.stageId
      );
      this.logger.log(`Fase actualizada exitosamente para el candidato ${candidateId}`);
      return {
        positionId: candidateId,
        candidates: [result]
      };
    } catch (error) {
      this.logger.error(`Error al actualizar fase del candidato ${candidateId}:`, error);
      throw error;
    }
  }
} 