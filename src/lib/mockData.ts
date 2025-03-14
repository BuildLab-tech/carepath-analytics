export type JourneyType = 'prepay' | 'results' | 'guestpay' | 'appointment' | 'awo';

export type JourneyStep = {
  id: string;
  name: string;
  timestamp: string;
  status: 'completed' | 'active' | 'upcoming' | 'skipped';
  details?: string;
};

export type Journey = {
  id: string;
  type: JourneyType;
  name: string;
  startDate: string;
  endDate?: string;
  steps: JourneyStep[];
  status: 'active' | 'completed' | 'pending';
};

export type Patient = {
  id: string;
  name: string;
  avatar?: string;
  age: number;
  gender: string;
  contactInfo: {
    email: string;
    phone: string;
  };
  journeys: Journey[];
};

// Generate mock data for patients
export const patients: Patient[] = [
  {
    id: "p1",
    name: "Emma Thompson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    age: 32,
    gender: "Female",
    contactInfo: {
      email: "emma.thompson@example.com",
      phone: "(555) 123-4567"
    },
    journeys: [
      {
        id: "j1",
        type: "prepay",
        name: "Pre-Payment Campaign",
        startDate: "2023-12-01T09:00:00",
        status: "active",
        steps: [
          {
            id: "s1",
            name: "Prepay Created",
            timestamp: "2023-12-01T09:00:00",
            status: "completed",
            details: "Initial prepay creation for patient visit"
          },
          {
            id: "s2",
            name: "Campaign Trigger",
            timestamp: "2023-12-01T09:05:00",
            status: "completed",
            details: "Automated campaign initiated"
          },
          {
            id: "s3",
            name: "MEP Campaign Initialization",
            timestamp: "2023-12-01T09:10:00",
            status: "completed",
            details: "Campaign initialized in MEP system"
          },
          {
            id: "s4",
            name: "Campaign Execution",
            timestamp: "2023-12-01T09:15:00",
            status: "completed",
            details: "First message sent to patient"
          },
          {
            id: "s5",
            name: "Message Sent",
            timestamp: "2023-12-01T09:20:00",
            status: "completed",
            details: "Payment reminder message delivered"
          },
          {
            id: "s6",
            name: "Message Received",
            timestamp: "2023-12-01T10:30:00",
            status: "completed",
            details: "Patient viewed the message"
          },
          {
            id: "s7",
            name: "Payment Initiated",
            timestamp: "2023-12-01T11:45:00",
            status: "active",
            details: "Patient began payment process"
          },
          {
            id: "s8",
            name: "Payment Completed",
            timestamp: "",
            status: "upcoming",
            details: "Awaiting payment completion"
          },
          {
            id: "s9",
            name: "Campaign Finish",
            timestamp: "",
            status: "upcoming",
            details: "Campaign to be concluded"
          }
        ]
      },
      {
        id: "j2",
        type: "results",
        name: "Test Results Call",
        startDate: "2023-11-15T14:00:00",
        endDate: "2023-11-15T14:30:00",
        status: "completed",
        steps: [
          {
            id: "s10",
            name: "Campaign Trigger",
            timestamp: "2023-11-15T14:00:00",
            status: "completed",
            details: "Results available notification"
          },
          {
            id: "s11",
            name: "Message Sent",
            timestamp: "2023-11-15T14:05:00",
            status: "completed",
            details: "Test results are ready for review"
          },
          {
            id: "s12",
            name: "Message Received",
            timestamp: "2023-11-15T14:10:00",
            status: "completed",
            details: "Patient viewed the notification"
          },
          {
            id: "s13",
            name: "Call Scheduled",
            timestamp: "2023-11-15T14:15:00",
            status: "completed",
            details: "Patient scheduled a call to discuss results"
          },
          {
            id: "s14",
            name: "Call Completed",
            timestamp: "2023-11-15T14:30:00",
            status: "completed",
            details: "Results discussed with patient"
          },
          {
            id: "s15",
            name: "Campaign Finish",
            timestamp: "2023-11-15T14:35:00",
            status: "completed",
            details: "Results campaign completed"
          }
        ]
      },
      {
        id: "j7",
        type: "appointment",
        name: "Telehealth Appointment",
        startDate: "2023-12-10T08:00:00",
        status: "active",
        steps: [
          {
            id: "s40",
            name: "Appointment Create",
            timestamp: "2023-12-10T08:00:00",
            status: "completed",
            details: "Initial appointment creation"
          },
          {
            id: "s41",
            name: "Telehealth",
            timestamp: "2023-12-10T08:05:00",
            status: "completed",
            details: "Telehealth session scheduled"
          },
          {
            id: "s42",
            name: "Campaign Trigger",
            timestamp: "2023-12-10T08:10:00",
            status: "completed",
            details: "Automated campaign initiated"
          },
          {
            id: "s43",
            name: "Campaign Init",
            timestamp: "2023-12-10T08:15:00",
            status: "completed",
            details: "Campaign initialization"
          },
          {
            id: "s44",
            name: "Campaign Executing",
            timestamp: "2023-12-10T08:20:00",
            status: "completed",
            details: "Campaign in execution phase"
          },
          {
            id: "s45",
            name: "Campaign in Transaction",
            timestamp: "2023-12-10T08:25:00",
            status: "completed",
            details: "Processing campaign transaction"
          },
          {
            id: "s46",
            name: "Campaign Finish",
            timestamp: "2023-12-10T08:30:00",
            status: "completed",
            details: "Campaign finished execution"
          },
          {
            id: "s47",
            name: "Message Composed",
            timestamp: "2023-12-10T08:35:00",
            status: "completed",
            details: "Appointment message created"
          },
          {
            id: "s48",
            name: "Message Sent",
            timestamp: "2023-12-10T08:40:00",
            status: "completed",
            details: "Appointment message sent"
          },
          {
            id: "s49",
            name: "Message Delivered",
            timestamp: "2023-12-10T08:45:00",
            status: "completed",
            details: "Message delivered to patient"
          },
          {
            id: "s50",
            name: "Email Opened",
            timestamp: "2023-12-10T09:30:00",
            status: "completed",
            details: "Patient opened the email"
          },
          {
            id: "s51",
            name: "Button Clicked",
            timestamp: "2023-12-10T09:35:00",
            status: "active",
            details: "Patient clicked on appointment link"
          },
          {
            id: "s52",
            name: "Payment Init",
            timestamp: "2023-12-10T09:40:00",
            status: "active",
            details: "Payment process initiated"
          },
          {
            id: "s53",
            name: "Payment Done",
            timestamp: "",
            status: "upcoming",
            details: "Awaiting payment completion"
          }
        ]
      }
    ]
  },
  {
    id: "p2",
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    age: 45,
    gender: "Male",
    contactInfo: {
      email: "michael.chen@example.com",
      phone: "(555) 987-6543"
    },
    journeys: [
      {
        id: "j3",
        type: "guestpay",
        name: "Guest Payment",
        startDate: "2023-12-05T10:15:00",
        status: "active",
        steps: [
          {
            id: "s16",
            name: "Campaign Trigger",
            timestamp: "2023-12-05T10:15:00",
            status: "completed",
            details: "Guest payment reminder initiated"
          },
          {
            id: "s17",
            name: "Message Sent",
            timestamp: "2023-12-05T10:20:00",
            status: "completed",
            details: "Payment link sent to patient"
          },
          {
            id: "s18",
            name: "Message Received",
            timestamp: "2023-12-05T11:30:00",
            status: "completed",
            details: "Patient viewed payment message"
          },
          {
            id: "s19",
            name: "Guest Portal Access",
            timestamp: "2023-12-05T11:35:00",
            status: "completed",
            details: "Patient accessed guest payment portal"
          },
          {
            id: "s20",
            name: "Payment Initiated",
            timestamp: "2023-12-05T11:40:00",
            status: "active",
            details: "Patient began payment process"
          },
          {
            id: "s21",
            name: "Payment Completed",
            timestamp: "",
            status: "upcoming",
            details: "Awaiting payment completion"
          }
        ]
      },
      {
        id: "j4",
        type: "prepay",
        name: "Previous Visit Payment",
        startDate: "2023-11-10T09:30:00",
        endDate: "2023-11-10T15:45:00",
        status: "completed",
        steps: [
          {
            id: "s22",
            name: "Prepay Created",
            timestamp: "2023-11-10T09:30:00",
            status: "completed",
            details: "Initial prepay creation"
          },
          {
            id: "s23",
            name: "Campaign Trigger",
            timestamp: "2023-11-10T09:35:00",
            status: "completed",
            details: "Automated campaign initiated"
          },
          {
            id: "s24",
            name: "Message Sent",
            timestamp: "2023-11-10T09:40:00",
            status: "completed",
            details: "Payment request sent"
          },
          {
            id: "s25",
            name: "Message Received",
            timestamp: "2023-11-10T10:15:00",
            status: "completed",
            details: "Patient viewed the message"
          },
          {
            id: "s26",
            name: "Payment Completed",
            timestamp: "2023-11-10T15:45:00",
            status: "completed",
            details: "Payment successfully processed"
          },
          {
            id: "s27",
            name: "Campaign Finish",
            timestamp: "2023-11-10T15:50:00",
            status: "completed",
            details: "Prepay campaign concluded"
          }
        ]
      },
      {
        id: "j8",
        type: "appointment",
        name: "Follow-up Appointment",
        startDate: "2023-12-08T13:00:00",
        status: "completed",
        steps: [
          {
            id: "s54",
            name: "Appointment Create",
            timestamp: "2023-12-08T13:00:00",
            status: "completed",
            details: "Initial appointment creation"
          },
          {
            id: "s55",
            name: "Telehealth",
            timestamp: "2023-12-08T13:05:00",
            status: "completed",
            details: "Telehealth session scheduled"
          },
          {
            id: "s56",
            name: "Campaign Trigger",
            timestamp: "2023-12-08T13:10:00",
            status: "completed",
            details: "Automated campaign initiated"
          },
          {
            id: "s57",
            name: "Campaign Init",
            timestamp: "2023-12-08T13:15:00",
            status: "completed",
            details: "Campaign initialization"
          },
          {
            id: "s58",
            name: "Campaign Executing",
            timestamp: "2023-12-08T13:20:00",
            status: "completed",
            details: "Campaign in execution phase"
          },
          {
            id: "s59",
            name: "Campaign in Transaction",
            timestamp: "2023-12-08T13:25:00",
            status: "completed",
            details: "Processing campaign transaction"
          },
          {
            id: "s60",
            name: "Campaign Finish",
            timestamp: "2023-12-08T13:30:00",
            status: "completed",
            details: "Campaign finished execution"
          },
          {
            id: "s61",
            name: "Message Composed",
            timestamp: "2023-12-08T13:35:00",
            status: "completed",
            details: "Appointment message created"
          },
          {
            id: "s62",
            name: "Message Sent",
            timestamp: "2023-12-08T13:40:00",
            status: "completed",
            details: "Appointment message sent"
          },
          {
            id: "s63",
            name: "Message Delivered",
            timestamp: "2023-12-08T13:45:00",
            status: "completed",
            details: "Message delivered to patient"
          },
          {
            id: "s64",
            name: "Email Opened",
            timestamp: "2023-12-08T14:15:00",
            status: "completed",
            details: "Patient opened the email"
          },
          {
            id: "s65",
            name: "Button Clicked",
            timestamp: "2023-12-08T14:20:00",
            status: "completed",
            details: "Patient clicked on appointment link"
          },
          {
            id: "s66",
            name: "Payment Init",
            timestamp: "2023-12-08T14:25:00",
            status: "completed",
            details: "Payment process initiated"
          },
          {
            id: "s67",
            name: "Payment Done",
            timestamp: "2023-12-08T14:30:00",
            status: "completed",
            details: "Payment successfully completed"
          }
        ]
      }
    ]
  },
  {
    id: "p3",
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    age: 29,
    gender: "Female",
    contactInfo: {
      email: "sarah.johnson@example.com",
      phone: "(555) 234-5678"
    },
    journeys: [
      {
        id: "j5",
        type: "results",
        name: "Lab Results Notification",
        startDate: "2023-12-07T13:00:00",
        status: "active",
        steps: [
          {
            id: "s28",
            name: "Campaign Trigger",
            timestamp: "2023-12-07T13:00:00",
            status: "completed",
            details: "Results available notification"
          },
          {
            id: "s29",
            name: "Message Sent",
            timestamp: "2023-12-07T13:05:00",
            status: "completed",
            details: "Lab results are ready notification sent"
          },
          {
            id: "s30",
            name: "Message Received",
            timestamp: "2023-12-07T14:20:00",
            status: "completed",
            details: "Patient viewed the notification"
          },
          {
            id: "s31",
            name: "Results Viewed",
            timestamp: "2023-12-07T14:25:00",
            status: "active",
            details: "Patient accessed lab results"
          },
          {
            id: "s32",
            name: "Follow-up Needed",
            timestamp: "",
            status: "upcoming",
            details: "Doctor recommendation for follow-up"
          }
        ]
      },
      {
        id: "j6",
        type: "guestpay",
        name: "Urgent Care Visit",
        startDate: "2023-11-25T08:45:00",
        endDate: "2023-11-25T12:30:00",
        status: "completed",
        steps: [
          {
            id: "s33",
            name: "Campaign Trigger",
            timestamp: "2023-11-25T08:45:00",
            status: "completed",
            details: "Visit payment notification"
          },
          {
            id: "s34",
            name: "Message Sent",
            timestamp: "2023-11-25T08:50:00",
            status: "completed",
            details: "Payment link sent"
          },
          {
            id: "s35",
            name: "Message Received",
            timestamp: "2023-11-25T09:15:00",
            status: "completed",
            details: "Patient viewed payment message"
          },
          {
            id: "s36",
            name: "Payment Initiated",
            timestamp: "2023-11-25T09:20:00",
            status: "completed",
            details: "Patient began payment process"
          },
          {
            id: "s37",
            name: "Payment Completed",
            timestamp: "2023-11-25T09:25:00",
            status: "completed",
            details: "Payment successfully processed"
          },
          {
            id: "s38",
            name: "Campaign Finish",
            timestamp: "2023-11-25T09:30:00",
            status: "completed",
            details: "Payment campaign concluded"
          },
          {
            id: "s39",
            name: "Receipt Sent",
            timestamp: "2023-11-25T09:35:00",
            status: "completed",
            details: "Payment receipt emailed to patient"
          }
        ]
      }
    ]
  }
];

export const getPatientById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};
