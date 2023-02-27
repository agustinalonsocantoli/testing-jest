const { Room, Booking } = require('../js/index.js')

describe('Check if room is occupied', () => {
    test('Room is not occupied', () => {
        let roomAvailable = new Room();
        expect(roomAvailable.isOccupied()).toBeDefined();
        expect(roomAvailable.isOccupied(10)).toBeFalsy();
    })

    test('Room is occupied', () => {
        let roomOccupied = new Room();
        expect(roomOccupied.isOccupied()).toBeDefined();
        expect(roomOccupied.isOccupied(5)).toBeTruthy();
    })
})


test('Check days with occupancy within the range of dates provided', () => {
    let bookings = [
        { checkin: new Date('2023/02/15'), checkout: new Date('2023/02/20') },
        { checkin: new Date('2023/01/07'), checkout: new Date('2023/01/20') },
        { checkin: new Date('2023/02/15'), checkout: new Date('2023/02/25') },
    ]

    let room = new Room('', bookings, 200, 15);
    let startDate = new Date('2023/02/07');
    let endDate = new Date('2023/02/27');

    expect(room.occupancyPercentage(startDate, endDate)).not.toBeNull();
    expect(room.occupancyPercentage(startDate, endDate)).toBeDefined();
    expect(room.occupancyPercentage(startDate, endDate)).toBe(66);
})


test('Check the fee, including discounts on room and booking', () => {
    let book = new Booking('', '', '', '', 20, {
        name: 'Deluxe double',
        Bookings: [],
        rate: 500,
        discount: 10,
    })

    expect(book.getfee()).not.toBeNull();
    expect(book.getfee()).toBeDefined();
    expect(book.getfee()).toBe(350);
})