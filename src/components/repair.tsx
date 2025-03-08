import { Dialog } from "@radix-ui/react-dialog";
import { columns, RepairAsset } from "./repairColumns";
import { RepairDataTable } from "./repairTable";

export default function Repair() {
  const data: RepairAsset[] = [
    {
      repair_request_id: "1",
      user_id: 1,
      employee_name: "Jewel Lei 1",
      asset_id: 1,
      asset_name: "Repair Asset 1",
      issue: "Secret",
      remarks: "Secret",
      date_reported: "02/24/2025",
      urgency_id: 1,
      urgency_level: "Urgent",
      repair_start_date: "02/24/2025",
      repair_completion_date: "N/A",
      status_id: 1,
      status_name: "In Progress",
      repair_cost: 1000000,
    },
    {
      repair_request_id: "2",
      user_id: 2,
      employee_name: "Jewel Lei 2",
      asset_id: 2,
      asset_name: "Repair Asset 2",
      issue: "Secret",
      remarks: "Secret",
      date_reported: "02/24/2025",
      urgency_id: 1,
      urgency_level: "Urgent",
      repair_start_date: "02/24/2025",
      repair_completion_date: "N/A",
      status_id: 1,
      status_name: "In Progress",
      repair_cost: 1000000,
    },
    {
      repair_request_id: "3",
      user_id: 3,
      employee_name: "Jewel Lei 3",
      asset_id: 3,
      asset_name: "Repair Asset 3",
      issue: "Secret",
      remarks: "Secret",
      date_reported: "02/24/2025",
      urgency_id: 1,
      urgency_level: "Urgent",
      repair_start_date: "02/24/2025",
      repair_completion_date: "N/A",
      status_id: 1,
      status_name: "In Progress",
      repair_cost: 1000000,
    },
    {
      repair_request_id: "4",
      user_id: 4,
      employee_name: "Jewel Lei 4",
      asset_id: 4,
      asset_name: "Repair Asset 4",
      issue: "Secret",
      remarks: "Secret",
      date_reported: "02/24/2025",
      urgency_id: 1,
      urgency_level: "Urgent",
      repair_start_date: "02/24/2025",
      repair_completion_date: "N/A",
      status_id: 1,
      status_name: "In Progress",
      repair_cost: 1000000,
    },
    {
      repair_request_id: "5",
      user_id: 5,
      employee_name: "Jewel Lei 5",
      asset_id: 5,
      asset_name: "Repair Asset 5",
      issue: "Secret",
      remarks: "Secret",
      date_reported: "02/24/2025",
      urgency_id: 1,
      urgency_level: "Urgent",
      repair_start_date: "02/24/2025",
      repair_completion_date: "N/A",
      status_id: 1,
      status_name: "In Progress",
      repair_cost: 1000000,
    },
    {
      repair_request_id: "6",
      user_id: 6,
      employee_name: "Jewel Lei 6",
      asset_id: 6,
      asset_name: "Repair Asset 6",
      issue: "Secret",
      remarks: "Secret",
      date_reported: "02/24/2025",
      urgency_id: 1,
      urgency_level: "Urgent",
      repair_start_date: "02/24/2025",
      repair_completion_date: "N/A",
      status_id: 1,
      status_name: "In Progress",
      repair_cost: 1000000,
    },
    {
      repair_request_id: "7",
      user_id: 7,
      employee_name: "Jewel Lei 7",
      asset_id: 7,
      asset_name: "Repair Asset 7",
      issue: "Secret",
      remarks: "Secret",
      date_reported: "02/24/2025",
      urgency_id: 1,
      urgency_level: "Urgent",
      repair_start_date: "02/24/2025",
      repair_completion_date: "N/A",
      status_id: 1,
      status_name: "In Progress",
      repair_cost: 1000000,
    },
    {
      repair_request_id: "8",
      user_id: 8,
      employee_name: "Jewel Lei 8",
      asset_id: 8,
      asset_name: "Repair Asset 8",
      issue: "Secret",
      remarks: "Secret",
      date_reported: "02/24/2025",
      urgency_id: 1,
      urgency_level: "Urgent",
      repair_start_date: "02/24/2025",
      repair_completion_date: "N/A",
      status_id: 1,
      status_name: "In Progress",
      repair_cost: 1000000,
    },
    {
      repair_request_id: "9",
      user_id: 9,
      employee_name: "Jewel Lei 9",
      asset_id: 9,
      asset_name: "Repair Asset 9",
      issue: "Secret",
      remarks: "Secret",
      date_reported: "02/24/2025",
      urgency_id: 1,
      urgency_level: "Urgent",
      repair_start_date: "02/24/2025",
      repair_completion_date: "N/A",
      status_id: 1,
      status_name: "In Progress",
      repair_cost: 1000000,
    },
    {
      repair_request_id: "10",
      user_id: 10,
      employee_name: "Jewel Lei 10",
      asset_id: 10,
      asset_name: "Repair Asset 10",
      issue: "Secret",
      remarks: "Secret",
      date_reported: "02/24/2025",
      urgency_id: 1,
      urgency_level: "Urgent",
      repair_start_date: "02/24/2025",
      repair_completion_date: "N/A",
      status_id: 1,
      status_name: "In Progress",
      repair_cost: 1000000,
    },
    {
      repair_request_id: "11",
      user_id: 11,
      employee_name: "Jewel Lei 11",
      asset_id: 11,
      asset_name: "Repair Asset 11",
      issue: "Secret",
      remarks: "Secret",
      date_reported: "02/24/2025",
      urgency_id: 1,
      urgency_level: "Urgent",
      repair_start_date: "02/24/2025",
      repair_completion_date: "N/A",
      status_id: 1,
      status_name: "In Progress",
      repair_cost: 1000000,
    },
  ];

  return (
    <>
      <Dialog>
        <div className="ml-[calc(7rem+10px)] mt-[calc(1.5rem+10px)] w-screen mr-10 mb-10 min-h-[calc(100vh-10rem)] max-h-[calc(100vh-10rem)] bg-white rounded-xl">
          <p className="font-medium text-lg mt-5 px-10">Repair Assets</p>
          <div className="flex-1 min-h-0">
            <RepairDataTable columns={columns} data={data} />
          </div>
        </div>
      </Dialog>
    </>
  );
}
