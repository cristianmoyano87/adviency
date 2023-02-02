import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { ListaRegalos } from './ListaRegalos'

test('renders gifts list', () => {
    const gifts = [{
        "id": "IdTest",
        "desc": "Caramelos",
        "Img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Oje3etaVbGk0xHvfW8OqfykDtOzvwmLvlQ&usqp=CAU",
        "Qty": 2,
        "Owner": "OwnerTest",
        "PriceUnit": "136.6"
    }]
    render(<ListaRegalos regalos={gifts} />);
    const linkElement = screen.getByText(/Caramelos/i);
    expect(linkElement).toBeInTheDocument();
});

test('renders gifts total', () => {
    const gifts = [{
        "id": "IdTest",
        "desc": "Caramelos",
        "Img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Oje3etaVbGk0xHvfW8OqfykDtOzvwmLvlQ&usqp=CAU",
        "Qty": 2,
        "Owner": "OwnerTest",
        "PriceUnit": "136.6"
    }]
    render(<ListaRegalos regalos={gifts} />);
    const linkElement = screen.getByText(/Total \$ 273.20/i);
    expect(linkElement).toBeInTheDocument();
    
});

test('renders empty gifts list', () => {
    const gifts = []
    render(<ListaRegalos regalos={gifts} />);
    const linkElement = screen.getByText(/No hay regalos, suma uno/i);
    expect(linkElement).toBeInTheDocument();
});

test('operation buttons delete edit duplicate', () => {
    const gifts = [{
        "id": "IdTest",
        "desc": "Caramelos",
        "Img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4Oje3etaVbGk0xHvfW8OqfykDtOzvwmLvlQ&usqp=CAU",
        "Qty": 2,
        "Owner": "OwnerTest",
        "PriceUnit": "136.6"
    }]
    const handleDelete = jest.fn()
    const handleEdit = jest.fn()
    const handleDuplicate = jest.fn()
    render(<ListaRegalos regalos={gifts} handleDelete={handleDelete} handleEdit={handleEdit} handleDuplicate={handleDuplicate}/>);
    expect(screen.getByText(/Caramelos/i)).toBeInTheDocument()
    userEvent.click(screen.getByTitle(/delete/i))
    expect(handleDelete).toHaveBeenCalled()
    userEvent.click(screen.getByTitle(/edit/i))
    expect(handleEdit).toHaveBeenCalled()
    userEvent.click(screen.getByTitle(/duplicate/i))
    expect(handleDuplicate).toHaveBeenCalled()
})