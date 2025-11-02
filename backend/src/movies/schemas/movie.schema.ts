import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Movie extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  fileName: string;

  @Prop()
  poster: string;

  @Prop()
  rating: number;

  @Prop()
  year: number;

  @Prop()
  genre: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
