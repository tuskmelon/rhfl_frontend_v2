import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const initialValue = {
    login: []
}

export const Userlogin = create(
    persist(() => initialValue, {
        name: 'auth-token',
        storage: createJSONStorage(() => sessionStorage),
        partialize: state => ({ login: state.login })
    })
)

export const loginStore = data => {
    // console.log(data, "data");
    Userlogin.setState(state => {
        return {
            login: data
        }
    })
}
