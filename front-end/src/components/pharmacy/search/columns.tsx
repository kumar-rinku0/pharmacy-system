"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

type MedicationProp = {
  _id: string;
  medication: {
    name: string;
  };
  quantity: string;
};

export type ContentProp = {
  createdAt: string;
  pharmacyId: {
    name: string;
    address: string;
  };
  medicationInfo: Array<MedicationProp>;
};

// export type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
// };

export const columns: ColumnDef<ContentProp>[] = [
  {
    accessorKey: "customerId.fullName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "customerId.postalCode",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Postal Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => info.getValue(),
  },
  {
    id: "email",
    accessorKey: "customerId.email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Perchage Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => {
      const value = info.getValue() as Date;
      return (
        <span>
          {new Date(value).toLocaleString("en-IN", {
            day: "2-digit",
            year: "numeric",
            month: "short",
          })}
          <br />
          {new Date(value).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "pharmacyId.name",
    header: "Pharmacy",
    cell: (info) => info.getValue(),
  },
  {
    id: "medication",
    accessorKey: "medicationInfo",
    header: "Medication",
    cell: ({ getValue }) => {
      const tags =
        getValue<{ medication: { name: string }; quantity: string }[]>();

      return (
        <>
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className={`text-xs font-medium px-2.5 py-0.5 rounded`}
            >
              {tag.medication.name}
              <br />
            </span>
          ))}
        </>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const medications = row.getValue(columnId) as {
        medication: { name: string };
        quantity: string;
      }[];

      return medications.some((item) =>
        item.medication.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    },
  },
];
