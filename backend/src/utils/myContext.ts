import { Request, Response } from "express";
import Redis from "ioredis";

export type myContext = {
  req: Request;
  res: Response;
  redis: Redis;
};
