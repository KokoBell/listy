import { User } from "@supabase/supabase-js"

interface feebackProps {
    feedback: boolean
    setFeedback: Function,
    user: User
}

export default feebackProps