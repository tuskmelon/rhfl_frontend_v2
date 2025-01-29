
import { AreaCalculatorApi } from '@/api/AreaCalculatorApi';
import { getBidsDigitization } from '@/api/BidsDigitizationApi';
import { GuidelineValuesApi } from '@/api/GuidelineValuesApi';
import { handleCarousel } from '@/api/HomePageApi';
import { StampDutyCalculatorApi } from '@/api/StampDutyCalculatorApi';
import { blogCarousel } from '@/api/BlogApi';
import { NewsUpdate } from '@/api/NewsApi';
import { handleProductList } from '@/api/HomePageApi.jsx';
import { useQuery } from '@tanstack/react-query';
import { ApplyNowLeads, CampaignLeads, CareerLeads, SalesCareerLeads } from '@/api/HomeLoanFormApi';

export const useHomeCarousel = () => {
    return useQuery({
        queryKey: ['Home_Page_Carousels'],
        queryFn: async () => {
            return handleCarousel();
        },
        staleTime: 60 * 1000,
    })
}

export const useProductList = () => {
    return useQuery({
        queryKey: ['Product_Lists'],
        queryFn: async () => {
            const data = await handleProductList();

            return data || [];
        },
        staleTime: 60 * 1000,
    })
}




// Stamp Duty Calculator
export const useStampDutyCalculator = () => {
    return useQuery({
        queryKey: ['Stamp_Duty_Calculators'],
        queryFn: async () => {
            return StampDutyCalculatorApi();
        },
        staleTime: 60 * 1000,
    })
}
export const useBlogCarousel = () => {
    return useQuery({
        queryKey: ['Blog_Page_Carousels'],
        queryFn: async () => {
            return blogCarousel();
        },
        staleTime: 60 * 1000,
    })
}

// Area Conversion Calculator
export const useAreaCalculator = () => {
    return useQuery({
        queryKey: ['Area_Calculators'],
        queryFn: async () => {
            return AreaCalculatorApi();
        },
        staleTime: 60 * 1000,
    })
}

// Guideline Values
export const useGuidelineValues = () => {
    return useQuery({
        queryKey: ['Guideline_Values'],
        queryFn: async () => {
            return GuidelineValuesApi();
        },
        staleTime: 60 * 1000,
    })
}

// Bids Digitization
export const useBidsDigitization = () => {
    return useQuery({
        queryKey: ['Bids_Digitization'],
        queryFn: async () => {
            return getBidsDigitization();
        },
        staleTime: 60 * 1000,
    })
}

export const useNewsUpdate = () => {
    return useQuery({
        queryKey: ['News_Update_Page'],
        queryFn: async () => {
            return NewsUpdate();
        },
        staleTime: 60 * 1000,
    })
}

export const useApplyNowLeads = ({ token }) => {
    return useQuery({
        queryKey: ['Apply_Now_Leads', token],
        queryFn: async () => {
            return ApplyNowLeads({ token });
        },
        staleTime: 60 * 1000,
        enabled: token?.length > 0
    })
}


export const useCareerLeads = ({ token }) => {
    return useQuery({
        queryKey: ['Career_Leads', token],
        queryFn: async () => {
            return CareerLeads({ token });
        },
        staleTime: 60 * 1000,
        enabled: token.length > 0
    })
}
export const useSalesCareerLeads = ({ token }) => {
    return useQuery({
        queryKey: ['Sales_Career_Leads', token],
        queryFn: async () => {
            return SalesCareerLeads({ token });
        },
        staleTime: 60 * 1000,
        enabled: token.length > 0
    })
}

export const useCampaignLeads = ({ token }) => {
    return useQuery({
        queryKey: ['Campaign_Leads', token],
        queryFn: async () => {
            return CampaignLeads({ token });
        },
        staleTime: 60 * 1000,
        enabled: token.length > 0
    })
}

// export const usePercentageQ = () => {
//     return useQuery({
//         queryKey: ['handleInterestPercentage'],
//         queryFn: async () => {
//             return handleInterestPercentage();
//         },
//         staleTime: 60 * 1000,
//     })
// }
