import itemProps from "./itemProps"

interface editProps {
    editing?: boolean,
    setEditing: Function,
    setEditItem?: Function,
    item: itemProps
}

export default editProps