import { Schema, model, models } from 'mongoose';

const teacherSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true

    },
    displayName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Student'
        }
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Messages'
        }
    ],
});

const Teacher = models.Teacher || model('Teacher', teacherSchema);

export default Teacher;
