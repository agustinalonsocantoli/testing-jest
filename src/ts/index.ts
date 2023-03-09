interface RoomInput {
    name: string;
    bookings: Booking[];
    rate: number;
    discount: number;
}

interface BookingInput {
    name: string;
    email: string;
    checkin: Date;
    checkout: Date;
    discount: number;
    room: Room;
}

class Room {
    name: string;
    bookings: Booking[];
    rate: number;
    discount: number;

    constructor(roomInput: RoomInput) {
        this.name = roomInput.name;
        this.bookings = roomInput.bookings;
        this.rate = roomInput.rate;
        this.discount = roomInput.discount;
    }

    isOccupied(date: Date) {
        // returns false if not occupied, returns true if occupied
        let formatDate = date.getTime();
        let available = true;

        if(this.bookings.length > 0) {

            this.bookings.forEach(book => {
                if(book['checkin'].getTime() < formatDate && book['checkout'].getTime() > formatDate){
                    available = true
                } else {
                    available = false
                }
            })

        } else {
            available = false
        }

        return available
    }

    occupancyPercentage(startDate: Date, endDate: Date) {
        // returns the percentage of days with occupancy within the range of dates provided (inclusive)
        let formatStartDate = startDate.getTime();
        let formatEndDate = endDate.getTime();
        let bookCount = 0;
    
        if(this.bookings.length > 0) {
            this.bookings.forEach( book => {
                if(book['checkin'].getTime() >= formatStartDate && book['checkout'].getTime() < formatEndDate){
                    bookCount++
                }
            })
        }
    
        return `${((bookCount * 100) / this.bookings.length).toFixed(2)}%`
    };

    static totalOccupancyPercentage(rooms: Room[], startDate: Date, endDate: Date) {
        // returns the total occupancy percentage across all rooms in the array
        let formatStartDate = startDate.getTime();
        let formatEndDate = endDate.getTime();
        let bookCount = 0;
        let roomCount = 0;

        if(rooms.length > 0){
            rooms.forEach(room => {
                if(room['bookings'].length > 0){
                    room['bookings'].forEach(book => {
                        bookCount++

                        if(book['checkin'].getTime() >= formatStartDate && book['checkout'].getTime() < formatEndDate){
                            roomCount++
                        }
                    })
                }
            })
        }

        return `${((roomCount * 100) / bookCount).toFixed(2)}%`;
    }

    static availableRooms(rooms: Room[], startDate: Date, endDate: Date) {
        // returns an array of all rooms in the array that are not occupied for the entire duration
        let formatStartDate = startDate.getTime();
        let formatEndDate = endDate.getTime();
        let freeRooms: Room[] = [];

        if(rooms.length > 0){
            rooms.forEach(room => {
                if(room['bookings'].length > 0){

                    let available = true;
                    room['bookings'].forEach(book => {
                        if(book['checkin'].getTime() >= formatStartDate && book['checkout'].getTime() < formatEndDate) {
                            available = false;
                        } 
                    })

                    if (available) {
                        freeRooms.push(room)
                    }
                }
            })
        }

        return freeRooms;
    }
}

class Booking {
    name: string;
    email: string;
    checkin: Date;
    checkout: Date;
    discount: number;
    room: Room;

    constructor(bookingInput: BookingInput) {
        this.name = bookingInput.name;
        this.email = bookingInput.email;
        this.checkin = bookingInput.checkin;
        this.checkout = bookingInput.checkout;
        this.discount = bookingInput.discount;
        this.room = bookingInput.room;
    }

    getfee(): string {
        // returns the fee, including discounts on room and booking
        let roomDiscount = (this.room.rate * this.room.discount) / 100;
        let bookDiscount = (this.room.rate * this.discount) / 100;
        let finalPrice = (this.room.rate - roomDiscount - bookDiscount);

        return `$${finalPrice.toFixed(2)}`
    }

}

export { Room, Booking };