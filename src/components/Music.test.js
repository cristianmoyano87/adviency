import { render, screen } from '@testing-library/react';
import { Music } from './Music';

test('renders play / pause buttons', () => {
    render(<Music />)
    const linkElement_play = screen.getByTitle('play')
    expect(linkElement_play).toBeInTheDocument()
/*
    fireEvent.click(linkElement_play)
    const linkElement_stop = screen.getByTitle('stop')
    expect(linkElement_stop).toBeInTheDocument()
 */
})
