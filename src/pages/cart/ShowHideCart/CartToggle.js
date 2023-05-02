
import { useSelector } from 'react-redux'
import { selectCartToggle } from '../../../redux/slice/cartSlice'

export const CartToggle = ({children}) => {

    const cartToggle = useSelector(selectCartToggle)

    if (cartToggle) {

        return children
    }

    return null;

}