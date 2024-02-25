import { Injectable } from '@nestjs/common';
import { ExternalApi } from '@utils/external-api/external-api.service';
import { ConfigService } from '@nestjs/config';
import { JenosizeException } from '@exceptions/app/jenosize.exception';

@Injectable()
export class JenosizeService {
  constructor(
    private readonly externalApi: ExternalApi,
    private readonly configService: ConfigService,
  ) {}

  async placeSearch(query: { pagetoken: string }) {
    try {
      const reponses = await this.externalApi.getPlaceSearch(
        this.configService.get<string>('ENDPOINT_API'),
        {
          params: {
            type: this.configService.get<string>('TYPE_PLACE_SEARCH'),
            key: this.configService.get<string>('GOOGLE_API_KEY'),
            ...query,
          },
        },
      );

      return reponses;
    } catch (error) {
      return error;
    }
  }

  async solve24Game(nums: number[]) {
    for (const num of nums) {
      if (num <= 0 || num > 9) {
        throw JenosizeException.WorngNumber();
      }
    }

    const possibilities = await this.genCombos(nums);
    for (const poss of possibilities) {
      if (eval(poss) === 24) {
        return true;
      }
    }

    return false;
  }

  async genCombos(numbers: number[]) {
    const result: string[] = [];

    if (numbers.length === 1) {
      return [numbers[0].toString()];
    }

    for (let index = 0; index < numbers.length; index++) {
      const currentValue = numbers[index];
      const remainingNumbers = numbers
        .slice(0, index)
        .concat(numbers.slice(index + 1));
      const recursiveResult = await this.genCombos(remainingNumbers);
      for (const combo of recursiveResult) {
        result.push(currentValue + '+' + combo);
        result.push(currentValue + '-' + combo);
        result.push(currentValue + '*' + combo);
        result.push(currentValue + '/' + combo);
      }
    }

    return result;
  }

  async game24(query: { nums: number[] }) {
    try {
      const { nums } = query;
      const response = (await this.solve24Game(nums)) ? 'YES' : 'NO';
      return response;
    } catch (error) {
      return JenosizeException.WorngNumber();
    }
  }

  async gamexo(query: { nums: number }) {
    try {
      const { nums } = query;

      return nums;
    } catch (error) {
      return JenosizeException.WorngNumber();
    }
  }
}
