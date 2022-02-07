import { ModelDataType } from "./model-data.type";
import { ColorString } from "highcharts";

export interface ModelSeriesType {
  color: ColorString;
  data: ModelDataType[];
  name: string;
  type: string;
}
