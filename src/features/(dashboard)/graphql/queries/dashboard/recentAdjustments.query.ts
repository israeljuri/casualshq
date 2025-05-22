import { gql } from "@apollo/client";

export const RECENT_ADJUSTMENTS_QUERY = gql`
    query RecentAdjustmentsQuery {
        recentAdjustments {
            _id
            staffId
            amount
            type
            date
        }
    }
`;
    
export interface RecentAdjustmentsResponse {
    recentAdjustments   : {
        _id: string;
        staffId: string;
        amount: number;
        type: string;
        date: string;
    }[];
}