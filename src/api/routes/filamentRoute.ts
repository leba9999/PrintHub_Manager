import { Request, Response, NextFunction } from "express";
import CustomError from "../../classes/CustomError";
import { makeKeysCaseInsensitive } from "../../utils/helpers";
import { MongoDataSource } from "../../utils/Datasources";
import { Filament } from "../../entities/filament.entity";
import { Color } from "../../entities/color.entity";

const getFilament = async (
  req: Request,
  res: Response<{}, {}>,
  next: NextFunction
) => {
  try {
    const query = makeKeysCaseInsensitive(req.query);
    const filamentRepository = MongoDataSource.getRepository(Filament);
    const filaments = await filamentRepository.find({});
    res.status(200).json(filaments);
  } catch (error) {
    next(new CustomError((error as Error).message, 400));
  }
};

const postFilament = async (
  req: Request,
  res: Response<{}, {}>,
  next: NextFunction
) => {
  try {
    const body = req.body as Filament;
    const filamentRepository = MongoDataSource.getRepository(Filament);
    const filament = new Filament();
    filament.name = body.name;
    filament.color = body.color as Color;
    filament.material = body.material;
    filament.diameter = body.diameter;
    filament.brand = body.brand;
    filament.url = body.url;
    filament.amount = body.amount;
    filament.totalAmount = body.totalAmount;

    await filamentRepository.save(filament);
    res.status(201).json(filament);
  } catch (error) {
    next(new CustomError((error as Error).message, 400));
  }
};

export { getFilament };
