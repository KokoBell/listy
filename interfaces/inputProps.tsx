import { User } from "@supabase/supabase-js"

interface inputProps {
    user?: User | null
    open: boolean,
    setOpen: Function,
    handleDisplay?: Function
}

export default inputProps