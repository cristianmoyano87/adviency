import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GiftForm } from './GiftForm'
import { giftPostItem, giftPropose, giftPutItem } from '../services/apiGifts'

jest.mock('../services/apiGifts')

test('GiftForm render and close', () => {
    const handleClose = jest.fn()
    render(<GiftForm show={true} handleClose={handleClose} giftCollection={[]} setGiftCollection={() => { }} action={{ action: "add" }} />)
    const linkElement = screen.getByText(/Cancelar/i)
    expect(linkElement).toBeVisible()
    fireEvent.click(linkElement)
    expect(handleClose).toBeCalledTimes(1)
})

test('GiftForm get proposal', () => {
    const proposal = {
        "desc": "Mock Item",
        "Img": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiAkte2nz55xVLmeQ5RjqDedLkeudqY2YeeIDEVAlpyHAYHIuUs7THdQAa0Bg-YKoLN_JB8L32i-RKYzIt1Ox5vOTCYl-0WoKmtsucWzKkexCqztM9Dpl8yEW94X6VZvY37RP5et5wJ25WEABGjhMkSnN1dHweP3qNNXjHid2PTZp5MzrFPu7WcqDVA/s128/unnamed.png"
    }
    giftPropose.mockImplementationOnce(SetState => Promise.resolve(SetState(proposal)))
    render(<GiftForm show={true} handleClose={() => { }} giftCollection={[]} setGiftCollection={() => { }} action={{ action: "add" }} />)
    userEvent.click(screen.getByText(/Sorprendeme/i))
    expect(screen.getByLabelText(/Regalo/i).getAttribute('value')).toBe(proposal.desc)
    expect(screen.getByLabelText(/Imagen/i).getAttribute('value')).toBe(proposal.Img)
})

test('GiftForm add new gift', () => {
    giftPostItem.mockImplementationOnce((item, setGiftCollection) => expect(JSON.stringify(item)).toBe('{"desc":"RTL-Descripcion","Qty":"2","Img":"RTL-Imagen","Owner":"RTL-Destinatario","PriceUnit":"2"}'))
    render(<GiftForm show={true} handleClose={() => { }} giftCollection={[]} setGiftCollection={() => { }} action={{ action: "add" }} />)
    fireEvent.change(screen.getByLabelText(/Regalo/i), {target:{value: 'RTL-Descripcion'}})
    fireEvent.change(screen.getByLabelText(/Destinatario/i), {target:{value: 'RTL-Destinatario'}})
    fireEvent.change(screen.getByLabelText(/Imagen/i), {target:{value: 'RTL-Imagen'}})
    fireEvent.change(screen.getByLabelText(/Cantidad/i), {target:{value: '2'}})
    fireEvent.change(screen.getByLabelText(/Precio Unitario/i), {target:{value: '2'}})
    expect(screen.getByTitle('Subtotal').textContent).toBe('Subtotal: 4.00')
    userEvent.click(screen.getByText(/Guardar/i))
    expect(giftPostItem).toBeCalled()
})

test('GiftForm edit gift', () => {
    const giftItem = {
        "id": "IdTest",
        "desc": "Test Gift",
        "Img": "https://testimage.com/original.png",
        "Qty": 2,
        "Owner": "OwnerTest",
        "PriceUnit": "136.6"
    }
    const giftCollection = [giftItem]
    giftPutItem.mockImplementationOnce((item, setGiftCollection) => expect(JSON.stringify(item)).toBe('{"desc":"Edit-Descripcion","Qty":"1","Img":"Edit-Imagen","Owner":"Edit-Destinatario","PriceUnit":"3","id":"IdTest"}'))
    render(<GiftForm show={true} handleClose={() => { }} giftCollection={giftCollection} setGiftCollection={() => { }} action={{ action: "edit", editData: giftItem }} />)
    expect(screen.getByTitle('Subtotal').textContent).toBe('Subtotal: 273.20')
    fireEvent.change(screen.getByLabelText(/Regalo/i), {target:{value: 'Edit-Descripcion'}})
    fireEvent.change(screen.getByLabelText(/Destinatario/i), {target:{value: 'Edit-Destinatario'}})
    fireEvent.change(screen.getByLabelText(/Imagen/i), {target:{value: 'Edit-Imagen'}})
    fireEvent.change(screen.getByLabelText(/Cantidad/i), {target:{value: '1'}})
    fireEvent.change(screen.getByLabelText(/Precio Unitario/i), {target:{value: '3'}})
    expect(screen.getByTitle('Subtotal').textContent).toBe('Subtotal: 3.00')
    userEvent.click(screen.getByText(/Guardar/i))
    expect(giftPutItem).toBeCalled()
})

test('GiftForm duplicate gift', () => {
    const giftItem = {
        "id": "IdTest",
        "desc": "Test Gift",
        "Img": "https://testimage.com/original.png",
        "Qty": 2,
        "Owner": "OwnerTest",
        "PriceUnit": "136.6"
    }
    const giftCollection = [giftItem]
    giftPostItem.mockImplementationOnce((item, setGiftCollection) => expect(JSON.stringify(item)).toBe('{"desc":"Dup-Descripcion","Qty":2,"Img":"Dup-Imagen","Owner":"Dup-Destinatario","PriceUnit":"5"}'))
    render(<GiftForm show={true} handleClose={() => { }} giftCollection={giftCollection} setGiftCollection={() => { }} action={{ action: "duplicate", editData: giftItem }} />)
    expect(screen.getByTitle('Subtotal').textContent).toBe('Subtotal: 273.20')
    fireEvent.change(screen.getByLabelText(/Regalo/i), {target:{value: 'Dup-Descripcion'}})
    fireEvent.change(screen.getByLabelText(/Destinatario/i), {target:{value: 'Dup-Destinatario'}})
    fireEvent.change(screen.getByLabelText(/Imagen/i), {target:{value: 'Dup-Imagen'}})
    fireEvent.change(screen.getByLabelText(/Cantidad/i), {target:{value: '2'}})
    fireEvent.change(screen.getByLabelText(/Precio Unitario/i), {target:{value: '5'}})
    expect(screen.getByTitle('Subtotal').textContent).toBe('Subtotal: 10.00')
    userEvent.click(screen.getByText(/Guardar/i))
    expect(giftPostItem).toBeCalled()
})
