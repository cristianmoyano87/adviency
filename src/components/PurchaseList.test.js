import { render, screen, fireEvent } from '@testing-library/react'
import { PurchaseList } from './PurchaseList'

test('renders PurchaseList', () => {
    const gifts = [{
        "id": "IdTest",
        "desc": "Caramelos",
        "Img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Oje3etaVbGk0xHvfW8OqfykDtOzvwmLvlQ&usqp=CAU",
        "Qty": 2,
        "Owner": "OwnerTest",
        "PriceUnit": "136.6"
    }]
    render(<PurchaseList regalos={gifts} />);
    const linkElement = screen.getByText(/Previsualizar/i);
    expect(linkElement).toBeInTheDocument();
    fireEvent.click(linkElement)
    const itemElement = screen.getByText(/Caramelos/i);
    expect(itemElement).toBeInTheDocument();
})
