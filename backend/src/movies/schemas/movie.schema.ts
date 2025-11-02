import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Movie extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  poster: string;

  @Prop()
  backdrop: string;

  @Prop()
  rating: number;

  @Prop()
  duration: number;

  @Prop({ type: [String], default: [] })
  stars: string[];

  @Prop()
  year: number;

  @Prop()
  views: number;

  @Prop({ type: [String], default: [] })
  genre: string[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);

MovieSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});
