export interface PositionCandidateDto {
  candidateId: number;
  fullName: string;
  currentInterviewStep: string;
  averageScore: number;
}

export interface PositionCandidatesResponseDto {
  positionId: number;
  candidates: PositionCandidateDto[];
} 