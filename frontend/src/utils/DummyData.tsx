import { ISTS } from "@/models/STS";
import { IUsers } from "@/models/Users";
import { IVehicle } from "@/models/Vehicles";

export const dummyUsers: IUsers[] = [
  {
    name: "John Doe",
    userName: "john_doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    role: "Admin",
    userId: "1",
    createdAt: new Date("2022-03-25"),
  },
  {
    name: "Jane Smith",
    userName: "jane_smith",
    email: "jane.smith@example.com",
    phone: "+1987654321",
    role: "STS Manager",
    userId: "2",
    createdAt: new Date("2022-03-25"),
  },
  {
    name: "Alice Johnson",
    userName: "alice_johnson",
    email: "alice.johnson@example.com",
    phone: "+1122334455",
    role: "Unassigned",
    userId: "3",
    createdAt: new Date("2022-03-26"),
  },
  {
    name: "Bob Brown",
    userName: "bob_brown",
    email: "bob.brown@example.com",
    phone: "+1765432987",
    role: "Landfil Manager",
    userId: "4",
    createdAt: new Date("2022-03-25"),
  },
  {
    name: "Emily Davis",
    userName: "emily_davis",
    email: "emily.davis@example.com",
    phone: "+1987234567",
    role: "Unassigned",
    userId: "5",
    createdAt: new Date("2022-03-25"),
  },
  // Add 5 more entries
  {
    name: "Michael Johnson",
    userName: "michael_johnson",
    email: "michael.johnson@example.com",
    phone: "+1122334455",
    role: "STS Manager",
    userId: "6",
    createdAt: new Date("2022-03-26"),
  },
  {
    name: "Jessica Brown",
    userName: "jessica_brown",
    email: "jessica.brown@example.com",
    phone: "+1765432987",
    role: "STS Manager",
    userId: "7",
    createdAt: new Date("2022-03-25"),
  },
  {
    name: "David Smith",
    userName: "david_smith",
    email: "david.smith@example.com",
    phone: "+1987234567",
    role: "Developer",
    userId: "8",
    createdAt: new Date("2022-03-25"),
  },
  {
    name: "Sarah Davis",
    userName: "sarah_davis",
    email: "sarah.davis@example.com",
    phone: "+1987654321",
    role: "Designer",
    userId: "9",
    createdAt: new Date("2022-03-25"),
  },
  {
    name: "Daniel Wilson",
    userName: "daniel_wilson",
    email: "daniel.wilson@example.com",
    phone: "+1234567890",
    role: "Tester",
    userId: "10",
    createdAt: new Date("2022-03-25"),
  },
  {
    name: "David Smith",
    userName: "david_smith",
    email: "david.smith@example.com",
    phone: "+1987234567",
    role: "Developer",
    userId: "8",
    createdAt: new Date("2022-03-25"),
  },
  {
    name: "Sarah Davis",
    userName: "sarah_davis",
    email: "sarah.davis@example.com",
    phone: "+1987654321",
    role: "Designer",
    userId: "9",
    createdAt: new Date("2022-03-25"),
  },
  {
    name: "Daniel Wilson",
    userName: "daniel_wilson",
    email: "daniel.wilson@example.com",
    phone: "+1234567890",
    role: "Tester",
    userId: "10",
    createdAt: new Date("2022-03-25"),
  },
];

export const dummyVehicles: IVehicle[] = [
  {
    vid: "1",
    vehicleNumber: "ABC123",
    vehicleType: "Open Truck",
    vehicleCapacity: "3 Ton",
    createdAt: new Date("2022-01-01"),
  },
  {
    vid: "2",
    vehicleNumber: "XYZ456",
    vehicleType: "Dump Truck",
    vehicleCapacity: "5 Ton",
    createdAt: new Date("2022-02-15"),
  },
  {
    vid: "3",
    vehicleNumber: "DEF789",
    vehicleType: "Compactor",
    vehicleCapacity: "7 Ton",
    createdAt: new Date("2022-03-20"),
  },
  {
    vid: "4",
    vehicleNumber: "GHI012",
    vehicleType: "Container Carrier",
    vehicleCapacity: "3 Ton",
    createdAt: new Date("2022-04-10"),
  },
  {
    vid: "5",
    vehicleNumber: "JKL345",
    vehicleType: "Open Truck",
    vehicleCapacity: "7 Ton",
    createdAt: new Date("2022-05-25"),
  },
];

export const dummySTS: ISTS[] = [
  {
      STSName: "STS 1",
      wardNumber: 101,
      capacity: 50,
      latitude: "40.7128° N",
      longitude: "74.0060° W"
  },
  {
      STSName: "STS 2",
      wardNumber: 102,
      capacity: 60,
      latitude: "34.0522° N",
      longitude: "118.2437° W"
  },
  {
      STSName: "STS 3",
      wardNumber: 103,
      capacity: 45,
      latitude: "41.8781° N",
      longitude: "87.6298° W"
  },
  {
      STSName: "STS 4",
      wardNumber: 104,
      capacity: 55,
      latitude: "51.5074° N",
      longitude: "0.1278° W"
  },
  {
      STSName: "STS 5",
      wardNumber: 105,
      capacity: 70,
      latitude: "35.6895° N",
      longitude: "139.6917° E"
  },
  {
      STSName: "STS 6",
      wardNumber: 106,
      capacity: 40,
      latitude: "52.5200° N",
      longitude: "13.4050° E"
  },
  {
      STSName: "STS 7",
      wardNumber: 107,
      capacity: 65,
      latitude: "48.8566° N",
      longitude: "2.3522° E"
  },
  {
      STSName: "STS 8",
      wardNumber: 108,
      capacity: 50,
      latitude: "22.3964° N",
      longitude: "114.1095° E"
  },
  {
      STSName: "STS 9",
      wardNumber: 109,
      capacity: 55,
      latitude: "19.0760° N",
      longitude: "72.8777° E"
  },
  {
      STSName: "STS 10",
      wardNumber: 110,
      capacity: 75,
      latitude: "40.7128° N",
      longitude: "74.0060° W"
  },
  {
      STSName: "STS 11",
      wardNumber: 111,
      capacity: 60,
      latitude: "34.0522° N",
      longitude: "118.2437° W"
  },
  {
      STSName: "STS 12",
      wardNumber: 112,
      capacity: 70,
      latitude: "41.8781° N",
      longitude: "87.6298° W"
  }
];

