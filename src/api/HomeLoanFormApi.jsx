// 'use server'
import axios from "axios"


export const HomeLoanFormApi = async (formValue) => {
    try {
        const response = await axios.post('/api/home_loan_form', formValue);
        if (response.status === 200) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error
    }
}

export const ApplyNowLeads = async ({ token }) => {

    try {
        console.log(token, "token");
        const response = await axios.get('/api/home_loan_form', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(response, "response");
        if (response.status === 200) {
            return response;
        } else {
            return response;
        }
    } catch (error) {
        return error;
    }
};
export const CareerLeads = async ({token}) => {
    try {
        const response = await axios.get('/api/new-career',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // console.log(response, "response");
        if (response.status === 200) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error
    }
}
export const SalesCareerLeads = async ({token}) => {
    try {
        const response = await axios.get('/api/sales-career',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // console.log(response, "response");
        if (response.status === 200) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error
    }
}
export const CampaignLeads = async ({ token }) => {
    try {
        const response = await axios.get('/api/leads',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        // console.log(response, "response");
        if (response.status === 200) {
            return response
        } else {
            return response
        }
    } catch (error) {
        return error
    }
}