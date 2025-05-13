export async function getStaffs() {
  const response = await fetch('/data/staffs.json');
  if (!response.ok) {
    throw new Error('Failed to fetch staff list');
  }

  return response.json();
}
