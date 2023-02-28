'use strict'

class Room {
    name;
    bookings;
    rate;
    discount;

    constructor(name, bookings, rate, discount) {
        this.name = name;
        this.bookings = bookings;
        this.rate = rate;
        this.discount = discount;
    }

    isOccupied(date) {
        // returns false if not occupied, returns true if occupied
        let formatDate = date.getTime();
        let available = true;

        if(this.bookings.length > 0) {

            this.bookings.forEach(book => {
                if(book.checkin.getTime() < formatDate && book.checkout > formatDate){
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

    occupancyPercentage(startDate, endDate) {
        // returns the percentage of days with occupancy within the range of dates provided (inclusive)
        let formatStartDate = startDate.getTime();
        let formatEndDate = endDate.getTime();
        let bookCount = 0;
    
        if(this.bookings.length > 0) {
            this.bookings.forEach( book => {
                if(book.checkin.getTime() >= formatStartDate && book.checkout.getTime() < formatEndDate){
                    bookCount++
                }
            })
        }
    
        return `${((bookCount * 100) / this.bookings.length).toFixed(2)}%`
    };

    static totalOccupancyPercentage(rooms, startDate, endDate) {
        // returns the total occupancy percentage across all rooms in the array
        let formatStartDate = startDate.getTime();
        let formatEndDate = endDate.getTime();
        let bookCount = 0;
        let roomCount = 0;

        if(rooms.length > 0){
            rooms.forEach(room => {
                if(room.bookings.length > 0){
                    room.bookings.forEach(book => {
                        bookCount++

                        if(book.checkin.getTime() >= formatStartDate && book.checkout.getTime() < formatEndDate){
                            roomCount++
                        }
                    })
                }
            })
        }

        return `${((roomCount * 100) / bookCount).toFixed(2)}%`;
    }

    static availableRooms(rooms, startDate, endDate) {
        // returns an array of all rooms in the array that are not occupied for the entire duration
        let formatStartDate = startDate.getTime();
        let formatEndDate = endDate.getTime();
        let freeRooms = [];

        if(rooms.length > 0){
            rooms.forEach(room => {
                if(room.bookings.length > 0){

                    let available = true;
                    room.bookings.forEach(book => {
                        if(book.checkin.getTime() >= formatStartDate && book.checkout.getTime() < formatEndDate) {
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
    name;
    email;
    checkin;
    checkout;
    discount;
    room;

    constructor(name, email, checkin, checkout, discount, room) {
        this.name = name;
        this.email = email;
        this.checkin = checkin;
        this.checkout = checkout;
        this.discount = discount;
        this.room = room;
    }

    getfee() {
        // returns the fee, including discounts on room and booking
        let roomDiscount = (this.room.rate * this.room.discount) / 100;
        let bookDiscount = (this.room.rate * this.discount) / 100;
        let finalPrice = (this.room.rate - roomDiscount - bookDiscount);

        return `$${finalPrice.toFixed(2)}`
    }

}

module.exports = { Room, Booking };