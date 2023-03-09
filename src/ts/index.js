"use strict";
exports.__esModule = true;
exports.Booking = exports.Room = void 0;
var Room = /** @class */ (function () {
    function Room(roomInput) {
        this.name = roomInput.name;
        this.bookings = roomInput.bookings;
        this.rate = roomInput.rate;
        this.discount = roomInput.discount;
    }
    Room.prototype.isOccupied = function (date) {
        // returns false if not occupied, returns true if occupied
        var formatDate = date.getTime();
        var available = true;
        if (this.bookings.length > 0) {
            this.bookings.forEach(function (book) {
                if (book['checkin'].getTime() < formatDate && book['checkout'].getTime() > formatDate) {
                    available = true;
                }
                else {
                    available = false;
                }
            });
        }
        else {
            available = false;
        }
        return available;
    };
    Room.prototype.occupancyPercentage = function (startDate, endDate) {
        // returns the percentage of days with occupancy within the range of dates provided (inclusive)
        var formatStartDate = startDate.getTime();
        var formatEndDate = endDate.getTime();
        var bookCount = 0;
        if (this.bookings.length > 0) {
            this.bookings.forEach(function (book) {
                if (book['checkin'].getTime() >= formatStartDate && book['checkout'].getTime() < formatEndDate) {
                    bookCount++;
                }
            });
        }
        return "".concat(((bookCount * 100) / this.bookings.length).toFixed(2), "%");
    };
    ;
    Room.totalOccupancyPercentage = function (rooms, startDate, endDate) {
        // returns the total occupancy percentage across all rooms in the array
        var formatStartDate = startDate.getTime();
        var formatEndDate = endDate.getTime();
        var bookCount = 0;
        var roomCount = 0;
        if (rooms.length > 0) {
            rooms.forEach(function (room) {
                if (room['bookings'].length > 0) {
                    room['bookings'].forEach(function (book) {
                        bookCount++;
                        if (book['checkin'].getTime() >= formatStartDate && book['checkout'].getTime() < formatEndDate) {
                            roomCount++;
                        }
                    });
                }
            });
        }
        return "".concat(((roomCount * 100) / bookCount).toFixed(2), "%");
    };
    Room.availableRooms = function (rooms, startDate, endDate) {
        // returns an array of all rooms in the array that are not occupied for the entire duration
        var formatStartDate = startDate.getTime();
        var formatEndDate = endDate.getTime();
        var freeRooms = [];
        if (rooms.length > 0) {
            rooms.forEach(function (room) {
                if (room['bookings'].length > 0) {
                    var available_1 = true;
                    room['bookings'].forEach(function (book) {
                        if (book['checkin'].getTime() >= formatStartDate && book['checkout'].getTime() < formatEndDate) {
                            available_1 = false;
                        }
                    });
                    if (available_1) {
                        freeRooms.push(room);
                    }
                }
            });
        }
        return freeRooms;
    };
    return Room;
}());
exports.Room = Room;
var Booking = /** @class */ (function () {
    function Booking(bookingInput) {
        this.name = bookingInput.name;
        this.email = bookingInput.email;
        this.checkin = bookingInput.checkin;
        this.checkout = bookingInput.checkout;
        this.discount = bookingInput.discount;
        this.room = bookingInput.room;
    }
    Booking.prototype.getfee = function () {
        // returns the fee, including discounts on room and booking
        var roomDiscount = (this.room.rate * this.room.discount) / 100;
        var bookDiscount = (this.room.rate * this.discount) / 100;
        var finalPrice = (this.room.rate - roomDiscount - bookDiscount);
        return "$".concat(finalPrice.toFixed(2));
    };
    return Booking;
}());
exports.Booking = Booking;
