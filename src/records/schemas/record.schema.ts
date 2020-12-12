import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type RecordDocument = Record & Document;

@Schema()
export class Record {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  key: string;

  @Prop([Number])
  counts: number[];

  @Prop()
  value: string;

  @Prop()
  createdAt: Date;

}

export const RecordSchema = SchemaFactory.createForClass(Record);