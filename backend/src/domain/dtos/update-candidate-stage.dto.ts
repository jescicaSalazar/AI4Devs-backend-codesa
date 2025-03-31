import { IsNumber, IsNotEmpty, Min } from 'class-validator';

/**
 * DTO para actualizar la fase de un candidato en el proceso de entrevista
 */
export class UpdateCandidateStageDto {
  /**
   * ID de la nueva fase del proceso de entrevista
   * @example 2
   */
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  stageId: number;
} 