import { NextFunction, Request, Response } from "express";

export type AthletsProps = {
  message: string;
  success: boolean;
  data: any;
};

export default class AthletsService {
  public fetchAthlets(id: string): AthletsProps {
    if (!(id.length > 1)) {
      return {
        message: "id is required",
        success: false,
        data: null,
      };
    }
    return {
      message: "success",
      success: true,
      data: { id },
    };
  }
}
