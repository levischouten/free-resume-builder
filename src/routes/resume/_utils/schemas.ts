import z from "zod";

const lenientDate = z
  .union([z.date(), z.string()])
  .refine(
    (value) => {
      if (typeof value === "string") {
        const date = new Date(value);
        return !isNaN(date.getTime());
      }
      return true;
    },
    {
      message: "Invalid date",
    }
  )
  .transform((value) => {
    if (typeof value === "string") {
      return new Date(value);
    }
    return value;
  });

export const personalDetailsSchema = z.object({
  type: z.literal("personalDetails"),
  title: z.string().default("Personal Details"),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  country: z.string(),
  city: z.string(),
  address: z.string(),
  postalCode: z.string(),
  drivingLicense: z.string(),
  nationality: z.string(),
  placeOfBirth: z.string(),
  dateOfBirth: lenientDate.nullable(),
  summary: z.string(),
  wantedJobTitle: z.string(),
});

export const skillsSchema = z.object({
  type: z.literal("skills"),
  title: z.string().default("Skills"),
  skills: z.array(
    z.object({
      name: z.string(),
      level: z.enum([
        "novice",
        "beginner",
        "intermediate",
        "advanced",
        "expert",
      ]),
    })
  ),
});

export const educationsSchema = z.object({
  type: z.literal("educations"),
  title: z.string().default("Education"),
  educations: z.array(
    z
      .object({
        school: z.string(),
        degree: z.string(),
        startDate: lenientDate.nullable(),
        endDate: lenientDate.nullable(),
        description: z.string(),
      })
      .refine(
        (data) =>
          data.startDate && data.endDate && data.endDate > data.startDate,
        {
          message: "End date cannot be earlier than start date.",
          path: ["endDate"],
        }
      )
  ),
});

export const employmentHistorySchema = z.object({
  type: z.literal("employmentHistory"),
  title: z.string().default("Employment History"),
  employments: z.array(
    z
      .object({
        jobTitle: z.string(),
        company: z.string(),
        startDate: lenientDate.nullable(),
        endDate: lenientDate.nullable(),
        description: z.string(),
      })
      .refine(
        (data) =>
          data.startDate && data.endDate && data.endDate > data.startDate,
        {
          message: "End date cannot be earlier than start date.",
          path: ["endDate"],
        }
      )
  ),
});

export const languagesSchema = z.object({
  type: z.literal("languages"),
  title: z.string().default("Languages"),
  languages: z.array(
    z.object({
      name: z.string(),
      level: z.enum(["native", "fluent", "intermediate", "basic"]),
    })
  ),
});

export const schema = z.object({
  sections: z.array(
    z.discriminatedUnion("type", [
      personalDetailsSchema,
      skillsSchema,
      educationsSchema,
      employmentHistorySchema,
      languagesSchema,
    ])
  ),
  settings: z.object({
    font: z.enum(["courier", "helvetica", "times-roman"]),
  }),
});

export type Schema = z.infer<typeof schema>;
