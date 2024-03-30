import { IDumpingEntry, ILandfill } from "@/models/Landfill";
import { IDepartureEntry, ISTS } from "@/models/STS";
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
    role: "Landfill Manager",
    userId: "4",
    createdAt: new Date("2022-03-25"),
  },
  {
    name: "Emily Davis",
    userName: "emily_davis",
    email: "emily.davis@example.com",
    phone: "+1987234567",
    role: "Landfill Manager",
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
    vehicle_number: "ABC123",
    type: "Open Truck",
    capacity: "3 Ton",
    createdAt: new Date("2022-01-01"),
  },
  {
    vid: "2",
    vehicle_number: "XYZ456",
    type: "Dump Truck",
    capacity: "5 Ton",
    createdAt: new Date("2022-02-15"),
  },
  {
    vid: "3",
    vehicle_number: "DEF789",
    type: "Compactor",
    capacity: "7 Ton",
    createdAt: new Date("2022-03-20"),
  },
  {
    vid: "4",
    vehicle_number: "GHI012",
    type: "Container Carrier",
    capacity: "3 Ton",
    createdAt: new Date("2022-04-10"),
  },
  {
    vid: "5",
    vehicle_number: "JKL345",
    type: "Open Truck",
    capacity: "7 Ton",
    createdAt: new Date("2022-05-25"),
  },
];

export const dummySTS: ISTS[] = [
  {
    STSName: "STS 1",
    wardNumber: 101,
    capacity: 50,
    latitude: "40.7128° N",
    longitude: "74.0060° W",
  },
  {
    STSName: "STS 2",
    wardNumber: 102,
    capacity: 60,
    latitude: "34.0522° N",
    longitude: "118.2437° W",
  },
  {
    STSName: "STS 3",
    wardNumber: 103,
    capacity: 45,
    latitude: "41.8781° N",
    longitude: "87.6298° W",
  },
  {
    STSName: "STS 4",
    wardNumber: 104,
    capacity: 55,
    latitude: "51.5074° N",
    longitude: "0.1278° W",
  },
  {
    STSName: "STS 5",
    wardNumber: 105,
    capacity: 70,
    latitude: "35.6895° N",
    longitude: "139.6917° E",
  },
  {
    STSName: "STS 6",
    wardNumber: 106,
    capacity: 40,
    latitude: "52.5200° N",
    longitude: "13.4050° E",
  },
  {
    STSName: "STS 7",
    wardNumber: 107,
    capacity: 65,
    latitude: "48.8566° N",
    longitude: "2.3522° E",
  },
  {
    STSName: "STS 8",
    wardNumber: 108,
    capacity: 50,
    latitude: "22.3964° N",
    longitude: "114.1095° E",
  },
  {
    STSName: "STS 9",
    wardNumber: 109,
    capacity: 55,
    latitude: "19.0760° N",
    longitude: "72.8777° E",
  },
  {
    STSName: "STS 10",
    wardNumber: 110,
    capacity: 75,
    latitude: "40.7128° N",
    longitude: "74.0060° W",
  },
  {
    STSName: "STS 11",
    wardNumber: 111,
    capacity: 60,
    latitude: "34.0522° N",
    longitude: "118.2437° W",
  },
  {
    STSName: "STS 12",
    wardNumber: 112,
    capacity: 70,
    latitude: "41.8781° N",
    longitude: "87.6298° W",
  },
];

export const dummyLandfill: ILandfill[] = [
  {
    landfillName: "Smith, Johnson and Davis",
    openingTime: "11:36:00",
    endingTime: "08:54:00",
    capacity: "657",
    latitude: "47.5093",
    longitude: "-123.0667",
  },
  {
    landfillName: "Miller, Johnson and Davis",
    openingTime: "07:21:00",
    endingTime: "12:13:00",
    capacity: "933",
    latitude: "48.8682",
    longitude: "-121.527",
  },
  {
    landfillName: "Garcia Inc",
    openingTime: "17:20:00",
    endingTime: "01:06:00",
    capacity: "244",
    latitude: "43.0024",
    longitude: "-121.0059",
  },
  {
    landfillName: "Martinez, Johnson and Brown",
    openingTime: "06:09:00",
    endingTime: "23:17:00",
    capacity: "881",
    latitude: "43.5774",
    longitude: "-120.9776",
  },
  {
    landfillName: "Taylor, Garcia and Jackson",
    openingTime: "13:55:00",
    endingTime: "14:40:00",
    capacity: "943",
    latitude: "47.9169",
    longitude: "-121.4241",
  },
  {
    landfillName: "Jackson, Smith and Rodriguez",
    openingTime: "03:26:00",
    endingTime: "06:23:00",
    capacity: "318",
    latitude: "47.3689",
    longitude: "-123.1216",
  },
  {
    landfillName: "Johnson, Brown and Davis",
    openingTime: "04:14:00",
    endingTime: "14:44:00",
    capacity: "239",
    latitude: "47.3959",
    longitude: "-121.5708",
  },
  {
    landfillName: "Garcia, Taylor and Martinez",
    openingTime: "22:07:00",
    endingTime: "11:20:00",
    capacity: "389",
    latitude: "47.7511",
    longitude: "-120.7401",
  },
  {
    landfillName: "Smith, Martinez and Rodriguez",
    openingTime: "18:50:00",
    endingTime: "06:13:00",
    capacity: "845",
    latitude: "47.1736",
    longitude: "-120.8694",
  },
  {
    landfillName: "Martinez, Jackson and Brown",
    openingTime: "12:02:00",
    endingTime: "03:57:00",
    capacity: "701",
    latitude: "48.7792",
    longitude: "-121.8711",
  },
  {
    landfillName: "Martinez, Taylor and Jackson",
    openingTime: "14:51:00",
    endingTime: "06:11:00",
    capacity: "320",
    latitude: "47.4245",
    longitude: "-120.3629",
  },
  {
    landfillName: "Taylor, Davis and Rodriguez",
    openingTime: "05:43:00",
    endingTime: "01:42:00",
    capacity: "544",
    latitude: "46.9655",
    longitude: "-120.5208",
  },
  {
    landfillName: "Martinez, Johnson and Brown",
    openingTime: "16:12:00",
    endingTime: "04:20:00",
    capacity: "824",
    latitude: "46.6061",
    longitude: "-121.8563",
  },
  {
    landfillName: "Taylor, Jackson and Brown",
    openingTime: "17:53:00",
    endingTime: "14:35:00",
    capacity: "906",
    latitude: "48.5132",
    longitude: "-121.7842",
  },
  {
    landfillName: "Martinez, Johnson and Brown",
    openingTime: "17:30:00",
    endingTime: "00:45:00",
    capacity: "357",
    latitude: "46.7423",
    longitude: "-121.658",
  },
];

