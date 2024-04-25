import type { CollectionConfig } from "payload/types";
import { PRODUCT_CATEGORIES } from "../../config";

const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  access: {},
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: { condition: () => false },
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Product details",
      type: "textarea",
      required: true,
    },
    {
      name: "price",
      label: "Price in IRR",
      type: "number",
      min: 0,
      max: 50_000_000,
      required: true,
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
      required: true,
    },
    {
      name: "productFiles",
      label: "Product file(s)",
      type: "relationship",
      relationTo: "productFiles",
      hasMany: false,
      required: true,
    },
    {
      name: "approvedForSale",
      label: "Product status",
      access: {
        create: ({ req }) => req.user.role === "admin",
        update: ({ req }) => req.user.role === "admin",
        read: ({ req }) => req.user.role === "admin",
      },
      type: "select",
      defaultValue: "pending",
      options: [
        {
          label: "Pending verification",
          value: "pending",
        },
        {
          label: "Approved",
          value: "approved",
        },
        {
          label: "Denied",
          value: "denied",
        },
      ],
    },
    {
      name: "images",
      label: "Product images",
      type: "array",
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: "Image",
        plural: "Images",
      },
      fields: [{ name: "image", type: "upload", relationTo: "media", required: true }],
    },
  ],
};

export default Products;
