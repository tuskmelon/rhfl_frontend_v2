import axios from "axios"

export const AdminLogin = async ({ email, password }) => {
    const response = await axios.post('/api/admin_login', { email, password })
    return response
} 