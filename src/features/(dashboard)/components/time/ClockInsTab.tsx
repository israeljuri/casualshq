/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/molecules/Button';
import { Status } from '@/components/molecules/Status';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/molecules/Table';
import { PaginationControls } from '@/features/(dashboard)/components/tables/PaginationControls';
import { Skeleton } from '@/components/atoms/skeleton';

import Image from 'next/image';
 
interface ClockInsTabProps {
  data: any[];
  isLoading: boolean;
  totalPages: number;
  totalStaffCount: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
}

export const ClockInsTab: React.FC<ClockInsTabProps> = ({
  data,
  isLoading,
  totalPages,
  totalStaffCount,
  currentPage,
  setCurrentPage,
  pageSize,
}) => {
  const handleAddStaff = () => {
    console.log('Add staff clicked');
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Clock-in</TableHead>
            {/* <TableHead></TableHead> */}
          </TableRow>
        </TableHeader>

        {isLoading && (
          <TableCaption>
            <Skeleton className="h-[calc(100vh-250px)]"></Skeleton>
          </TableCaption>
        )}

        {!isLoading && data.length === 0 && (
          <TableCaption className="py-10 text-base">
            <div className="flex flex-col items-center justify-center h-[calc(100vh-400px)] text-center ">
              <Image
                src="/table/empty-table.svg"
                alt="No information yet"
                width={90}
                height={90}
              />

              <p className="font-medium mt-6 mb-1.5 text-lg text-black">
                No information yet.
              </p>

              <p className="text-[#667185] mb-8">
                View staff members time information here.
              </p>

              <Button
                variant="primary"
                onClick={handleAddStaff}
                leftIcon={
                  <Image
                    src="/admin-staff/plus.svg"
                    alt="Add"
                    width={20}
                    height={20}
                  />
                }
              >
                Add staff
              </Button>
            </div>
          </TableCaption>
        )}

        <TableBody>
          {!isLoading &&
            data.map((staff) => (
              <TableRow
                key={staff.id}
                className="hover:bg-slate-50 transition-colors duration-150 group"
              >
                <TableCell>
                  <span>
                    {staff.firstName} {staff.lastName}
                  </span>
                </TableCell>
                <TableCell>
                  <Status status={staff.status} breakType={staff.breakType} />
                </TableCell>
                <TableCell>{staff.team}</TableCell>
                <TableCell>{staff.clockInTime}</TableCell>
                {/* <TableCell className="text-right">
                   
                </TableCell> */}
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {totalStaffCount > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          totalItems={totalStaffCount}
          pageSize={pageSize}
        />
      )}
    </div>
  );
};
