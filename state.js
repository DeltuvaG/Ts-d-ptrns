var Order = /** @class */ (function () {
    function Order() {
        this.cancelledOrderState = new CancelledOrderState(this);
        this.paymentPendingState = new PaymentPendingState(this);
        this.orderBeingPreparedState = new OrderBeingPrepardState(this);
        this.orderShippedState = new OrderShippedState(this);
        this.setState(this.paymentPendingState);
    }
    Order.prototype.setState = function (state) {
        this.currentState = state;
    };
    Order.prototype.getState = function () {
        return this.currentState;
    };
    return Order;
}());
var PaymentPendingState = /** @class */ (function () {
    function PaymentPendingState(order) {
        this.order = order;
    }
    PaymentPendingState.prototype.cancelOrder = function () {
        console.log('Canceling your unpaid order...');
        this.order.setState(this.order.cancelledOrderState);
    };
    PaymentPendingState.prototype.verifyPayment = function () {
        console.log('payment verified! Shipping soon');
        this.order.setState(this.order.orderBeingPreparedState);
    };
    PaymentPendingState.prototype.shipOrder = function () {
        console.log('we cannot ship the order when payment is pending!');
    };
    return PaymentPendingState;
}());
var CancelledOrderState = /** @class */ (function () {
    function CancelledOrderState(order) {
        this.order = order;
    }
    CancelledOrderState.prototype.cancelOrder = function () {
        console.log('your order has already been cancelled!');
    };
    CancelledOrderState.prototype.verifyPayment = function () {
        console.log('Order cancelled, you cannot verify payment!');
    };
    CancelledOrderState.prototype.shipOrder = function () {
        console.log('Order cancelled, you can not ship order!');
    };
    return CancelledOrderState;
}());
var OrderBeingPrepardState = /** @class */ (function () {
    function OrderBeingPrepardState(order) {
        this.order = order;
    }
    OrderBeingPrepardState.prototype.cancelOrder = function () {
        console.log('cancelling your order...');
        this.order.setState(this.order.cancelledOrderState);
    };
    OrderBeingPrepardState.prototype.verifyPayment = function () {
        console.log('Order is already verified and being prepared');
    };
    OrderBeingPrepardState.prototype.shipOrder = function () {
        console.log('Order is prepared and shipped to your location!');
        this.order.setState(this.order.orderShippedState);
    };
    return OrderBeingPrepardState;
}());
var OrderShippedState = /** @class */ (function () {
    function OrderShippedState(order) {
        this.order = order;
    }
    OrderShippedState.prototype.cancelOrder = function () {
        console.log('your order has already been shipped! cannot cancel');
    };
    OrderShippedState.prototype.verifyPayment = function () {
        console.log('Order is shipped, cannot verify payment');
    };
    OrderShippedState.prototype.shipOrder = function () {
        console.log('Order shipped, you can not ship order again!');
    };
    return OrderShippedState;
}());
var order = new Order();
order.getState().verifyPayment();
order.getState().shipOrder();
order.getState().cancelOrder();
console.log('Order state: ' + order.getState().constructor.name);
