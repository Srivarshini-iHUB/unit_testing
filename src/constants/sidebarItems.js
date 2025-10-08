import {
  House,
  University,
  Sparkles,
  BrainCircuit,
  FileBox,
  ScrollText,
  CircleCheckBig,
  Bell,
  UserRoundCog,
  Settings,
  TicketCheck
} from "lucide-react";

export const sidebarItems = {
  coordinator: [
    { label: "Home", path: "/coordinator/dashboard", icon: House },
    { label: "NAAC Criteria", path: "/coordinator/naac-criteria", icon: Sparkles },
    { label: "Reports", path: "/coordinator/reports", icon: ScrollText },
    { label: "Tasks", path: "/coordinator/tasks", icon: CircleCheckBig },
    { label: "Document Factory", path: "/coordinator/documents", icon: FileBox },
    { label: "Notification", path: "/coordinator/notification", icon: Bell },
    { label: "User Management", path: "/coordinator/user-management", icon: UserRoundCog },
    { label: "Settings", path: "/coordinator/settings", icon: Settings },
    { label: "Institution Profile", path: "/coordinator/institution", icon: University },
    { label: "AI Assistant", path: "/coordinator/ai-assistant", icon: BrainCircuit },
  ],
  contributor: [
    { label: "Home", path: "/contributor/dashboard", icon: House },
    { label: "Tasks", path: "/contributor/tasks", icon: CircleCheckBig },
    { label: "Notification", path: "/contributor/notification", icon: Bell },
    { label: "Settings", path: "/contributor/settings", icon: Settings },
    { label: "Institution Profile", path: "/contributor/institution", icon: University },
  ],
  developer: [
    { label: "Home", path: "/developer/dashboard", icon: House },
    { label: "User Management", path: "/developer/users", icon: UserRoundCog },
    { label: "Ticket Management", path: "/developer/tickets", icon: TicketCheck },
  ],

};
