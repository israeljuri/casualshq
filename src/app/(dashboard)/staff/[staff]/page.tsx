// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';

// import { StaffMember } from '@/features/(dashboard)/types';
 

// import { Sidebar } from '@/features/(dashboard)/components/Sidebar';

// import { Button } from '@/components/molecules/Button';
// import Image from 'next/image';
 
// import { cn } from '@/lib/utils';
// import { Skeleton } from '@/components/atoms/skeleton';
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from '@/components/molecules/Form';
// import { Input } from '@/components/molecules/Input';
// import { Select } from '@/components/molecules/Select';
// import { useForm } from 'react-hook-form';

// export default function FullStaffDetailsPage() {
//   const params = useParams();
//   const router = useRouter();
//   const staffId = params.staff as string;

//   const [staffMember, setStaffMember] = useState<StaffMember | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState('personal');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

 

//   const form = useForm<StaffMember>({
//     defaultValues: {},
//   });

//   const onSubmit = async (data: StaffMember) => {
//     if (staffMember) {
//       // TODO: Implement update staff from api
//       // await handleAddOrUpdateStaff(data);
//       // refreshStaffList();
//     }
//   };

//   useEffect(() => {
//     if (staffId) {
//       const fetchDetails = async () => {
//         setIsLoading(true);
//         setError(null);
//         try {
//           // TODO: Implement fetch staff details from api
//           // const details = await staffService.fetchStaffDetails(staffId); 
//           // if (details) {
//           //   setStaffMember(details);
//           //   form.reset(details);
//           // } else {
//           //   setError('Staff member not found.');
//           // }
//         } catch (e: any) {
//           setError(e.message || 'Failed to fetch staff details.');
//         } finally {
//           setIsLoading(false);
//         }
//       };
//       fetchDetails();
//     }
//   }, [staffId, form]);

//   const handleDelete = async () => {
//     if (staffMember) {
//       // TODO: Implement delete staff from api
//       // await handleDeleteStaff(staffMember?.id); // From useStaffManagement
//       router.push('/staff'); // Navigate back to staff list
//     }
//   };

//   const handleExport = () => {
//     console.log('Exporting staff member');
//     // Add export logic here
//     alert('Exporting staff member');
//   };

//   const renderPersonalInformation = () => (
//     <Form {...form}>
//       <form className="space-y-8">
//         <div>
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-medium text-gray-900 mb-4">
//               Personal Information
//             </h3>
//             <Button
//               variant="secondary"
//               className="text-red-800"
//               onClick={handleDelete}
//               leftIcon={
//                 <Image
//                   src="/admin-staff/staff-delete.svg"
//                   alt="Delete staff"
//                   width={15}
//                   height={15}
//                 />
//               }
//             >
//               Delete staff
//             </Button>
//           </div>
//         </div>
//       </form>
//     </Form>
//   );

//   const renderFinancialInformation = () => <></>;

//   const renderOthersInformation = () => <></>;

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar
//         isOpen={isSidebarOpen}
//         onClose={() => setIsSidebarOpen(false)}
//         activePath={`/staff`}
//       />

//       <main className="flex-1 flex flex-col overflow-y-auto">
//         {/* Header with back button */}
//         <div className="border-b border-gray-200 bg-white px-6 py-4">
//           <section className="container mx-auto">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-4">
//                 <Button
//                   variant="ghost"
//                   size="lg"
//                   onClick={() => router.back()}
//                   leftIcon={
//                     <Image
//                       src="/admin-dashboard/move-right.svg"
//                       alt="Move right"
//                       width={20}
//                       height={20}
//                     />
//                   }
//                 >
//                   Staff Information
//                 </Button>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Button
//                   variant="primary"
//                   onClick={handleExport}
//                   leftIcon={
//                     <Image
//                       src="/admin-dashboard/export.svg"
//                       alt="Export"
//                       width={15}
//                       height={15}
//                     />
//                   }
//                 >
//                   Export
//                 </Button>
//               </div>
//             </div>
//           </section>
//         </div>

//         <section className="container mx-auto">
//           <div className="flex-1 p-6">
//             {/* Tab Navigation */}
//             <div className="border-b border-gray-200 mb-6">
//               <nav className="-mb-px flex space-x-8">
//                 <button
//                   onClick={() => setActiveTab('personal')}
//                   className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                     activeTab === 'personal'
//                       ? 'border-primary text-primary'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   Personal Information
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('financial')}
//                   className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                     activeTab === 'financial'
//                       ? 'border-primary text-primary'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   Financial Information
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('others')}
//                   className={`py-4 px-1 border-b-2 font-medium text-sm ${
//                     activeTab === 'others'
//                       ? 'border-primary text-primary'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   Others
//                 </button>
//               </nav>
//             </div>

//             {/* Tab Content */}
//             {isLoading ? (
//               <Skeleton className="flex-1 p-6 min-h-[calc(100vh-200px)]" />
//             ) : (
//               <div className="">
//                 {activeTab === 'personal' && renderPersonalInformation()}
//                 {activeTab === 'financial' && renderFinancialInformation()}
//                 {activeTab === 'others' && renderOthersInformation()}
//               </div>
//             )}
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

const FullStaffDetailsPage = () => {
  return (
    <div>
      <h1>Full Staff Details</h1>
    </div>
  );
};

export default FullStaffDetailsPage;
