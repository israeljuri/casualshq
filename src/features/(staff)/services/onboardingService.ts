import { Staff, AccountSetupData } from '../types';

export async function getStaffById(id: string) {
  const response = await fetch('/data/staffs.json');
  if (!response.ok) {
    throw new Error('Failed to fetch staff list');
  }

  const staffList = await response.json();

  const staff = staffList.staffs.find((member: Staff) => member.id == id);

  if (!staff) {
    throw new Error(`Staff with id ${id} not found`);
  }

  return staff;
}

export async function completeAccountSetup(
  data: AccountSetupData
): Promise<{ success: boolean }> {
  console.log('Simulating account setup with data:', data);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true };
}
