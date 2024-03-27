import { IUsers } from "@/models/Users";

export const dummyUsers: IUsers[] = [
  {
    name: "John Doe",
    userName: "john_doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    role: "Admin",
    userId: "1",
    createdAt: new Date(),
  },
  {
    name: "Jane Smith",
    userName: "jane_smith",
    email: "jane.smith@example.com",
    phone: "+1987654321",
    role: "STS Manager",
    userId: "2",
    createdAt: new Date(),
  },
  {
    name: "Alice Johnson",
    userName: "alice_johnson",
    email: "alice.johnson@example.com",
    phone: "+1122334455",
    role: "Unassigned",
    userId: "3",
    createdAt: new Date(),
  },
  {
    name: "Bob Brown",
    userName: "bob_brown",
    email: "bob.brown@example.com",
    phone: "+1765432987",
    role: "Landfil Manager",
    userId: "4",
    createdAt: new Date(),
  },
  {
    name: "Emily Davis",
    userName: "emily_davis",
    email: "emily.davis@example.com",
    phone: "+1987234567",
    role: "Unassigned",
    userId: "5",
    createdAt: new Date(),
  },
];
