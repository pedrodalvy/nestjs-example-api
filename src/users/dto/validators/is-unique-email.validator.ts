import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';

interface IRequest {
  id?: number;
}

@ValidatorConstraint({ name: 'uniqueEmail', async: false })
@Injectable()
export class IsUniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private readonly repository: UserRepository) {}

  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    const inputData = { ...args.object } as IRequest;
    const emailExists = await this.repository.findByEmail(value);

    return emailExists === undefined || emailExists.id === inputData.id;
  }

  defaultMessage(args?: ValidationArguments): string {
    return 'O email ja esta sendo utilizado.';
  }
}
