import { gql } from '@apollo/client';

export const RECENT_ADJUSTMENTS_QUERY = gql`
  query RecentAdjustments {
    recentAdjustments {
      id
      staffId
      staffName
      date
      overtime
      reason
      email
    }
  }
`;

export interface AdjustmentItem {
  id: string;
  staffId: string;
  staffName: string;
  date: string;
  overtime: string;
  reason: string;
  email: string;
}

export interface RecentAdjustmentsResponse {
  recentAdjustments: AdjustmentItem[];
}
