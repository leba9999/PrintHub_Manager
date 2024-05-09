import { Request, Response, NextFunction } from "express";
import CustomError from "../../classes/CustomError";
import { makeKeysCaseInsensitive } from "../../utils/helpers";
import { MongoDataSource } from "../../utils/Datasources";
import { Filament } from "../../entities/filament.entity";
import { Color } from "../../entities/color.entity";
import { iFilament, iFilamentWithColor } from "../../interfaces/filament";
import logger from "../../utils/loggers";

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
  const filamentRepository = MongoDataSource.getRepository(Filament);
  const colorRepository = MongoDataSource.getRepository(Color);
  const body = req.body as iFilamentWithColor;
  try {
    let color = new Color();
    if (!body.color_id && !body.color) {
      throw new Error(
        "Color ID or object not provided in the request body! Attempting to create a filament without a color is not allowed!"
      );
    }
    if (body.color_id && body.color) {
      throw new Error(
        "Both color ID and object provided in the request body! Please provide only one!"
      );
    }
    if (body.color_id) {
      const colorFromdatabase = await colorRepository.findOne({
        where: { id: body.color_id },
      });
      if (!colorFromdatabase) {
        throw new Error("Color not found in the database");
      }
      color = colorFromdatabase;
    }
    if (body.color) {
      const newColor = new Color();
      newColor.name = body.color.name;
      newColor.hex = body.color.hex;
      const savedColor = await colorRepository.save(newColor);
      if (!savedColor) {
        logger.error("Color not saved to the database");
        throw new Error("Color not saved to the database");
      }
      color = savedColor;
    }
    const filament = new Filament();
    filament.name = body.name;
    filament.color_id = color.id;
    filament.material = body.material;
    filament.diameter = body.diameter;
    filament.brand = body.brand;
    filament.url = body.url;
    filament.amount = body.amount;
    filament.totalAmount = body.totalAmount;

    const savedFilament = await filamentRepository.save(filament);
    res.status(201).json(savedFilament);
  } catch (error) {
    next(new CustomError((error as Error).message, 400));
  }
};

export { getFilament, postFilament };
