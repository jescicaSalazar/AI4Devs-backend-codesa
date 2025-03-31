import { Module } from '@nestjs/common';
import { PositionCandidatesController } from '../controllers/position-candidates.controller';
import { PositionCandidatesService } from '../../application/services/position-candidates.service';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PositionCandidatesController],
  providers: [PositionCandidatesService],
  exports: [PositionCandidatesService],
})
export class PositionCandidatesModule {} 