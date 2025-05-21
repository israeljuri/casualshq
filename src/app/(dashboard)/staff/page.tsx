// 'use client';
// import React, { useState } from 'react';
// import { usePathname } from 'next/navigation';  
 
// import { Sidebar } from '@/features/(dashboard)/components/Sidebar';
// import { Header } from '@/features/(dashboard)/components/Header'; 
// import { StaffListTable } from '@/features/(dashboard)/components/tables/StaffListTable';
// import { AddStaffModal } from '@/features/(dashboard)/components/modals/AddStaffModal';
// import { ImportStaffModal } from '@/features/(dashboard)/components/modals/ImportStaffModal';
 
// import { Button } from '@/components/molecules/Button';
// import Image from 'next/image';

// import { StaffDetailsModal } from '@/features/(dashboard)/components/modals/StaffDetailsModal';
// import { StaffMember } from '@/features/(dashboard)/types';
// import { Skeleton } from '@/components/atoms/skeleton';

// export default function StaffPage() {
//   const [isStaffSummaryModalOpen, setIsStaffSummaryModalOpen] = useState(false);
//   const [selectedStaffForSummary, setSelectedStaffForSummary] =
//     useState<StaffMember | null>(null);

//   const openStaffSummaryModal = (staff: StaffMember) => {
//     setSelectedStaffForSummary(staff);
//     setIsStaffSummaryModalOpen(true);
//   };
//   const closeStaffSummaryModal = () => {
//     setIsStaffSummaryModalOpen(false);
//     setSelectedStaffForSummary(null);
//   };

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const pathname = usePathname();

//   const pageTitle = 'Staff';
//   const pageDescription = 'Manage staff profiles and track individual details.';

//   return (
//     <div className="flex h-screen overflow-hidden">
//       <Sidebar
//         isOpen={isSidebarOpen}
//         onClose={() => setIsSidebarOpen(false)}
//         activePath={pathname}
//       />

//       <main className="flex-1 flex flex-col overflow-y-auto">
//         <Header
//           pageTitle={pageTitle}
//           pageDescription={pageDescription}
//           onSidebarOpen={() => setIsSidebarOpen(true)}
//           // Filter props for the header's filter dropdown
//           appliedFilters={{
//             teams: {},
//             roles: {},
//           }}
//           tempFilters={{
//             teams: {},
//             roles: {},
//           }}
//           roleOptions={[]}
//           // Add teamOptions and statusOptions if your FilterDropdown is generic enough
//           // For now, assuming FilterDropdown inside AdminHeader is tailored or can be adapted
//           onDateRangeChange={() => {}} // No date range filter on staff list for now
//           onTempFilterChange={() => {}}
//           onApplyFilters={() => {}}
//           onCancelFilters={() => {}}
//           setTempFilters={() => {}}
//           showDatePicker={false}
//           // Custom action buttons for Staff page
//           customActions={
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="secondary"
//                 onClick={() => {}}
//                 // TODO: Implement import staff
//                 // onClick={openImportStaffModal}
//                 leftIcon={
//                   <Image
//                     src="/admin-staff/import.svg"
//                     alt="Import"
//                     width={20}
//                     height={20}
//                   />
//                 }
//               >
//                 Import staff
//               </Button>
//               <Button
//                 variant="primary"
//                 onClick={() => {}}
//                 // TODO: Implement add staff
//                 // onClick={() => openAddStaffModal()}
//                 leftIcon={
//                   <Image
//                     src="/admin-staff/plus.svg"
//                     alt="Import"
//                     width={20}
//                     height={20}
//                   />
//                 }
//               >
//                 Add staff
//               </Button>
//             </div>
//           }
//         />

//         <section className="container mx-auto">
//           <div className="flex-1 p-4 sm:p-6 lg:p-8">
//             {/* TODO: Implement loading state */}
//             {/* {isLoading && (
//               <div className="flex items-center justify-center h-[calc(100vh-300px)]">
//                 <Skeleton className="min-h-[calc(100vh-200px)] w-full"></Skeleton>
//               </div>
//             )} */}
//             {/* TODO: Implement error state */}

//             {/* // !error && */}
//             {/* // TODO: Get staffs from API */}
//             {/* // [].length > 0 && */}
//             {/* // TODO: Implement loading state  */}
//             {/* // !isLoading && (   */}
//             <StaffListTable
//               // TODO: Get staffs from API
//               staffMembers={[]}
//               isLoading={false && [].length > 0} // Show table loading state only if there was previous data
//               // TODO: Implement edit, delete staff
//               onEditStaff={(staff) => {}}
//               onDeleteStaff={() => {}}
//               onViewDetails={(staffId) => openStaffSummaryModal(staffId)}
//               // Pagination props
//               // TODO: Implement pagination (currentPage, totalPages, onPageChange, totalStaffCount, pageSize)
//               currentPage={1}
//               totalPages={1}
//               onPageChange={() => {}}
//               totalStaffCount={0}
//               pageSize={10}
//             />
//           </div>
//         </section>
//       </main>

//       {/* TODO: Implement add staff modal */}
//       {/* {isAddStaffModalOpen && ( */}
//       <AddStaffModal
//         isOpen={false}
//         onClose={() => {}}
//         onSubmit={() => {}}
//         initialData={null}
//         teamOptions={[]}
//       />
//       {/* )} */}

//       {/* TODO: Implement import staff modal */}
//       {/* {isImportStaffModalOpen && ( */}
//       <ImportStaffModal
//         isOpen={false}
//         onClose={() => {}}
//         importStep={''}
//         importedFile={null}
//         staffToImport={[]}
//         importError={''}
//         importSummary={''}
//         onFileSelect={() => {}}
//         onRemoveStaffFromReview={() => {}}
//         onConfirmImport={() => {}}
//         onResetImport={() => {}}
//         setImportStep={() => {}}
//       />
//       {/* )} */}

//       {isStaffSummaryModalOpen && selectedStaffForSummary && (
//         <StaffDetailsModal
//           isOpen={isStaffSummaryModalOpen}
//           onClose={closeStaffSummaryModal}
//           staffMember={selectedStaffForSummary}
//           onEdit={(staffToEdit) => {
//             closeStaffSummaryModal();
//             // openAddStaffModal(staffToEdit);
//           }}
//           // importedFile={staffHook.importedFile}
//           // staffToImport={staffHook.staffToImport}
//           // importError={staffHook.importError}
//           // importSummary={staffHook.importSummary}
//           // onFileSelect={staffHook.handleFileSelectForImport}
//           // onRemoveStaffFromReview={staffHook.removeStaffFromReviewList}
//           // onConfirmImport={staffHook.handleConfirmImport}
//           // onResetImport={staffHook.resetImportProcess}
//           // setImportStep={staffHook.setImportStep}
//         />
//       )}

//       {/* {isStaffSummaryModalOpen && selectedStaffForSummary && ( */}
//       <StaffDetailsModal
//         isOpen={false}
//         onClose={() => {}}
//         staffMember={null}
//         onEdit={(staffToEdit) => {
//           closeStaffSummaryModal();
//           // openAddStaffModal(staffToEdit);
//         }}
//         onDelete={(id) => {
//           closeStaffSummaryModal();
//           // handleDeleteStaff(id);
//         }}
//       />
//       {/* )} */}
//     </div>
//   );
// }

const StaffPage = () => {
  return (
    <div>
      <h1>Staff page</h1>
    </div>
  );
};

export default StaffPage;
