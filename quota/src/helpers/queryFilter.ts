import { Document, Model, Query } from "mongoose";

interface QueryOptions {
  start_date?: Date;
  end_date?: Date;
  feature_id?: string;
  nik?: string;
  request_number?: string;
}

export function applyQueryFilters<T extends Document>(
  model: Model<T>,
  options: QueryOptions
) {
  let query = model.find();

  if (options.start_date && options.end_date) {
    query = query
      .where("createdAt")
      .gte(options.start_date.getTime())
      .lte(options.end_date.getTime());
  } else if (options.start_date) {
    query = query.where("date").gte(options.start_date.getTime());
  } else if (options.end_date) {
    query = query.where("date").lte(options.end_date.getTime());
  }

  if (options.feature_id) {
    query = query.where("feature_id").equals(options.feature_id);
  }

  if (options.request_number) {
    query = query.where("request_number").equals(options.request_number);
  }

  console.log(query);
  return query;
}