export const dummyDepartureData: IDepartureEntry[] = [
  {
    vehicle_number: "ABC123",
    landfillName: "Landfill A",
    trip: 1,
    wasteVolume: 100,
    arrivalTime: "08:00:00",
    departureTime: "10:00:00",
  },
  {
    vehicle_number: "DEF456",
    landfillName: "Landfill B",
    trip: 1,
    wasteVolume: 120,
    arrivalTime: "08:30:00",
    departureTime: "10:30:00",
  },
  {
    vehicle_number: "GHI789",
    landfillName: "Landfill A",
    trip: 2,
    wasteVolume: 90,
    arrivalTime: "09:00:00",
    departureTime: "11:00:00",
  },
  {
    vehicle_number: "JKL012",
    landfillName: "Landfill B",
    trip: 2,
    wasteVolume: 110,
    arrivalTime: "09:30:00",
    departureTime: "11:30:00",
  },
  {
    vehicle_number: "MNO345",
    landfillName: "Landfill A",
    trip: 3,
    wasteVolume: 80,
    arrivalTime: "10:00:00",
    departureTime: "12:00:00",
  },
  {
    vehicle_number: "PQR678",
    landfillName: "Landfill B",
    trip: 3,
    wasteVolume: 130,
    arrivalTime: "10:30:00",
    departureTime: "12:30:00",
  },
  {
    vehicle_number: "STU901",
    landfillName: "Landfill A",
    trip: 4,
    wasteVolume: 70,
    arrivalTime: "11:00:00",
    departureTime: "13:00:00",
  },
];

export const dummyDumpingData: IDumpingEntry[] = [
  {
    STSName: "Dumping Station A",
    vehicle_number: "ABC123",
    wasteVolume: "5 tons",
    arrivalTime: "2024-03-29 08:00",
    departureTime: "2024-03-29 09:00",
  },
  {
    STSName: "Dumping Station B",
    vehicle_number: "XYZ456",
    wasteVolume: "3.5 tons",
    arrivalTime: "2024-03-29 08:30",
    departureTime: "2024-03-29 09:45",
  },
  {
    STSName: "Dumping Station C",
    vehicle_number: "DEF789",
    wasteVolume: "7.2 tons",
    arrivalTime: "2024-03-29 09:15",
    departureTime: "2024-03-29 10:30",
  },
  {
    STSName: "Dumping Station A",
    vehicle_number: "GHI123",
    wasteVolume: "4.8 tons",
    arrivalTime: "2024-03-29 10:00",
    departureTime: "2024-03-29 11:15",
  },
  {
    STSName: "Dumping Station B",
    vehicle_number: "JKL456",
    wasteVolume: "6.1 tons",
    arrivalTime: "2024-03-29 10:30",
    departureTime: "2024-03-29 11:45",
  },
  {
    STSName: "Dumping Station C",
    vehicle_number: "MNO789",
    wasteVolume: "5.3 tons",
    arrivalTime: "2024-03-29 11:15",
    departureTime: "2024-03-29 12:30",
  },
  {
    STSName: "Dumping Station A",
    vehicle_number: "PQR123",
    wasteVolume: "3.9 tons",
    arrivalTime: "2024-03-29 12:00",
    departureTime: "2024-03-29 13:15",
  },
  {
    STSName: "Dumping Station B",
    vehicle_number: "STU456",
    wasteVolume: "4.5 tons",
    arrivalTime: "2024-03-29 12:30",
    departureTime: "2024-03-29 13:45",
  },
  {
    STSName: "Dumping Station C",
    vehicle_number: "VWX789",
    wasteVolume: "8.7 tons",
    arrivalTime: "2024-03-29 13:15",
    departureTime: "2024-03-29 14:30",
  },
  {
    STSName: "Dumping Station A",
    vehicle_number: "YZA123",
    wasteVolume: "6.4 tons",
    arrivalTime: "2024-03-29 14:00",
    departureTime: "2024-03-29 15:15",
  },
];
