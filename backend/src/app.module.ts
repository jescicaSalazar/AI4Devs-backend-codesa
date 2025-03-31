import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PositionCandidatesModule } from './presentation/modules/position-candidates.module';
import { PrismaModule } from './infrastructure/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    PositionCandidatesModule,
  ],
})
export class AppModule {} 