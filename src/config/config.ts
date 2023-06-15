import dotenv, { DotenvConfigOutput } from 'dotenv';

const result: DotenvConfigOutput = dotenv.config();

if (result.error) {
  throw result.error;
}