const { Room, Booking } = require('../js/index.js')

describe('Check if room is occupied', () => {
    test('Room is not occupied', () => {
        let bookings = [{ checkin: new Date('2023/02/17'), checkout: new Date('2023/01/27') }]
        let roomAvailable = new Room('', bookings, 200, 10);
        let date = new Date('2023/02/10');

        expect(roomAvailable.isOccupied(date)).toBeDefined();
        expect(roomAvailable.isOccupied(date)).toBeFalsy();
    })

    test('Room is occupied', () => {
        let bookings = [{ checkin: new Date('2023/02/05'), checkout: new Date('2023/02/15') }]
        let roomOccupied = new Room('', bookings, 200, 10);
        let date = new Date('2023/02/10');

        expect(roomOccupied.isOccupied(date)).toBeDefined();
        expect(roomOccupied.isOccupied(date)).toBeTruthy();
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
    expect(room.occupancyPercentage(startDate, endDate)).toBe(`66.67%`);
})

test('Check total occupancy percentage across all rooms', () => {
    let startDate =  new Date('2023/02/02');
    let endDate = new Date('2023/02/27');

    let bookings1 = [
        { checkin: new Date('2023/02/03'), checkout: new Date('2023/02/13'), },
        { checkin: new Date('2023/02/08'), checkout: new Date('2023/02/20'), },
        { checkin: new Date('2023/02/25'), checkout: new Date('2023/03/10'), },
    ]

    let bookings2 = [
        { checkin: new Date('2023/01/28'), checkout: new Date('2023/02/01'), },
        { checkin: new Date('2023/02/15'), checkout: new Date('2023/02/25'), },
        { checkin: new Date('2023/02/17'), checkout: new Date('2023/02/26'), },
    ]

    let bookings3 = [
        { checkin: new Date('2023/02/05'), checkout: new Date('2023/02/10'), },
        { checkin: new Date('2023/02/25'), checkout: new Date('2023/03/05'), },
        { checkin: new Date('2023/02/20'), checkout: new Date('2023/03/01'), },
    ]

    let room1 = { name: 'Deluxe Double', bookings: bookings1, rate: 200, discount: 15 }
    let room2 = { name: 'Deluxe Single', bookings: bookings2, rate: 100, discount: 10 }
    let room3 = { name: 'Suite', bookings: bookings3, rate: 400, discount: 5 }

    let rooms = [room1, room2, room3]

    expect(Room.totalOccupancyPercentage(rooms, startDate, endDate)).not.toBeNull();
    expect(Room.totalOccupancyPercentage(rooms, startDate, endDate)).toBeDefined();
    expect(Room.totalOccupancyPercentage(rooms, startDate, endDate)).toBe(`55.56%`);
})

test('Check rooms that are not occupied for the entire duration', () => {
    let startDate =  new Date('2023/01/027');
    let endDate = new Date('2023/02/02');

    let bookings1 = [
        { checkin: new Date('2023/02/03'), checkout: new Date('2023/02/13'), },
        { checkin: new Date('2023/02/08'), checkout: new Date('2023/02/20'), },
        { checkin: new Date('2023/02/25'), checkout: new Date('2023/03/10'), },
    ]

    let bookings2 = [
        { checkin: new Date('2023/01/28'), checkout: new Date('2023/02/01'), },
        { checkin: new Date('2023/02/15'), checkout: new Date('2023/02/25'), },
        { checkin: new Date('2023/02/17'), checkout: new Date('2023/02/26'), },
    ]

    let bookings3 = [
        { checkin: new Date('2023/02/05'), checkout: new Date('2023/02/10'), },
        { checkin: new Date('2023/02/25'), checkout: new Date('2023/03/05'), },
        { checkin: new Date('2023/02/20'), checkout: new Date('2023/03/01'), },
    ]

    let room1 = { name: 'Deluxe Double', bookings: bookings1, rate: 200, discount: 15 }
    let room2 = { name: 'Deluxe Single', bookings: bookings2, rate: 100, discount: 10 }
    let room3 = { name: 'Suite', bookings: bookings3, rate: 400, discount: 5 }

    let rooms = [room1, room2, room3]
    let result = [room1, room3]

    expect(Room.availableRooms(rooms, startDate, endDate)).not.toBeNull();
    expect(Room.availableRooms(rooms, startDate, endDate)).toBeDefined();
    expect(Room.availableRooms(rooms, startDate, endDate)).not.toMatchObject(rooms);
    expect(Room.availableRooms(rooms, startDate, endDate)).toMatchObject(result);
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
    expect(book.getfee()).toBe(`$350.00`);
})