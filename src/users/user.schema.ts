import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';
import { plainToClass } from 'class-transformer';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  @Exclude()
  @Transform((value) => undefined) // Exclude the password property from serialization
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
// Add a method to transform the user document before returning it
UserSchema.methods.toJSON = function () {
  return plainToClass(User, this.toObject());
};
