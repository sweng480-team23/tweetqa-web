import {PointOptionsObject} from "highcharts";

export interface ModelDataType extends PointOptionsObject {
  modelId: number; // Id of the model this point represents
  x: number; // Unix timestamp in ms when the model was created
  y: number; // Value of the score for a specific series
  name: string; // Score name: Bleu, Meteor or Rouge
}
