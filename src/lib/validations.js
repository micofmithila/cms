import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email().optional(),
  phone: z.string().min(10).optional(),
  password: z.string().min(6, "Password must be at least 6 characters")
}).refine(data => data.email || data.phone, {
  message: "Either email or phone must be provided",
  path: ["email"]
});

export const gallerySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  tags: z.array(z.string()).nonempty("At least one tag is required"),
  relatedEvent: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  featured: z.boolean().optional(),
  imageUrls: z.array(z.string()).nonempty("At least one image URL is required")
}).refine(data => data.imageUrls.length > 0, {
  message: "At least one image URL is required",
});

export const loginSchema = z.object({
  identifier: z.string().min(3, "Invalid email/phone"),
  password: z.string().min(6, "Invalid password")
});

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  desc: z.string().min(1, "Description is required"),
  theme: z.string().optional(),
  posterUrl: z.string().url("Valid URL is required"),
  imagesArray: z.array(z.string().url("Valid URL is required").or(z.string().length(0))).optional(),
  chiefGuests: z.array(z.string()).optional(),
  performerCategories: z.array(z.string()).min(1, "At least one performer category is required"),
  registrationLimit: z.coerce.number().positive("Must be a positive number"),
  registrationFee: z.coerce.number().min(0, "Cannot be negative"),
  isRegistrationOpen: z.object({                       // 👈 added
    performer: z.boolean().default(false),
    audience: z.boolean().default(false),
  }).optional(),
  eventDate: z.string().refine(val => !val || !isNaN(Date.parse(val)), "Valid date is required").optional(),
  eventTime: z.string().optional(),
  eventVenueAddress: z.string().min(1, "Venue address is required"),
  status: z.enum(["draft", "upcoming", "completed", "cancelled"]),
});